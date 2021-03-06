import { reactive, readonly } from "vue";

import AxiosApi from "@service/axios_api";
import axios, { AxiosError } from "axios";

const api = AxiosApi.getInstance().api;

interface ILoginResponse {
    id: any;
    email: string;
    username: string;
    token: string;
    role: Number;
    expires_at: Date;
}

interface IAuthState {
    user_id: any;
    email?: string;
    username?: string;
    auth_token?: string;
    expires_at?: Date;
    role: Number
}

interface IAuthGetters {
    is_authenticated: () => boolean;
}

const state = reactive<IAuthState>({
    user_id: null,
    email: undefined,
    username: undefined,
    auth_token: undefined,
    expires_at: undefined,
    role: 2
});

function is_authenticated() {
    if (state.auth_token && state.expires_at) {
        if (state.expires_at > new Date()) return true;
    }
    return false;
}

async function signup(email: string, username:string, password: string){
    try {
        const req = await api.post("/auth/signup", {email, username, password});

    } catch (error: any | AxiosError) {
        if(axios.isAxiosError(error)){
            if(error.response?.data){
                throw error.response?.data;
            }
        }
    }
}

async function login(email: string, password: string) {
   logout();
    try {
        const req = await api.post<ILoginResponse>("/auth/login", { email, password });
        if (req.data) {
            state.user_id = req.data.id;
            state.email = req.data.email;
            state.username = req.data.username;
            state.auth_token = req.data.token;
            state.expires_at = new Date(req.data.expires_at);
            state.role = req.data.role;
            
            api.defaults.headers.common['Authorization'] = `Bearer ${state.auth_token}`;

            localStorage.setItem("auth", JSON.stringify(state));
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


function init_load(){
    const data = localStorage.getItem("auth");

    if(data){
        const parsed: IAuthState = JSON.parse(data);
        state.auth_token = parsed.auth_token;
        state.user_id = parsed.user_id;
        state.username = parsed.username;
        state.email = parsed.email;
        state.expires_at = new Date(parsed.expires_at!);
        state.role = parsed.role;
        api.defaults.headers.common['Authorization'] = `Bearer ${state.auth_token}`;
        
        if(!is_authenticated()){
            logout();
        }

    }
}

function logout(){
    state.user_id = null;
    state.email = undefined;
    state.username = undefined;
    state.auth_token = undefined;
    state.expires_at = undefined;
    state.role = 2;

    localStorage.removeItem("auth");

    delete api.defaults.headers.common["Authorization"];
}




export default { state: readonly(state), is_authenticated, login, signup, logout, init_load };
