import type { AuthHeader, UserInfo } from '$/types'
import type { ReadStream } from 'fs'
import type {User} from '$prisma/client'
import {Except, SetOptional} from "type-fest";

export type Methods = {
  get: {
    query?: {
        id: number
    }
    resBody: User
  }
}
