// @ts-ignore
import ViewNodeSensorVM from './ViewNodeSensorVM.tsx'
// @ts-ignore
import ViewNodeSwitchVM from './ViewNodeSwitchVM.tsx'

export interface ViewVM {
    Id: number,
    Name: string,
    sensors: ViewNodeSensorVM[]
    switches: ViewNodeSwitchVM[]
}