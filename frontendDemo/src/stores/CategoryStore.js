import {makeAutoObservable} from 'mobx';
import CategoryAPI from '../api/CategoryAPI';

class CategoryStore{
    constructor(){
        makeAutoObservable(this);
    }
    async createCategory(data){
        try {
            await CategoryAPI.create(data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    async setCategory(data){
        try {
            await CategoryAPI.set(data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    async deleteCategory(){
        try {
            await CategoryAPI.delete();
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    async getCategoryList(){
        try {
            const response = await CategoryAPI.all();
            this.userList = response.data;
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
}
export let categoryStore = new CategoryStore();