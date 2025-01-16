import { apiClient } from "../config/apiClient";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


const getJWTToken = () => {
    const token = localStorage.getItem('accessToken');

    return token;
}

export default class ProductAPI {
    static async create(data){
        try {
            const token = getJWTToken();
            console.log('Отправляемые данные:', data);
            const response = await apiClient.post('/product/create/', data, {
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
    static async set(productId, data){
        try {
            const token = getJWTToken();

            if (!token) {
                throw new Error('Токен не найден');
            }
            const response = await apiClient.patch(`/product/${productId}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response;
        } catch (error) {
            if (axios.isAxiosError(error)){
                if (error.response.status === 401) {
                    console.error('Требуется повторный вход в систему');
                } else if (error.response) {
                    console.error(`Ошибка с ответом от сервера:\nСтатус: ${error.response.status}`);
                } else if (error.request) {
                    console.error('Запрос отправлен, но ответа нет:', error.request);
                } else {
                    console.error('Произошла ошибка при настройке запроса:', error.message);
                }
            } else{
                console.error(error);
            }
        }
    }
    static async delete(productId){
        try{
            const token = localStorage.getItem('accessToken');

            if (!token) {
                throw new Error('Токен не найден');
            }

            const response = await apiClient.delete(`/product/${productId}/`, {
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
            const response = await apiClient.get("/product/all/");
            return response;
        } catch (error) {
            console.error(error.response.data.message);
            if (error.response.status === 401) {
                console.error('Требуется повторный вход в систему');
            }
        }
    }
}