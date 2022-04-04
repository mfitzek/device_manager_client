import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    

          { path: '', name: "DataMain", component: ()=> import("@pages/data/Main.vue")},
        //   { path: 'attr', name: "DeviceAttributes", component: ()=> import("@pages/device/DeviceAttributes.vue")},
        //   { path: 'connection', name: "DeviceConnection", component: ()=> import("@pages/device/DeviceConnection.vue")},
        //   { path: 'create', name: "DeviceCreate", component: ()=> import("@pages/device/DeviceCreate.vue")},
          //{ path: '/login', name: 'Login', component: LoginPage},
          //{ path: '/signup', name: 'SignUp', component: () => import('@pages/auth/SignUp.vue') },
          //{ path: '/device', meta: {requireAuth: true, auth_level: 1}, component: () => import('layouts/DeviceLayout.vue') , children: DeviceRoutes}

]

export default routes;