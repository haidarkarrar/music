'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SidebarItem = ({
    href,
    title,
    svgIcon
}: {
    href: string
    title: string
    svgIcon: React.ReactNode
}) => {
    const pathname = usePathname()

    const isActive = pathname === href

    return (
        <Link href={href}>
            <Button variant={isActive ? 'secondary' : 'ghost'} className="w-full justify-start">
                {svgIcon}
                {title}
            </Button>
        </Link>
    )
}

export default SidebarItem