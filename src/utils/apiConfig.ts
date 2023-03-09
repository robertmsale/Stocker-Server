import {Merge} from "type-fest";
import _ from 'lodash'

export type apiConfig = {
            config: {
                headers: {
                    authorization: string
                }
            }
        }

export function apiWithHeaders<T>(options: T): Merge<apiConfig, T> {
    return _.merge(options, {
        config: {
            headers: {
                authorization: localStorage.getItem('token') ?? ''
            }
        }
    }) as Merge<apiConfig, T>
}