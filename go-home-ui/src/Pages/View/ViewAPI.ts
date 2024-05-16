import axios from "axios";
import { useEffect, useState } from "react";
import { NodeVM } from "../../Models/NodeVM.ts";

interface requestState {
    loading: boolean,
    data: any | null,
    error: Error | null
}

const useViewApi = (apiUrl: string) => {

    const useGet = (requestConfig) => {
        const localRequestConfig = requestConfig || {};
        const [state, setState] = useState<requestState>({
            loading: true,
            data: null,
            error: null,
        })

        if(!localRequestConfig?.method){
            localRequestConfig.method = 'GET'
        }

            if (localRequestConfig.url) {
                axios(localRequestConfig)
                .then((res) => {
                    setState(prevState => ({
                        ...prevState,
                        data: res.data,
                    }))
                })
                .catch((err) => {
                    setState(prevState => ({
                        ...prevState,
                        error: err,
                    }))
                })
                .finally(() => {
                    setState(prevState => ({
                        ...prevState,
                        loading: false,
                    }))
                });
            } else {
                setState(prevState => ({
                        ...prevState,
                        loading: false,
                        error: new Error('No URL provided!'),
                    })
                );
            }

        return state;
    }

    const useGetNodes = (nodeIds: number[]) =>{
        let nodes: NodeVM[] = [];
        let requestPromises: Promise<any>[] = [];

        const [returnNodes, setNodes] = useState<NodeVM[]>([]);

        useEffect(() => {
            nodeIds.forEach((id) => {
                requestPromises.push(axios.get(apiUrl + '/node/' + id))
            });

            Promise.all(requestPromises).then(results => {
                results.forEach(result => {
                    if(result && !result.error){
                        nodes.push(result.data);
                    }
                })

                setNodes(nodes);
            })
        }, [nodeIds]);

        return returnNodes;
    }

    const useGetNodeIds = (viewData: any) =>{
        const [nodeIdList, setNodeIdlist] = useState<number[]>([]);

        useEffect(() => {
            if(!viewData || viewData === null){
                const emptyNodes: number[] = [];
                setNodeIdlist(emptyNodes);
            }else{
                let nodeIds:number[] = [];

                if(viewData && viewData.sensors){
                    viewData.sensors.forEach((sensor) => {
                        if(!nodeIds.includes(sensor.NodeId)){
                            nodeIds.push(sensor.NodeId);
                        }
                    })
                }

                if(viewData && viewData.switches){
                    viewData.switches.forEach((nodeSwitch) => {
                        if(!nodeIds.includes(nodeSwitch.NodeId)){
                            nodeIds.push(nodeSwitch.NodeId);
                        }
                    })
                }

                setNodeIdlist(nodeIds);
            }

        }, [viewData]);

        return nodeIdList;
    }

return {useGet, useGetNodeIds, useGetNodes}
}

export default useViewApi;