import { apiClient } from "../config/apiClient";

export default class DocumentationAPI {
    static async getUsers(){
        try{
            const response = await apiClient.get("/auth/users/");
            return response;
        } catch (error) {
            return error;
        }
    }
}