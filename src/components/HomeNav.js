import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const HomeNav = () => {
    return (
        <nav className="2xl:max-w-7xl mx-auto w-full py-4 px-6 md:px-14 border-b border-muted flex justify-between items-center">
            <div className="flex gap-10 items-center">
                <Link href={'/'} className='text-2xl font-semibold'>
                    {/* <h1>NegotiaAI</h1> */}
                    <img src="/logo.png" alt="" className='w-auto h-6' />
                </Link>
            </div>
            <div className="flex items-center gap-5">
                <SignedOut>
                    <SignInButton>
                        <Button className='h-8 rounded-md px-3 text-xs'>Sign In </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}

export default HomeNav