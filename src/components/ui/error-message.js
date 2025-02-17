import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ErrorMsg = () => {
  return (
    <>
      <div className="flex items-start gap-2">
        <AlertCircle color='#d84644' />
        <p>Something went wrong, try again or contact us at {""}
          <Link href={''} className='text-blue-500'>
            shadk.dev@gmail.com
          </Link>
        </p>
      </div>
    </>
  )
}


const LimitError = () => {
  return (
    <>
      <div className="flex gap-2">
        <AlertCircle color='#d84644' />
        <p>Limit exceeded! You have used all your request limits. {""}
          <Link href={''} className='text-blue-500'>
            Upgrade
          </Link>
        </p>
      </div>
    </>
  )
}

export { ErrorMsg, LimitError };