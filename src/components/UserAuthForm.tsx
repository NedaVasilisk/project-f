'use client'

import {FC, useState} from 'react'
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import SignIn from "@/components/SignIn";
import {className} from "postcss-selector-parser";
import {signIn} from "next-auth/react";
import {Icons} from "@/components/ui/Icons";
import {useToast} from "@/hooks/use-toast";

interface UserAuthFormProps extends  React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: React.FC<UserAuthFormProps> = ({className, ...props}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {toast} = useToast()

    const  loginWithGoogle = async () => {
        setIsLoading(true)

        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'There was a problem',
                description: 'There was an error logging with Google',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <Button
                onClick={loginWithGoogle}
                isLoading={isLoading}
                size='sm'
                className='w-full'>
                {isLoading ? null : <Icons.google className='h-4 w-4 mr-2'/>}
                Google
            </Button>
        </div>
    )
}

export default UserAuthForm