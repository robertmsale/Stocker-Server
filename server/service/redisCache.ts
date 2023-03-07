import {createClient} from "redis";
import _ from 'lodash';
import {API_JWT_SECRET, API_REDIS_URL} from "$/service/envValues";
import jwt from 'jsonwebtoken';

export const redisClient = createClient(_.isEmpty(API_REDIS_URL) ? undefined : {url: API_REDIS_URL});
export const prefixes = {
    token: 'stocker:token:',
    settings: {
        tokenExp: 'stocker:settings:tokenExp'
    },

}
export class RedisCommand {
    static async createToken(userId: number) {
        const exp = await RedisCommand.getTokenExpiration();
        const token = jwt.sign({id: userId}, API_JWT_SECRET, {expiresIn: exp});
        await redisClient.set(`${prefixes.token}${userId}`, token);
        return token;
    }

    static async verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, API_JWT_SECRET);
            const userId = _.get(decoded, 'id');
            const redisToken = await redisClient.get(`${prefixes.token}${userId}`);
            if (_.isUndefined(userId)) {
                return false;
            }
            return redisToken === token;
        } catch (e) {
            return false;
        }
    }

    static async getTokenExpiration() {
        const exp = await redisClient.get(`${prefixes.settings.tokenExp}`);
        if (_.isNull(exp)) {
            await redisClient.set(`${prefixes.settings.tokenExp}`, '24h');
            return '24h';
        }
        return exp;
    }

    static async setTokenExpiration(exp: string) {
        let match = exp.match(/^\d+h$/m)
        if (_.isNull(match)) {
            return RedisCommand.getTokenExpiration();
        }
        await redisClient.set(`${prefixes.settings.tokenExp}`, exp);
        return exp
    }
}
