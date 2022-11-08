export const useCheckID = (pjid: string, stid: string) => {
    let str;
    let rExg = /All/;
    let warnStr = "";
    switch (pjid) {
        case "108023":
            rExg = /^800/;
            warnStr = "800";
            str = rExg.test(stid);
            break;
        case "108055":
            rExg = /^207/;
            warnStr = "207";
            str = rExg.test(stid);
            break;
        case "108064":
            rExg = /^500/;
            warnStr = "500";
            str = rExg.test(stid);
            break;
        case "108072":
            rExg = /^600/;
            warnStr = "600";
            str = rExg.test(stid);
            break;
        case "200209":
            rExg = /^GF|^O1|^SH|^SY|^HS|^YT|^PT|^3/;
            warnStr = "GF、O1、SH、SY、PT、YT、HS、3";
            str = rExg.test(stid);
            break;
        case "107038":
            rExg = /^O30/;
            warnStr = "O30";
            str = rExg.test(stid);
            break;
    }
    return {
        result: str,
        warnStr
    }
}