import type { SubmitPayload } from '../survey/validate'

const TIMEOUT_MS = 15_000

/** Posts her answers to the Cloudflare Function. Resolves true only if the email was sent. */
export async function submitAnswers(payload: SubmitPayload): Promise<boolean> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    return res.ok
  } catch {
    return false // offline, timeout, or blocked
  } finally {
    clearTimeout(timer)
  }
}
