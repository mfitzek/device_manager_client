
export type ConnectionType = "mqtt" | "http";
export type AttributeType = "number" | "string" | "object";

export interface IDeviceShort {

    id?: number,
    ownerID: number,
    name: string,
    location: string | null,
    description: string | null,
    connection: ConnectionType

}

export interface IDeviceData {

    id?: number,
    ownerID: number,
    name: string,
    location: string | null,
    description: string | null,

    connection: IConnection,
    attributes: IAttribute[],

}

export interface IAttribute {

    id?: number,
    name: string,
    type: AttributeType

}

export interface IAttributesMapMQTT{

    id?: number,
    path: string,
    attributeID: number
}

export interface IConnectionMQTT {

    id?: number,
    url: string,
    clientID: string,
    username: string | null,
    password: string | null,

    attributes_map: IAttributesMapMQTT[]

}

export interface IConnection {

    type: ConnectionType,
    mqtt: IConnectionMQTT | null,

}
