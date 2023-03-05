import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './article'
import type { Methods as Methods2 } from './article/_articleId@number'
import type { Methods as Methods3 } from './login'
import type { Methods as Methods4 } from './protected/events'
import type { Methods as Methods5 } from './protected/inventory-item'
import type { Methods as Methods6 } from './protected/inventory-item/data'
import type { Methods as Methods7 } from './protected/inventory-item/data/image'
import type { Methods as Methods8 } from './protected/inventory-item/data/imgurl'
import type { Methods as Methods9 } from './tasks'
import type { Methods as Methods10 } from './tasks/_taskId@number'
import type { Methods as Methods11 } from './user'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:33434/api' : baseURL).replace(/\/$/, '')
  const PATH0 = '/article'
  const PATH1 = '/login'
  const PATH2 = '/protected/events'
  const PATH3 = '/protected/inventory-item'
  const PATH4 = '/protected/inventory-item/data'
  const PATH5 = '/protected/inventory-item/data/image'
  const PATH6 = '/protected/inventory-item/data/imgurl'
  const PATH7 = '/tasks'
  const PATH8 = '/user'
  const GET = 'GET'
  const POST = 'POST'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    article: {
      _articleId: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}`

        return {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods2['get']['resBody']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods2['get']['resBody']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      get: (option: { query: Methods1['get']['query'], config?: T | undefined }) =>
        fetch<Methods1['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option: { query: Methods1['get']['query'], config?: T | undefined }) =>
        fetch<Methods1['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods1['get']['query'] } | undefined) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    login: {
      post: (option: { body: Methods3['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods3['post']['resBody']>(prefix, PATH1, POST, option).json(),
      $post: (option: { body: Methods3['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods3['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    },
    protected: {
      events: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods4['get']['resBody']>(prefix, PATH2, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods4['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH2}`
      },
      inventory_item: {
        data: {
          image: {
            get: (option?: { query?: Methods7['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods7['get']['resBody']>(prefix, PATH5, GET, option).text(),
            $get: (option?: { query?: Methods7['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods7['get']['resBody']>(prefix, PATH5, GET, option).text().then(r => r.body),
            post: (option: { body: Methods7['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods7['post']['resBody']>(prefix, PATH5, POST, option, 'FormData').text(),
            $post: (option: { body: Methods7['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods7['post']['resBody']>(prefix, PATH5, POST, option, 'FormData').text().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods7['get']['query'] } | undefined) =>
              `${prefix}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          },
          imgurl: {
            get: (option: { query: Methods8['get']['query'], config?: T | undefined }) =>
              fetch<Methods8['get']['resBody']>(prefix, PATH6, GET, option).text(),
            $get: (option: { query: Methods8['get']['query'], config?: T | undefined }) =>
              fetch<Methods8['get']['resBody']>(prefix, PATH6, GET, option).text().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods8['get']['query'] } | undefined) =>
              `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          },
          get: (option?: { query?: Methods6['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods6['get']['resBody']>(prefix, PATH4, GET, option).json(),
          $get: (option?: { query?: Methods6['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods6['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
          post: (option: { body: Methods6['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['post']['resBody']>(prefix, PATH4, POST, option).json(),
          $post: (option: { body: Methods6['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['post']['resBody']>(prefix, PATH4, POST, option).json().then(r => r.body),
          patch: (option: { body: Methods6['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['patch']['resBody']>(prefix, PATH4, PATCH, option).json(),
          $patch: (option: { body: Methods6['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['patch']['resBody']>(prefix, PATH4, PATCH, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods6['get']['query'] } | undefined) =>
            `${prefix}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        },
        get: (option?: { query?: Methods5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods5['get']['resBody']>(prefix, PATH3, GET, option).json(),
        $get: (option?: { query?: Methods5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods5['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
        post: (option: { body: Methods5['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods5['post']['resBody']>(prefix, PATH3, POST, option).json(),
        $post: (option: { body: Methods5['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods5['post']['resBody']>(prefix, PATH3, POST, option).json().then(r => r.body),
        patch: (option: { body: Methods5['patch']['reqBody'], config?: T | undefined }) =>
          fetch<Methods5['patch']['resBody']>(prefix, PATH3, PATCH, option).json(),
        $patch: (option: { body: Methods5['patch']['reqBody'], config?: T | undefined }) =>
          fetch<Methods5['patch']['resBody']>(prefix, PATH3, PATCH, option).json().then(r => r.body),
        delete: (option: { body: Methods5['delete']['reqBody'], config?: T | undefined }) =>
          fetch<Methods5['delete']['resBody']>(prefix, PATH3, DELETE, option).json(),
        $delete: (option: { body: Methods5['delete']['reqBody'], config?: T | undefined }) =>
          fetch<Methods5['delete']['resBody']>(prefix, PATH3, DELETE, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods5['get']['query'] } | undefined) =>
          `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    },
    tasks: {
      _taskId: (val1: number) => {
        const prefix1 = `${PATH7}/${val1}`

        return {
          patch: (option: { body: Methods10['patch']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods10['patch']['status']>(prefix, prefix1, PATCH, option).send(),
          $patch: (option: { body: Methods10['patch']['reqBody'], config?: T | undefined }) =>
            fetch<void, BasicHeaders, Methods10['patch']['status']>(prefix, prefix1, PATCH, option).send().then(r => r.body),
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods10['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods10['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      get: (option?: { query?: Methods9['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods9['get']['resBody']>(prefix, PATH7, GET, option).json(),
      $get: (option?: { query?: Methods9['get']['query'] | undefined, config?: T | undefined } | undefined) =>
        fetch<Methods9['get']['resBody']>(prefix, PATH7, GET, option).json().then(r => r.body),
      post: (option: { body: Methods9['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods9['post']['resBody']>(prefix, PATH7, POST, option).json(),
      $post: (option: { body: Methods9['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods9['post']['resBody']>(prefix, PATH7, POST, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods9['get']['query'] } | undefined) =>
        `${prefix}${PATH7}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    user: {
      get: (option: { headers: Methods11['get']['reqHeaders'], config?: T | undefined }) =>
        fetch<Methods11['get']['resBody']>(prefix, PATH8, GET, option).json(),
      $get: (option: { headers: Methods11['get']['reqHeaders'], config?: T | undefined }) =>
        fetch<Methods11['get']['resBody']>(prefix, PATH8, GET, option).json().then(r => r.body),
      post: (option: { body: Methods11['post']['reqBody'], headers: Methods11['post']['reqHeaders'], config?: T | undefined }) =>
        fetch<Methods11['post']['resBody']>(prefix, PATH8, POST, option, 'FormData').json(),
      $post: (option: { body: Methods11['post']['reqBody'], headers: Methods11['post']['reqHeaders'], config?: T | undefined }) =>
        fetch<Methods11['post']['resBody']>(prefix, PATH8, POST, option, 'FormData').json().then(r => r.body),
      $path: () => `${prefix}${PATH8}`
    },
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['get']['resBody']>(prefix, '', GET, option).text(),
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['get']['resBody']>(prefix, '', GET, option).text().then(r => r.body),
    $path: () => `${prefix}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
