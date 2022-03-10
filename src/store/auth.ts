import { reactive, readonly } from "vue";

import AxiosApi from "@service/axios_api";

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


const to_export = { state: readonly(state), is_authenticated, login };

export type auth_store = typeof to_export;


export default to_export;
