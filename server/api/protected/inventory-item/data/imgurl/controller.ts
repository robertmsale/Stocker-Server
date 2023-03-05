import {API_ORIGIN} from "$/service/envValues";
import {defineController} from './$relay'
import _ from 'lodash'

const defaultImagePath = `${API_ORIGIN}/static/icons/dummy.svg`
const genImagePath = (img: string) => `${API_ORIGIN}/upload/item-images/${img}`

export default defineController(() => ({
    get: async ({query}) => {
        if (_.isUndefined(query.fileName)) return {status: 200, body: defaultImagePath}
        return {
            status: 200,
            body: genImagePath(query.fileName)
        }
    }
}))