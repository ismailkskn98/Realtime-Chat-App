export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTE: string = "api/auth";
export const SIGNUP_ROUTE: string = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE: string = `${AUTH_ROUTE}/login`;
export const GET_USERINFO: string = `${AUTH_ROUTE}/user-info`;
