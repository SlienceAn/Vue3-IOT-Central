import { reactive } from 'vue'

export const usePermission = (permission: number) => {
    const permissionView = reactive({
        path: [],
        buttonList: []
    })

    return permissionView

}