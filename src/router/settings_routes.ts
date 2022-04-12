import { RouteRecordRaw } from 'vue-router';



const routes: RouteRecordRaw[] = [

    { path: '', name: 'DatabaseSettings', component: () => import('@pages/settings/Database.vue') },

]

export default routes;