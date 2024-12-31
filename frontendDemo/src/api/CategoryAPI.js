import { apiClient } from "../config/apiClient";
import { jwtDecode } from "jwt-decode";


const getJWTToken = () => {
    const token = localStorage.getItem('accessToken');

    return token;
}

export default class CategoryAPI {
    static async create(data){
        try {
            const token = getJWTToken();

            const response = await apiClient.post('/category/create/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            console.error(error.response.data.message);
            if (error.response.status === 401) {
                console.error('Требуется повторный вход в систему');
            }
        }
    }
    static async set(data){
        try {
            const token = getJWTToken();

            if (!token) {
                throw new Error('Токен не найден');
            }
        
            const decoded = jwtDecode(token);
            const userId = decoded.user_id || decoded.id;
            if (!userId) {
                throw new Error('ID пользователя не найден в токене');
            }
        
            console.log('UserID из токена:', userId);
            console.log('Отправляемые данные:', data);

            const response = await apiClient.patch(`/category/${userId}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            console.error(error.response.data.message);
            if (error.response.status === 401) {
                console.error('Требуется повторный вход в систему');
            }
        }
    }
    static async delete(){
        try{
            const token = localStorage.getItem('accessToken');
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

            const response = await apiClient.delete(`/auth/user/${userId}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
            );
            return response;
        } catch (error) {
            console.error(error.response.data.message);
            if (error.response.status === 401) {
                console.error('Требуется повторный вход в систему');
            }
        }
    }
    static async all(){
        try{
            const response = await apiClient.get("/category/all/");
            return response;
        } catch (error) {
            console.error(error.response.data.message);
            if (error.response.status === 401) {
                console.error('Требуется повторный вход в систему');
            }
        }
    }
}