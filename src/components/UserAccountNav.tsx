"use client"

import {User} from 'next-auth'
import {FC} from 'react'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import {signOut} from "next-auth/react";

interface UserAccountNavProps {
    user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({user}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={{
                    name: user.name || null,
                    image: user.image || null,
                }} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className='bg-white' align='end'>
                <div className='flex items-center justify-start gap-2 p-2'>
                    <div className='flex flex-col space-y-1 leading-none'>
                        {user.name && <p className='font-medium'>{user.name}</p>}
                        {user.email && <p className='w-[200px] truncate text-sm text-zinc-700'>{user.email}</p>}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href='/'>Feed</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/c/create'>Create community</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={(event) => {
                    event.preventDefault()
                    signOut({
                        callbackUrl: `${window.location.origin}/sign-in`,
                    })
                }} className='cursor-pointer'>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav