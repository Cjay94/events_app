"use client";

import { navLinks } from '@/constants/Index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const NavItems = () => {
    const pathName = usePathname();

    return (
        <ul className='md:flex-between flex w-full flex-col md:flex-row items-start gap-5'>
            {navLinks.map((link, idx) => {
                const isActive = pathName === link.route;

                return (
                    <li
                        key={idx}
                        className={`${isActive && 'text-primary-500'}
                        flex-center p-medium-16 whitespace-nowrap`}
                    >
                        <Link href={link.route}>{link.label}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default NavItems