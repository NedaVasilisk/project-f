import {Icons} from "@/components/Icons";
import Link from "next/link";
import UserAuthForm from "@/components/UserAuthForm";

const SignIn = () => {
    return <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[4000px]'>
        <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className='mx-auto h-16 w-26' />
            <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
            <p className="text-sm max-w-xs mx-auto">
                By continuing, you are setting up a Forum account and agree to your
                User Agreement and Privacy Policy
            </p>

            {/*sign in forum*/}
            <UserAuthForm />

            <p className='px-8 text-center text-sm text-zinc-700'>
                New to Forum?{' '}
                <Link href='/sign-up' className="hover:text-zinc-800 text-sm underline underline-offset-4">Forum</Link>
            </p>
        </div>
    </div>
}

export default SignIn