

export {}

declare module 'vue-router' {
  interface RouteMeta {
    requireAuth?: boolean,
    
    auth_level?: number
  }
}