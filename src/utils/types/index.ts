export type UserInfo = {
  id: string
  name: string
  icon: string
}

export type AuthHeader = {
  authorization: string
}

export type StockerSettings = {
  tokenExpiration: number,
}

export type Dirs = {
  baseURL: string
  itemImages: '/uploads/item-images/',
  dummy: '/static/icons/dummy.svg'
  profileImages: '/uploads/profile-images/'
}
