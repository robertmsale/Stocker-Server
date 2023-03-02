import { defineHooks } from './$relay'
export type AdditionalRequest = {
    user: {
        id: number
    }
}

// export default defineHooks(() => ({
//     onRequest: (req, res) => req.jwtVerify().catch(err => res.send(err))
// }))