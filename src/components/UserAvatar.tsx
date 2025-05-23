import {User} from 'next-auth'
import {FC} from 'react'
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Image from 'next/image'
import {Icons} from "./ui/Icons";
import {AvatarProps} from "@radix-ui/react-avatar";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'image' | 'name'>
}

const  UserAvatar: FC<UserAvatarProps> = ({user, ...props}: UserAvatarProps) => {
    return <Avatar {...props}>
        {user.image ? (<div className='relative aspect-square h-full w-full'>
            <Image fill src={user.image} alt='profile picture' referrerPolicy='no-referrer'/>
        </div>
        ) : (
            <AvatarFallback>
                <span className='sr-only'>{user?.name}</span>
                <Icons.user className='h-4 w-4'/>
            </AvatarFallback>
        )}
    </Avatar>
}

export default UserAvatar