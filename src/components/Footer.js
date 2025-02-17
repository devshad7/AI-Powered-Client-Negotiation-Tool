import React from 'react'

const Footer = () => {
  return (
    <>
    <div className="py-6 flex justify-between items-center px-6 md:px-14 text-muted-foreground dark:text-gray-400 border-t border-gray-100">
        <div className="text-xs">
            <span>NegotiaAI ©2025. All rights reserved</span>
        </div>
        <div className="text-xs">
            <span>Developed by <a href="https://nexolinx.com" target='_blank' className='text-emerald-600'>@Shad Khan</a></span>
        </div>
    </div>
    </>
  )
}

export default Footer