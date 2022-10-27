import { reactive } from 'vue'

interface state {
    loading: boolean
    error: boolean
    data: any
}
interface config {
    method: string
    body?: string
}

export const useFetch = (url: string, config: config, headers = "") => {
    const state = reactive({
        loading: false,
        error: false,
        data: null
    }) as state
    const fetchData = async () => {
        await fetch(`http://localhost:3000/api_v2/${url}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "JSESSIONID": headers
                },
                ...config
            }
        )
            .then(type => type.json())
            .then(res => state.data = res)
            .catch(err => state.error = err)
        return state
    }
    return fetchData;
}