import {getAuthSession} from "@/lib/auth";
import {db} from "@/lib/db";
import {notFound} from "next/navigation";
import {INFINITE_SCROLL_PAGINATION_RESULTS} from "@/config";
import MiniCreatePost from "@/components/MiniCreatePost";
import PostFeed from "@/components/PostFeed";

interface PageProps {
    params: {
        slug: string
    }
}

const page = async ({ params }: PageProps) => {
    const { slug } = params

    const session = await getAuthSession()

    const community = await db.community.findFirst({
        where: { name: slug },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    community: true,
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: INFINITE_SCROLL_PAGINATION_RESULTS,
            },
        },
    })

    if (!community) return notFound()

    return (
        <>
            <h1 className='font-bold text-3xl md:text-4xl h-14'>
                r/{community.name}
            </h1>
            <MiniCreatePost session={session} />
            <PostFeed initialPosts={community.posts} communityName={community.name} />
        </>
    )
}

export default page