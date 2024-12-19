import { create } from "apisauce";

const client = create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
});

export default client;