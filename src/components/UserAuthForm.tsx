import { FC } from 'react'
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import SignIn from "@/components/SignIn";
import {className} from "postcss-selector-parser";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {
    return (
        <div className={cn('flex justify-center', className)}>
            <Button>Google</Button>
        </div>
    )
}

export default UserAuthForm