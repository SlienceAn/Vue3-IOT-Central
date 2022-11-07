import { reactive } from 'vue'

//半成品
export const usePermission = (permission: number) => {

    const permissionView = reactive({
        path: [],
        switch: true,
        minorPanel: [],
        buttonList: [[
            { id: "#ZeroSpanParams", text: "Zero Span參數" },
            {
                id: "#WifiSetting",
                text: "Wifi設定",
            },
            {
                id: "#BigSetting",
                text: "重要設定",
            },
            {
                id: "#InfoSetting",
                text: "站台資訊設定",
            },
            {
                id: "#ModelType",
                text: "ModelType變更",
            },
        ]]
    })
    if (permission >= 5) {
        permissionView.buttonList = [[
            { id: "#ZeroSpanParams", text: "Zero Span參數" },
            {
                id: "#WifiSetting",
                text: "Wifi設定",
            },
            {
                id: "#BigSetting",
                text: "重要設定",
            },
        ]]
    }
    return permissionView
}