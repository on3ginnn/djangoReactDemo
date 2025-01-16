import { makeAutoObservable } from 'mobx';
import CategoryAPI from '../api/CategoryAPI';

class CategoryStore {
    constructor() {
        makeAutoObservable(this);
    }
    async createCategory(data) {
        try {
            await CategoryAPI.create(data);
        } catch (error) {
        }
    }
    async setCategory(id, data) {
        try {
            await CategoryAPI.set(id, data);
        } catch (error) {
        }
    }
    async deleteCategory(id) {
        try {
            await CategoryAPI.delete(id);
        } catch (error) {
        }
    }
    async getCategoryList() {
        try {
            const response = await CategoryAPI.all();
            return response.data;
        } catch (error) {
        }
    }
}

export let categoryStore = new CategoryStore();
