import { NodeSensorVM } from './NodeSensorVM'
import { NodeSwitchVM } from './NodeSwitchVM'

export interface NodeVM {
    Id: number,
    Name: string,
    Mac: string,
    IpAddress: string,
    controlPointId: number,
    controlPointIp: string,
    controlPointName: string,
    sensors: NodeSensorVM[],
    switches: NodeSwitchVM[]
}
