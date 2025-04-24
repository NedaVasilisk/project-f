'use client'

import axios from 'axios'
import Post from './Post'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { ExtendedPost } from '@/types/db'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { FC, useEffect, useRef } from 'react'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'

interface PostFeedProps {
    initialPosts: ExtendedPost[]
    communityName?: string
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, communityName }) => {
    const lastPostRef = useRef<HTMLElement>(null)
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    })
    const { data: session } = useSession()

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<ExtendedPost[], Error>({
        queryKey: ['infinite-query', communityName],
        queryFn: async ({ pageParam = 1 }) => {
            const query =
                `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
                (communityName ? `&communityName=${communityName}` : '')

            const response = await axios.get<ExtendedPost[]>(query)
            return response.data
        },
        getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
        initialPageParam: 1,
        initialData: {
            pages: [initialPosts],
            pageParams: [1],
        },
    })

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage()
        }
    }, [entry, fetchNextPage])

    const posts: ExtendedPost[] = data?.pages.flatMap((page) => page) ?? initialPosts

    return (
        <ul className='flex flex-col col-span-2 space-y-6'>
            {posts.map((post, index) => {
                const votesAmt = post.votes.reduce((acc: number, vote) => {
                    if (vote.type === 'UP') return acc + 1
                    if (vote.type === 'DOWN') return acc - 1
                    return acc
                }, 0)

                const currentVote = post.votes.find(
                    (vote) => vote.userId === session?.user.id
                )

                const postElement = (
                    <Post
                        key={post.id}
                        post={post}
                        commentAmt={post.comments.length}
                        communityName={post.community.name}
                        votesAmt={votesAmt}
                        currentVote={currentVote}
                    />
                )

                return index === posts.length - 1 ? (
                    <li key={post.id} ref={ref}>
                        {postElement}
                    </li>
                ) : (
                    postElement
                )
            })}

            {isFetchingNextPage && (
                <li className='flex justify-center'>
                    <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
                </li>
            )}
        </ul>
    )
}

export default PostFeed