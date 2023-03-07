import type { AspidaClient } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './article'
import type { Methods as Methods2 } from './article/_articleId@number'
import type { Methods as Methods3 } from './dirs'
import type { Methods as Methods4 } from './login'
import type { Methods as Methods5 } from './protected/admin/roles'
import type { Methods as Methods6 } from './protected/admin/user'
import type { Methods as Methods7 } from './protected/admin/user/img'
import type { Methods as Methods8 } from './protected/events'
import type { Methods as Methods9 } from './protected/inventory-item'
import type { Methods as Methods10 } from './protected/inventory-item/data'
import type { Methods as Methods11 } from './protected/inventory-item/data/image'
import type { Methods as Methods12 } from './protected/inventory-item/data/imgurl'
import type { Methods as Methods13 } from './protected/user'
import type { Methods as Methods14 } from './protected/user/img'
import type { Methods as Methods15 } from './try-login'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://dev.stockerpro.com:33434/api' : baseURL).replace(/\/$/, '')
  const PATH0 = '/article'
  const PATH1 = '/dirs'
  const PATH2 = '/login'
  const PATH3 = '/protected/admin/roles'
  const PATH4 = '/protected/admin/user'
  const PATH5 = '/protected/admin/user/img'
  const PATH6 = '/protected/events'
  const PATH7 = '/protected/inventory-item'
  const PATH8 = '/protected/inventory-item/data'
  const PATH9 = '/protected/inventory-item/data/image'
  const PATH10 = '/protected/inventory-item/data/imgurl'
  const PATH11 = '/protected/user'
  const PATH12 = '/protected/user/img'
  const PATH13 = '/try-login'
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
    dirs: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods3['get']['resBody']>(prefix, PATH1, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods3['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    },
    login: {
      post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods4['post']['resBody']>(prefix, PATH2, POST, option).json(),
      $post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods4['post']['resBody']>(prefix, PATH2, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    protected: {
      admin: {
        roles: {
          get: (option?: { query?: Methods5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods5['get']['resBody']>(prefix, PATH3, GET, option).json(),
          $get: (option?: { query?: Methods5['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods5['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
          post: (option: { body: Methods5['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods5['post']['resBody']>(prefix, PATH3, POST, option).json(),
          $post: (option: { body: Methods5['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods5['post']['resBody']>(prefix, PATH3, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods5['get']['query'] } | undefined) =>
            `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        },
        user: {
          img: {
            get: (option: { query: Methods7['get']['query'], config?: T | undefined }) =>
              fetch<Methods7['get']['resBody']>(prefix, PATH5, GET, option).text(),
            $get: (option: { query: Methods7['get']['query'], config?: T | undefined }) =>
              fetch<Methods7['get']['resBody']>(prefix, PATH5, GET, option).text().then(r => r.body),
            post: (option: { body: Methods7['post']['reqBody'], query: Methods7['post']['query'], config?: T | undefined }) =>
              fetch<Methods7['post']['resBody']>(prefix, PATH5, POST, option, 'FormData').text(),
            $post: (option: { body: Methods7['post']['reqBody'], query: Methods7['post']['query'], config?: T | undefined }) =>
              fetch<Methods7['post']['resBody']>(prefix, PATH5, POST, option, 'FormData').text().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods7['get']['query'] } | { method: 'post'; query: Methods7['post']['query'] } | undefined) =>
              `${prefix}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          },
          post: (option: { body: Methods6['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['post']['resBody']>(prefix, PATH4, POST, option).json(),
          $post: (option: { body: Methods6['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['post']['resBody']>(prefix, PATH4, POST, option).json().then(r => r.body),
          patch: (option: { body: Methods6['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['patch']['resBody']>(prefix, PATH4, PATCH, option).json(),
          $patch: (option: { body: Methods6['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['patch']['resBody']>(prefix, PATH4, PATCH, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH4}`
        }
      },
      events: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods8['get']['resBody']>(prefix, PATH6, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods8['get']['resBody']>(prefix, PATH6, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH6}`
      },
      inventory_item: {
        data: {
          image: {
            get: (option?: { query?: Methods11['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods11['get']['resBody']>(prefix, PATH9, GET, option).text(),
            $get: (option?: { query?: Methods11['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods11['get']['resBody']>(prefix, PATH9, GET, option).text().then(r => r.body),
            post: (option: { body: Methods11['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods11['post']['resBody']>(prefix, PATH9, POST, option, 'FormData').text(),
            $post: (option: { body: Methods11['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods11['post']['resBody']>(prefix, PATH9, POST, option, 'FormData').text().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods11['get']['query'] } | undefined) =>
              `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          },
          imgurl: {
            get: (option: { query: Methods12['get']['query'], config?: T | undefined }) =>
              fetch<Methods12['get']['resBody']>(prefix, PATH10, GET, option).text(),
            $get: (option: { query: Methods12['get']['query'], config?: T | undefined }) =>
              fetch<Methods12['get']['resBody']>(prefix, PATH10, GET, option).text().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods12['get']['query'] } | undefined) =>
              `${prefix}${PATH10}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          },
          get: (option?: { query?: Methods10['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods10['get']['resBody']>(prefix, PATH8, GET, option).json(),
          $get: (option?: { query?: Methods10['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods10['get']['resBody']>(prefix, PATH8, GET, option).json().then(r => r.body),
          post: (option: { body: Methods10['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods10['post']['resBody']>(prefix, PATH8, POST, option).json(),
          $post: (option: { body: Methods10['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods10['post']['resBody']>(prefix, PATH8, POST, option).json().then(r => r.body),
          patch: (option: { body: Methods10['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods10['patch']['resBody']>(prefix, PATH8, PATCH, option).json(),
          $patch: (option: { body: Methods10['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods10['patch']['resBody']>(prefix, PATH8, PATCH, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods10['get']['query'] } | undefined) =>
            `${prefix}${PATH8}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        },
        get: (option?: { query?: Methods9['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods9['get']['resBody']>(prefix, PATH7, GET, option).json(),
        $get: (option?: { query?: Methods9['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods9['get']['resBody']>(prefix, PATH7, GET, option).json().then(r => r.body),
        post: (option: { body: Methods9['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods9['post']['resBody']>(prefix, PATH7, POST, option).json(),
        $post: (option: { body: Methods9['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods9['post']['resBody']>(prefix, PATH7, POST, option).json().then(r => r.body),
        patch: (option: { body: Methods9['patch']['reqBody'], config?: T | undefined }) =>
          fetch<Methods9['patch']['resBody']>(prefix, PATH7, PATCH, option).json(),
        $patch: (option: { body: Methods9['patch']['reqBody'], config?: T | undefined }) =>
          fetch<Methods9['patch']['resBody']>(prefix, PATH7, PATCH, option).json().then(r => r.body),
        delete: (option: { body: Methods9['delete']['reqBody'], config?: T | undefined }) =>
          fetch<Methods9['delete']['resBody']>(prefix, PATH7, DELETE, option).json(),
        $delete: (option: { body: Methods9['delete']['reqBody'], config?: T | undefined }) =>
          fetch<Methods9['delete']['resBody']>(prefix, PATH7, DELETE, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods9['get']['query'] } | undefined) =>
          `${prefix}${PATH7}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      user: {
        img: {
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods14['get']['resBody']>(prefix, PATH12, GET, option).text(),
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods14['get']['resBody']>(prefix, PATH12, GET, option).text().then(r => r.body),
          post: (option: { body: Methods14['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods14['post']['resBody']>(prefix, PATH12, POST, option, 'FormData').text(),
          $post: (option: { body: Methods14['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods14['post']['resBody']>(prefix, PATH12, POST, option, 'FormData').text().then(r => r.body),
          $path: () => `${prefix}${PATH12}`
        },
        get: (option?: { query?: Methods13['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods13['get']['resBody']>(prefix, PATH11, GET, option).json(),
        $get: (option?: { query?: Methods13['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods13['get']['resBody']>(prefix, PATH11, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods13['get']['query'] } | undefined) =>
          `${prefix}${PATH11}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    },
    try_login: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods15['get']['resBody']>(prefix, PATH13, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods15['get']['resBody']>(prefix, PATH13, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH13}`
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
