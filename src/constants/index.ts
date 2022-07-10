import * as jwt from 'jsonwebtoken';

export const PROD_ENV = 'production';
export const AUTH_SECRET_TOKEN = "b53e9b6273d7a2e1f33b26941e3272c87d1da7d3";
export const AUTH_JWT_OPTIONS: jwt.SignOptions = {
    expiresIn: '1d'
}
export const ARTICLES_URL = "https://api.spaceflightnewsapi.net/v3/articles?_limit=100";
export const ARTICLES_URL_MINUTES_TO_CALL = 5;