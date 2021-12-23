import Axios, { AxiosInstance } from 'axios';

export default class ApiClient  () {
  return fetch().create({
    baseURL: 'https://api.themoviedb.org/3/'
  });
}
