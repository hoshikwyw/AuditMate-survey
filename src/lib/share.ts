// Browser sharing helpers. All of them fail softly so the survey never loses her answers.

export type ShareResult = 'shared' | 'cancelled' | 'unsupported' | 'failed'

/** Opens the phone's share sheet (Viber, Telegram, Messenger…). */
export async function shareText(title: string, text: string): Promise<ShareResult> {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return 'unsupported'
  const data = { title, text }
  if (typeof navigator.canShare === 'function' && !navigator.canShare(data)) return 'unsupported'
  try {
    await navigator.share(data)
    return 'shared'
  } catch (error) {
    // AbortError = she closed the share sheet without picking an app.
    return error instanceof DOMException && error.name === 'AbortError' ? 'cancelled' : 'failed'
  }
}

/** Copies text to the clipboard, with an old-school fallback for browsers that block the Clipboard API. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      const ok = document.execCommand('copy')
      area.remove()
      return ok
    } catch {
      return false
    }
  }
}

/** Saves data as a .json file in Downloads. */
export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
