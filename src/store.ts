interface routeData {
    urls: string
    i: string
    text: string
}

export const routeData: routeData[] = [
    { urls: "/MainPanel", i: "dashboard", text: "Dashboard" },
    { urls: "/UpdateParams", i: "update", text: "更新參數設定" },
    { urls: "/History", i: "info", text: "歷史事件查詢" },
    { urls: "/IotHealth", i: "assignment", text: "健康度分析" },
]

export const routeDataAnotherFeatures = [
    { urls: "/MaintainForm", i: "image", text: "上傳巡檢維護照片" },
    { urls: "/MaintainImgDownload", i: "image", text: "下載巡檢維護照片" },
    { urls: "/ReportExcel", i: "image", text: "查詢巡檢表報表" },
]
export interface LoginInfo {
    Is_del: boolean
    ModifyPermissions: number
    Name: string
    ProjectName: string
    ProjectPermissions: string
    SessionID: string
    Type: string
}

export const minorData = [
    {
        mainIcon: "info",
        id: "online",
        title: "感測器上線狀態",
        data: "",
        footerIcon: "cached",
        footerText: "",
        isPer: true,
        iconColor: "cornflowerblue"
    },
    {
        mainIcon: "offline_bolt",
        id: "Fupload",
        title: "強制上傳",
        data: "",
        footerIcon: "power_settings_new",
        footerText: "快速開啟強制上傳",
        isPer: false,
        iconColor: "red"
    },
    {
        mainIcon: "offline_bolt",
        id: "Fdisconnect",
        title: "強制斷線",
        data: "",
        footerIcon: "power_settings_new",
        footerText: "快速開啟強制斷線",
        isPer: false,
        iconColor: "red"
    },
    {
        mainIcon: "work_outline",
        id: "Newwork",
        title: "新功能作業中",
        data: "0",
        footerIcon: "work_outline",
        footerText: "新功能作業中",
        isPer: false,
        iconColor: "red"
    }
]