import configs from "../../configs";


export function isFreepikProvider() {
    return configs.PROVIDER === "FREEPIK" ? true : false
}
