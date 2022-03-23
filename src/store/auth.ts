import { reactive, readonly } from "vue";

import AxiosApi from "@service/axios_api";
import axios, { AxiosError } from "axios";

const api = AxiosApi.getInstance().api;

interface ILoginResponse {
    id: any;
    email: string;
    username: string;
    token: string;
    expires_at: Date;
}

interface IAuthState {
    user_id: any;
    email?: string;
    username?: string;
    auth_token?: string;
    expires_at?: Date;
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
        console.log(req.data);

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

            api.defaults.headers.common['Authorization'] = `Bearer ${state.auth_token}`
            
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

function logout(){
    state.user_id = null;
    state.email = undefined;
    state.username = undefined;
    state.auth_token = undefined;
    state.expires_at = undefined;

    delete api.defaults.headers.common["Authorization"];
}




export default { state: readonly(state), is_authenticated, login, signup, logout };
