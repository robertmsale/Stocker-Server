export type Methods = {
    get: {
        reqHeader: {
          authorization: string
        }
        query: {fileName?: string}
        resBody: string
    }
}