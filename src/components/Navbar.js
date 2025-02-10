'use client'

import React, { useEffect, useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/config/firebase.config'

const Navabar = () => {

    const { user } = useUser();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!user?.id) return;

        const userDocRef = doc(db, "users", user.id);

        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.data());
                console.log(snapshot.data());
                
            } else {
                setData(null);
            }
        });

        return () => unsubscribe();
    }, [user?.id]);

    return (
        <>
            <nav className="2xl:max-w-7xl mx-auto w-full py-4 px-6 md:px-14 border-b border-muted flex justify-between items-center">
                <div className="flex gap-10 items-center">
                    <Link href={'/chat'} className='text-2xl font-semibold'>
                        {/* <h1>NegotiaAI</h1> */}
                        <img src="/logo.png" alt="" className='w-auto h-6' />
                    </Link>
                </div>
                <div className="flex items-center gap-5">
                    <Badge variant="secondary">Quota left: {data.requests}/10</Badge>
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
        </>
    )
}

export default Navabar