const token:pendingType<string> = getItem("chat-token") ? getItem("chat-token"): null;
const AUTH_PATH:string[] = ["/auth/register", "/auth/login"];
const BASIC_METHODS:string[] = ["POST", "PUT"];
const request = async (path?: string, reqMethod?: string, reqJsonBody?:object | undefined, reqFormDataBody?: FormData): Promise<any[] | void | any> => {
    try{
        let contentType = BASIC_METHODS.includes(reqMethod as string) ? {"Content-Type": "application/json"} : undefined;
        let headers: Header | undefined = !AUTH_PATH.includes(path as string) ? {token: token as string, ...contentType} : undefined;        
        if(AUTH_PATH.includes(path as string) && path == "/auth/login"){
            headers = {"Content-type": "application/json"}
        }
        let reqBody = reqJsonBody && Object.keys(reqJsonBody as object).length ? JSON.stringify(reqJsonBody): reqFormDataBody instanceof FormData ? reqFormDataBody: undefined;
        const req = await fetch(BECKEND_URL + path, {
            method: reqMethod,
            headers,
            body: reqBody as BodyInit
        });
        if(req.ok){
            const res = await req.json(); 
            return res;
        }
    }catch(error){
        console.log(error)
    }
}