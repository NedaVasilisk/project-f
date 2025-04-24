import Link from "next/link";
import {Icons} from "./ui/Icons";
import {buttonVariants} from "@/components/ui/button";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import UserAccountNav from "@/components/UserAccountNav";
import SearchBar from "@/components/SearchBar";

const Navbar = async (props: any) => {
    const session = await getServerSession(authOptions)
    return <div className='fixed top-0 inset-x-0 h-fit bg-zinc-900 border-b border-zinc-300 z-[10] py-2'>
        <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">

            <Link href='/'>
                <Icons.logo className='h-20 w-20 sm:h-16 sm:w-16'/>
            </Link>

            <SearchBar />

            {session?.user ? (
                <UserAccountNav user={session.user} />
            ) : (
                <Link href='/sign-in' className={buttonVariants()}>Sign in</Link>
            )}
        </div>
    </div>
}

export default Navbar