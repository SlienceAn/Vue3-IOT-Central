import { reactive } from 'vue'

//半成品
export const usePermission = (permission: number) => {

    const permissionView = reactive({
        path: [],
        switch: true,
        minorPanel: [],
        buttonList: [[
            { id: "#ZeroSpanParams", text: "Zero Span參數", toggle: "collapse" },
            {
                id: "#WifiSetting",
                text: "Wifi設定",
                toggle: "collapse"
            },
            {   
                id: "#BigSetting",
                text: "重要設定",
                toggle: "collapse"
            },
            {
                id: "#InfoSetting",
                text: "站台資訊設定",
                toggle: "collapse"
            },
            {
                id: "#Modal",
                text: "ModelType變更",
                toggle: "modal"
            },
        ]]
    })
    if (permission >= 5) {
        permissionView.buttonList = [[
            { id: "#ZeroSpanParams", text: "Zero Span參數", toggle: "collapse" },
            {
                id: "#WifiSetting",
                text: "Wifi設定",
                toggle: "collapse"
            },
            {
                id: "#BigSetting",
                text: "重要設定",
                toggle: "collapse"
            },
        ]]
    }
    return permissionView
}