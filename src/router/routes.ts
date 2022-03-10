import { RouteRecordRaw } from "vue-router";


import MainLayout from "@layouts/MainLayout.vue";
import Index from "@pages/Index.vue";
import LoginPage from "@pages/auth/Login.vue";

import NotFound from "@pages/errors/404.vue";

import DeviceRoutes from "./device_routes";


const routes: RouteRecordRaw[] = [
    
    {
        path: '/',
        component: MainLayout,
        name: "MainLayout",
        children: [
          { path: '', name: "Index page",component: Index},
          { path: '/login', name: 'Login', component: LoginPage},
          { path: '/signup', name: 'SignUp', component: () => import('@pages/auth/SignUp.vue') },
          { path: '/device', meta: {requireAuth: true, auth_level: 1}, component: () => import('@layouts/DeviceLayout.vue') , children: DeviceRoutes}
        ],

    },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component:  NotFound},
]


export default routes;