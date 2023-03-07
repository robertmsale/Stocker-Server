import type { AuthHeader, UserInfo } from '$/types'
import type { ReadStream } from 'fs'
import type {User} from '$prisma/client'

export type Methods = {
  get: {
    query?: {
        id: number
    }
    resBody: User[]
  }

  // post: {
  //   reqHeaders: AuthHeader
  //   reqFormat: FormData
  //   reqBody: { icon: File | ReadStream }
  //   resBody: UserInfo
  // }
}
