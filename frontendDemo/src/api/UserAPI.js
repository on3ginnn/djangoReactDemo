import { apiClient } from "../config/apiClient";

export default class UserAPI {
    static async register(data){
        try {
            const response = await apiClient.post('/auth/register/', data);
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    static async login(data){
        try {
            const response = await apiClient.post('/auth/login/', data);
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    static async getUsers(){
        try{
            const response = await apiClient.get("/auth/users/");
            return response;
        } catch (error) {
            return error;
        }
    }
    static async getProfile() {
        try {
            const response = await apiClient.get('/auth/profile/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            console.log(response.data);
            console.log(response.status)

            return response.data;
        } catch (error) {
            console.error(error.response.data.message);
            if (error.response.status === 401) {
                console.error('Требуется повторный вход в систему');
            }
        }
    }
}