import axios, { AxiosInstance } from "axios";


class AxiosApi{
    private static instance: AxiosApi;

    public api: AxiosInstance;

    private constructor() { 
        this.api = axios.create({
            baseURL: "/api",
        });
        
        
    }

    public static getInstance(): AxiosApi{
        if(!AxiosApi.instance){
            AxiosApi.instance = new AxiosApi();
        }
        return AxiosApi.instance;
    }
}

export default AxiosApi;