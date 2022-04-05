import { reactive, readonly } from "vue";
import AxiosApi from "@/service/axios_api";
import { IAttribute, IAttributesMapMQTT, IConnection, IDeviceAttributes, IDeviceData, IDeviceShort } from "@/types/device";

import qs from "qs";

interface DeviceState {
    current_device: IDeviceData | null;
    device_list: IDeviceShort[];
}

const api = AxiosApi.getInstance().api;

const state = reactive<DeviceState>({
    current_device: null,
    device_list: [],
});

async function fetch_device_list() {
    try {
        const resp = await api.get<IDeviceShort[]>(`/device`);
        state.device_list = [...resp.data];
    } catch (err) {
        console.log("Error fetching devices");
    }
}

async function fetch_device(id: number) {
    try {
        const resp = await api.get<IDeviceData | null>(`/device/${id}`);
        state.current_device = resp.data;
    } catch (error) {
        console.log("Fetch device error: ", error);
    }
}

export async function update_device(id: number, device: IDeviceShort) {
    try {
        const resp = await api.patch(`/device/${id}`, device);
        fetch_device_list();
        state.current_device = resp.data;
    } catch (error) {
        console.log("Fetch device error: ", error);
    }
}

export async function create_device(device: IDeviceShort) {
    try {
        const resp = await api.post(`/device/`, device);
        fetch_device_list();
        state.current_device = resp.data;
    } catch (error) {
        console.log("Fetch device error: ", error);
    }
}

export async function remove_device(id: number) {
    try {
        await api.delete(`/device/${id}`);
        fetch_device_list();
        state.current_device = null;
    } catch (error) {
        console.log("Removing device error", id, error);
    }
}

async function add_attribute(attribute: IAttribute) {
    try {
        let dev_id = state.current_device!.id;
        await api.post(`/device/${dev_id}/attributes`, attribute);
        fetch_device(dev_id!);
    } catch (error) {
        console.log(error);
    }
}

async function update_attribute(attribute: IAttribute) {
    try {
        let dev_id = state.current_device!.id;
        let attr_id = attribute.id;

        await api.patch(`/device/${dev_id}/attributes/${attr_id}`, attribute);
        fetch_device(dev_id!);
    } catch (error) {
        console.log("Update attribute err", error);
    }
}

async function delete_attribute(attr_id: number) {
    try {
        let dev_id = state.current_device!.id;

        await api.delete(`/device/${dev_id}/attributes/${attr_id}`);
        fetch_device(dev_id!);
    } catch (error) {
        console.log("Deleting attribute err", error);
    }
}

export async function update_connection(data: IConnection) {
    try {
        let dev_id = state.current_device!.id;
        state.current_device = (await api.post(`/device/${dev_id}/connection`, { connection: data })).data;
        await fetch_device_list();
    } catch (error) {
        console.log("Update connection err", error);
    }
}

export async function GetDevicesAttributes() {
    try {
        let data = (await api.get("/device/attributes")).data;

        return data as IDeviceAttributes[];
    } catch (error) {
        console.log("fetch all attributes err", error);
        return [];
    }
}

export async function FetchTelemetry(attributes: number[], date_start?: Date, date_end?: Date) {
    let req = await api.get("/device/telemetry", {
        params: {
            attr: [...attributes],
            date_end: date_end,
            date_start: date_start
        },
        paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'repeat'})
          }
    });

    return req.data;
}

// export default { state: readonly(state), fetch_device, create_device, update_device, remove_device, fetch_device_list, add_attribute, update_attribute, delete_attribute };

export default {
    state,
    fetch_device_list,
    fetch_device,
    update_device,
    remove_device,
    create_device,
    add_attribute,
    update_attribute,
    delete_attribute,
    update_connection,
};
