import {db} from "@/lib/db";
import {PostValidator} from "@/lib/validators/post";
import {getAuthSession} from "@/lib/auth";
import {z} from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { title, content, communityId } = PostValidator.parse(body)

        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const subscription = await db.subscription.findFirst({
            where: {
                communityId,
                userId: session.user.id,
            },
        })

        if (!subscription) {
            return new Response('Subscribe to post', { status: 403 })
        }

        await db.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                communityId,
            },
        })

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }

        return new Response(
            'Could not post to community at this time. Please try later',
            { status: 500 }
        )
    }
}