import React, { useEffect, useState } from 'react'
import { AlertCircle, Check, Info, X } from 'lucide-react'
import { STATUS_NOTIFICATION_EVENT } from '../utils/statusNotification'

const statusStyles = {
  success: {
    icon: Check,
    className: 'bg-black text-white border-black'
  },
  error: {
    icon: AlertCircle,
    className: 'bg-white text-black border-[#8c7a6b]'
  },
  info: {
    icon: Info,
    className: 'bg-[#f3eee8] text-black border-[#d8cabc]'
  }
}

const StatusBadge = () => {
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    const handleStatus = (event) => setNotice(event.detail)

    window.addEventListener(STATUS_NOTIFICATION_EVENT, handleStatus)
    return () => window.removeEventListener(STATUS_NOTIFICATION_EVENT, handleStatus)
  }, [])

  useEffect(() => {
    if (!notice) return undefined

    const timer = window.setTimeout(() => setNotice(null), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  if (!notice) return null

  const config = statusStyles[notice.type] || statusStyles.info
  const Icon = config.icon
  const positionClass = notice.position === 'bottom-right'
    ? 'fixed bottom-4 sm:bottom-5 right-3 sm:right-5'
    : 'fixed top-4 sm:top-5 left-1/2 -translate-x-1/2'

  return (
    <div className={`${positionClass} z-[120] w-max max-w-[calc(100vw-24px)]`}>
      <div
        role='status'
        aria-live='polite'
        className={`min-h-10 px-4 py-2 rounded-full border inline-flex items-center gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] text-[13px] sm:text-[14px] ${config.className}`}
      >
        <Icon size={16} strokeWidth={1.8} className='flex-shrink-0' />
        <span className='leading-snug'>{notice.message}</span>
        <button
          type='button'
          onClick={() => setNotice(null)}
          className='ml-1 opacity-60 hover:opacity-100 transition'
          aria-label='Dismiss notification'
        >
          <X size={14} strokeWidth={1.7} />
        </button>
      </div>
    </div>
  )
}

export default StatusBadge
