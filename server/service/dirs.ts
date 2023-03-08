import {Dirs} from '$/types/'
import {API_ORIGIN} from "$/service/envValues";

const dirs: Dirs = {
    baseURL: API_ORIGIN,
    dummy: "/static/icons/dummy.svg",
    profileImages: "/uploads/profile-images/",
    itemImages: "/uploads/item-images/",
}

export default dirs