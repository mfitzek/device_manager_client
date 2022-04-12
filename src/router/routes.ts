import { RouteRecordRaw } from "vue-router";


import MainLayout from "@layouts/MainLayout.vue";
import Index from "@pages/Index.vue";
import LoginPage from "@pages/auth/Login.vue";

import NotFound from "@pages/errors/404.vue";

import DeviceRoutes from "./device_routes";
import DataRoutes from "./data_routes";
import SettingsRoutes from "./settings_routes";


const routes: RouteRecordRaw[] = [
    
    {
        path: '/',
        component: MainLayout,
        name: "MainLayout",
        children: [
          { path: '', name: "Index page",component: Index},
          { path: '/login', name: 'Login', component: LoginPage},
          { path: '/signup', name: 'SignUp', component: () => import('@pages/auth/Signup.vue') },
          { path: '/device', meta: {requireAuth: true, auth_level: 1}, component: () => import('@layouts/DeviceLayout.vue') , children: DeviceRoutes},
          { path: '/data', meta: {requireAuth: true, auth_level: 1}, component: () => import('@layouts/DataLayout.vue') , children: DataRoutes},
          { path: '/settings', meta: {requireAuth: true, auth_level: 0}, component: () => import('@layouts/Settings.vue') , children: SettingsRoutes},
        ],

    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component:  NotFound},
]


export default routes;