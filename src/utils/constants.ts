export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTE: string = "api/auth";
export const SIGNUP_ROUTE: string = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE: string = `${AUTH_ROUTE}/login`;
export const GET_USERINFO: string = `${AUTH_ROUTE}/user-info`;
export const UPDATE_PROFILE_ROUTE: string = `${AUTH_ROUTE}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE: string = `${AUTH_ROUTE}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE: string = `${AUTH_ROUTE}/remove-profile-image`;
