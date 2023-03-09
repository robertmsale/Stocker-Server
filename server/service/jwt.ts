import jwt from 'jsonwebtoken'
import {API_JWT_SECRET} from "$/service/envValues";

export default class JWT {
    static verify(token: string): {id: number} {
        return jwt.verify(token, API_JWT_SECRET) as {id: number}
    }
    static decode(token: string): {id: number} {
        return {id: -1}
    }

    static sign(token: string | Buffer | object): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            jwt.sign(token, API_JWT_SECRET, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token || '');
                }
            })
        })
    }
}

