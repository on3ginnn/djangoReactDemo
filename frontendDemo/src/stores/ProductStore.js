import { makeAutoObservable } from 'mobx';
import ProductAPI from '../api/ProductAPI';

class ProductStore {
    constructor() {
        makeAutoObservable(this);
    }
    async createProduct(data) {
        try {
            await ProductAPI.create(data);
        } catch (error) {
        }
    }
    async setProduct(id, data) {
        try {
            await ProductAPI.set(id, data);
        } catch (error) {
        }
    }
    async deleteProduct(id) {
        try {
            await ProductAPI.delete(id);
        } catch (error) {
        }
    }
    async getProductList() {
        try {
            const response = await ProductAPI.all();
            return response.data;
        } catch (error) {
        }
    }
}

export let productStore = new ProductStore();
