import type {User} from '$prisma/client'

export type Methods = {
    post: {
        reqBody: Pick<User, 'username' | 'password'>,
        resBody: {token: string, id: number}
    }
}
