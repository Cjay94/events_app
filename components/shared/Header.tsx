import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import NavMobile from './NavMobile'


const Header = () => {
    return (
        <header className='w-full border-b'>
            <div className="wrapper flex-between">
                <Link href='/' className='w-36'>
                    <Image
                        src='/assets/images/logo.svg'
                        alt='Evently Logo'
                        width={144}
                        height={38}
                    />
                </Link>

                {/* desktop */}
                <SignedIn>
                    <nav className="md:flex-between hidden w-full max-w-xs">
                        <NavItems />
                    </nav>
                </SignedIn>

                <div className="flex justify-end w-32 gap-3">

                    <SignedIn>
                        <UserButton />
                        <NavMobile />
                    </SignedIn>

                    <SignedOut>
                        <Button asChild className='rounded-full' size="lg">
                            <Link href="/sign-in">
                                Login
                            </Link>
                        </Button>
                    </SignedOut>

                </div>
            </div>
        </header>
    )
}

export default Header