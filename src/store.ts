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