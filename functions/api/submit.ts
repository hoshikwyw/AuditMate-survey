// POST /api/submit — Cloudflare Pages Function.
// Checks her answers, then emails them to you through Resend. The API key never reaches the browser.
//
// Secrets (Cloudflare dashboard → your Pages project → Settings → Variables and Secrets,
// or .dev.vars locally):
//   RESEND_API_KEY  your Resend API key (re_…)
//   TO_EMAIL        where answers go — must be your Resend account email unless you verify a domain
//   FROM_EMAIL      optional, defaults to Resend's test sender

import { PERSONAL } from '../../src/config/personal'
import { buildExport, buildMessage } from '../../src/survey/export'
import { validateSubmission } from '../../src/survey/validate'

interface Env {
  RESEND_API_KEY?: string
  TO_EMAIL?: string
  FROM_EMAIL?: string
}

const MAX_BODY_BYTES = 16_000

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Only accept posts from this site's own pages.
  const origin = request.headers.get('Origin')
  if (origin && new URL(origin).host !== new URL(request.url).host) return json(403, { ok: false })

  if (!env.RESEND_API_KEY || !env.TO_EMAIL) {
    console.error('submit: RESEND_API_KEY or TO_EMAIL is not set')
    return json(503, { ok: false, error: 'not configured' })
  }

  const body = await request.text()
  if (body.length > MAX_BODY_BYTES) return json(413, { ok: false })

  let payload: unknown
  try {
    payload = JSON.parse(body)
  } catch {
    return json(400, { ok: false })
  }

  const result = validateSubmission(payload)
  if (!result.ok) {
    console.warn('submit: rejected', result.error)
    return json(400, { ok: false })
  }

  const { state, submittedAt, timeZone } = result
  const text = [
    buildMessage(state, submittedAt, timeZone),
    '',
    '— Raw data (JSON) —',
    JSON.stringify(buildExport(state, submittedAt), null, 2),
  ].join('\n')

  const resend = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      // Same submission retried = same key = no duplicate email.
      'Idempotency-Key': `survey/${state.responseId}/${submittedAt.getTime()}`,
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL || 'AuditMate Survey <onboarding@resend.dev>',
      to: [env.TO_EMAIL],
      subject: `AuditMate survey from ${PERSONAL.herName} 💛`,
      text,
    }),
  })

  if (!resend.ok) {
    console.error('submit: Resend error', resend.status, await resend.text())
    return json(502, { ok: false })
  }
  return json(200, { ok: true })
}
