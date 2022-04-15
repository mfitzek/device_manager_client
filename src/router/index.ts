import { createRouter, createWebHashHistory } from "vue-router";
import auth from "@/store/auth";

import routes from "./routes";

const Router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
});


Router.beforeEach((to, from)=>{
    if(to.meta.requireAuth){

        if(auth.is_authenticated()){
            console.log(to.meta.auth_level, auth.state.role);

            if(to.meta.auth_level && auth.state.role < to.meta.auth_level ){
                return from;
            }else{
               
            }

        }else{
            return {name: "Login", query: {redirect: to.name}}
        }

    }
});


export default Router;