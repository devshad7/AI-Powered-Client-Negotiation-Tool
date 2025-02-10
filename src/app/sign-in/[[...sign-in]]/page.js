import HomeNav from '@/components/HomeNav'
import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function page() {
    return (
        <>
            <HomeNav />
            <div className="mt-20 w-full flex justify-center items-center">
                <SignIn />
            </div>
        </>
    )
}
