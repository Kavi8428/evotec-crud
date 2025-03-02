import ky from "ky";



export const api = ky.create({
    prefixUrl: process.env.API_BASE_URL,
    timeout: 6000,
    retry: 0,
});