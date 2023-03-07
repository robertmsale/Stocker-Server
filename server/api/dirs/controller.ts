import {defineController} from "./$relay";
import {API_ORIGIN} from "$/service/envValues";


export default defineController(() => ({
    get: async () => {
        return {
            status: 200,
            body: {
                baseURL: API_ORIGIN,
                itemImages: "/uploads/item-images/",
                profileImages: "/uploads/profile-images/",
                dummy: "/static/icons/dummy.svg"
            }
        }
    }
}))