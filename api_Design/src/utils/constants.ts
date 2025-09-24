export const ACCESS_TOKEN = "accessToken"
export const ACCESS_TOKEN_EXPIRE = "15m"
export const REFRESH_TOKEN = "refreshToken"
export const REFRESH_TOKEN_EXPIRE = "7d"


export const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "access_token"


export const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_token"

