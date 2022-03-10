import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    

          { path: '', name: "DeviceList", component: ()=> import("@pages/device/DeviceList.vue")},
          //{ path: '/login', name: 'Login', component: LoginPage},
          //{ path: '/signup', name: 'SignUp', component: () => import('@pages/auth/SignUp.vue') },
          //{ path: '/device', meta: {requireAuth: true, auth_level: 1}, component: () => import('layouts/DeviceLayout.vue') , children: DeviceRoutes}

]

export default routes;