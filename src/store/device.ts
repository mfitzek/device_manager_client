import { reactive, readonly } from "vue";
import AxiosApi from "@/service/axios_api";


export interface Attribute {
    id?: any;
    name: string;
    type: "number" | "string" | "object";
}

export interface Device {
    id?: any;
    name: string;
    location?: string;
    description?: string;
    attributes?: Attribute[];
    connection?: {
        id: any;
        type: {
            id: any;
            name: string;
        };
    };
}

interface DeviceState {
    current_device: Device | null;
    device_list: Device[];
}

const api = AxiosApi.getInstance().api;

const state = reactive<DeviceState>({
    current_device: null,
    device_list: [],
});

async function fetch_device_list() {
    try {
        const resp = await api.get<Device[]>(`/device`);
        state.device_list = [...resp.data];
    } catch (err) {
        console.log("Error fetching devices");
    }
}

async function fetch_device(id: any) {
    try {
        const resp = await api.get(`/device/${id}`);
        state.current_device = resp.data;
    } catch (error) {
        console.log("Fetch device error: ", error);
    }
}

async function update_device(id: any, device: any) {
    try {
        const resp = await api.patch(`/device/${id}`, device);
        fetch_device_list();
        state.current_device = resp.data;
    } catch (error) {
        console.log("Fetch device error: ", error);
    }
}

async function create_device(device: any) {
    try {
        const resp = await api.post(`/device/`, device);
        fetch_device_list();
        state.current_device = resp.data;
    } catch (error) {
        console.log("Fetch device error: ", error);
    }
}

async function remove_device(id: any) {
    try {
        await api.delete(`/device/${id}`);
        fetch_device_list();
        state.current_device = null;
    } catch (error) {
        console.log("Removing device error", id, error);
    }
}



async function add_attribute(id: any, attribute: Attribute){
    try {
        await api.post(`/device/${id}/attributes`, attribute);
        fetch_device(id);
    } catch (error) {
        console.log(error);
    }
}



export default { state: readonly(state), fetch_device, create_device, update_device, remove_device, fetch_device_list, add_attribute };
