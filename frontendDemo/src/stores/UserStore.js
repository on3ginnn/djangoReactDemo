import {makeAutoObservable} from 'mobx';
import UserAPI from '../api/UserAPI';

class UserStore{
    isAuth = localStorage.getItem('isAuth') || false;
    accessToken = localStorage.getItem('accessToken') || '';
    userList = [];

    constructor(){
        makeAutoObservable(this);
    }
    async addUser(data){
        try {
            const response = await UserAPI.register(data);
            console.log(response);
        } catch (error) {
        }
    }
    async getUserList(){
        try {
            const response = await UserAPI.getUsers();

            this.userList = response.data;
            return response;
        } catch (error) {
        }
    }
    async getProfileUser(){
        try {
            const response = await UserAPI.getProfile();
            console.log(response);
            console.log(response.data);
            console.log(response.status);
            return response;
        } catch (error) {
        }
    }
    async loginUser(data){
        try {
            const response = await UserAPI.login(data);
            console.log(response)
            const { access, refresh } = response.data.tokens;

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('isAuth', true);
            this.accessToken = localStorage.getItem('accessToken');
            console.log(this.accessToken);
            // const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
            
        } catch (error) {
            
        }
    }
    logout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isAuth');
        this.accessToken = '';
    }
}
export let userStore = new UserStore();