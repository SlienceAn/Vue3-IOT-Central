import { reactive } from 'vue'

interface state {
    loading: boolean
    error: boolean
    data: any
    status: number
}
interface config {
    method: string
    body?: string
}

export const useFetch = (url: string, config: config, headers = "") => {
    const state = reactive({
        loading: false,
        error: false,
        status: 200,
        data: null
    }) as state
    const fetchData = async () => {
        state.loading = true;
        await fetch(`http://localhost:3000/api_v2/${url}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "JSESSIONID": headers
                },
                ...config
            }
        )
            .then(type => {
                state.status = type.status
                type.json()
            })
            .then(res => {
                state.data = res
                state.loading = false
            })
            .catch(err => state.error = true)
        return state
    }
    return fetchData;
}