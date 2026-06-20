export const STATUS_NOTIFICATION_EVENT = 'styleloom:status'

export const showStatus = (message, type = 'success', position = 'top-center') => {
  if (typeof window === 'undefined') return

  window.dispatchEvent(
    new CustomEvent(STATUS_NOTIFICATION_EVENT, {
      detail: { message, type, position, id: Date.now() }
    })
  )
}
