import { reactive, readonly } from "vue";
import AxiosApi from "@/service/axios_api";

export interface Device {
    id?: any
    name: string,
    location?: string,
    description?: string
}


interface DeviceState{
    current_device: Device | null
}


const api = AxiosApi.getInstance().api;

const state = reactive<DeviceState>({
    current_device: null,
});




async function fetch_device(id: any){
    try {
        const resp = await api.get(`/device/${id}`);
        state.current_device = resp.data;
    } catch (error) {
        console.log("Fetch device error: ", error);
    }
}


async function update_device(id: any, device: any){
    try {
        const resp = await api.patch(`/device/${id}`, device);
        state.current_device = resp.data;
    } catch (error) {
        console.log("Fetch device error: ", error);
    }
}

async function create_device(device: any){
    try {
        const resp = await api.post(`/device/`, device);
        state.current_device = resp.data;
    } catch (error) {
        console.log("Fetch device error: ", error);
    }
}

async function remove_device(id: any){
    try {
        await api.delete(`/device/${id}`);
        state.current_device = null;
    } catch (error) {
        console.log("Removing device error", id, error);
    }
}



export default {state: readonly(state), fetch_device, create_device, update_device, remove_device}