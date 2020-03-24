
import { config } from '../config';


export class AuthService {
    
    public sessionId: string = ''; 
    public user: string = ''; 
    public token: string = ''; 
    public currency: string = ''; 
    public language: string = ''; 
    public store_id: number | null = 0;  

    constructor() {
        this.loadToken();
    }

    signIn(params: any) {

        return fetch(config.API + 'common/login/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
    }

    logout() {
        window.localStorage.removeItem('session_id');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('currency');
        window.localStorage.removeItem('language');
        window.localStorage.removeItem('store_id');

        return fetch(config.API + 'common/logout/index', {
            method: 'POST',
            headers: this.getHeaders()
        });
    }

    loadToken() {
        this.sessionId = window.localStorage.getItem('session_id') + '';
       // this.user = window.localStorage.getItem('user') + '';
        this.token = window.localStorage.getItem('token') + '';
        this.currency = window.localStorage.getItem('currency') + '';
        this.language = window.localStorage.getItem('language') + '';
    //    this.store_id = parseInt(window.localStorage.getItem('store_id'));
    }
    
    setToken(
        data: { 
            session_id: string, user: string, token: string,
            currency: string, language: string, store_id: number
        }
    ) {
        this.sessionId = data.session_id; 
        this.user = data.user;
        this.token = data.token; 
        this.currency = data.currency; 
        this.language = data.language; 
        this.store_id = data.store_id; 

        window.localStorage.setItem('session_id', data.session_id);
        window.localStorage.setItem('user', data.user);
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('currency', data.currency);
        window.localStorage.setItem('language', data.language);
        window.localStorage.setItem('store_id', data.store_id + '');
    }

    getHeaders() {
        this.loadToken();
        
        return {
            'Session-Id': this.sessionId,
            'Currency': 'USD',//this.currency,
          //  'Language': '1',// this.language,
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
        };
    }
} 