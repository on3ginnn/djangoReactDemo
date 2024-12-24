import { apiClient } from "../config/apiClient";
import { jwtDecode } from "jwt-decode";

export default class UserAPI {
    static async register(data){
        try {
            const response = await apiClient.post('/auth/register/', data);
            return response;
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    static async setUser(data){
        try {
            console.log('fff');
            const token = localStorage.getItem('accessToken');
            console.log(token);
            if (!token) {
                throw new Error('Токен не найден');
            }

            // Декодируем токен для получения userId
            const decoded = jwtDecode(token);
            const userId = decoded.user_id || decoded.id; // Убедитесь, какое поле содержит ID

            if (!userId) {
                throw new Error('ID пользователя не найден в токене');
            }

            console.log('UserID из токена:', userId);
            console.log('Отправляемые данные:', data);

            const response = await apiClient.patch(`/auth/user/${userId}/`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            );
            return response;
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
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