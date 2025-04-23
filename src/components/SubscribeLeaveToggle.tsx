'use client'


import {useToast} from "@/hooks/use-toast";
import {useCustomToasts} from "@/hooks/use-custom-toast";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {startTransition} from "react";
import {Button} from "@/components/ui/button";
import {SubscribeToCommunityPayload} from "@/lib/validators/community";

interface SubscribeLeaveToggleProps {
    isSubscribed: boolean
    communityId: string
    communityName: string
}

const SubscribeLeaveToggle = ({
                                  isSubscribed,
                                  communityId,
                                  communityName,
                              }: SubscribeLeaveToggleProps) => {
    const { toast } = useToast()
    const { loginToast } = useCustomToasts()
    const router = useRouter()

    const { mutate: subscribe, isPending: isSubPending } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToCommunityPayload = {
                communityId: communityId,
            }

            const { data } = await axios.post('/api/community/subscribe', payload)
            return data as string
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast()
                }
            }

            return toast({
                title: 'There was a problem.',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh()
            })
            toast({
                title: 'Subscribed!',
                description: `You are now subscribed to r/${communityName}`,
            })
        },
    })

    const { mutate: unsubscribe, isPending: isUnsubPending } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToCommunityPayload = {
                communityId: communityId,
            }

            const { data } = await axios.post('/api/community/unsubscribe', payload)
            return data as string
        },
        onError: (err: AxiosError) => {
            toast({
                title: 'Error',
                description: err.response?.data as string,
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh()
            })
            toast({
                title: 'Unsubscribed!',
                description: `You are now unsubscribed from/${communityName}`,
            })
        },
    })

    return isSubscribed ? (
        <Button
            className='w-full mt-1 mb-4'
            isLoading={isUnsubPending}
            onClick={() => unsubscribe()}>
            Leave community
        </Button>
    ) : (
        <Button
            className='w-full mt-1 mb-4'
            isLoading={isSubPending}
            onClick={() => subscribe()}>
            Join to post
        </Button>
    )
}

export default SubscribeLeaveToggle