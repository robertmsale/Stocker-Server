import type { OptionalQuery as OptionalQuery0 } from '../pages/article'
import type { Query as Query1 } from '../pages/article/entry'

export const pagesPath = {
  "article": {
    "entry": {
      $url: (url: { query: Query1, hash?: string }) => ({ pathname: '/article/entry' as const, query: url.query, hash: url.hash })
    },
    $url: (url?: { query?: OptionalQuery0, hash?: string }) => ({ pathname: '/article' as const, query: url?.query, hash: url?.hash })
  },
  "automations": {
    $url: (url?: { hash?: string }) => ({ pathname: '/automations' as const, hash: url?.hash })
  },
  "create_inventory_item": {
    _itemId: (itemId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/create-inventory-item/[itemId]' as const, query: { itemId }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/create-inventory-item' as const, hash: url?.hash })
  },
  "inventory": {
    $url: (url?: { hash?: string }) => ({ pathname: '/inventory' as const, hash: url?.hash })
  },
  "reports": {
    $url: (url?: { hash?: string }) => ({ pathname: '/reports' as const, hash: url?.hash })
  },
  "user_locations": {
    $url: (url?: { hash?: string }) => ({ pathname: '/user-locations' as const, hash: url?.hash })
  },
  "users": {
    _userId: (userId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/users/[userId]' as const, query: { userId }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/users' as const, hash: url?.hash })
  },
  "view_inventory_item": {
    _itemId: (itemId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/view-inventory-item/[itemId]' as const, query: { itemId }, hash: url?.hash })
    })
  },
  "warehouses": {
    $url: (url?: { hash?: string }) => ({ pathname: '/warehouses' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_png: '/favicon.png',
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath
