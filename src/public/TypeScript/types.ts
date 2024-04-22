interface User {
    username?: string,
    password?: string,
    avatar?: Blob | File,
    userId?: number | string
}
type pendingType<T> = T | null;
type Header = {
    [key:string]: string
}
interface UserSignedResponse {
    accessToken: string,
    user: User
}
interface SearchServerInterface {
    result: object;
    statusCode: number
}
interface Message {
    userId: string | number,
    authorUserId: string | number,
    message: string
}