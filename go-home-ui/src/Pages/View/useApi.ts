import axios from "axios";
import { useEffect, useState } from "react";

interface requestState {
    loading: boolean,
    data: any | null,
    error: Error | null
}

const useApi = (requestConfig) => {
    const localRequestConfig = requestConfig || {};
    const [state, setState] = useState<requestState>({
        loading: true,
        data: null,
        error: null,
    })

    if(!localRequestConfig?.method){
        localRequestConfig.method = 'GET'
    }

    useEffect(() => {
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
    }, [])

    return state;
}

export default useApi;