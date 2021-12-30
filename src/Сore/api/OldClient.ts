import ApiClient from '~/Сore/api/apiClient';

const options = {
  baseUrl: 'https://api.themoviedb.org'
};

const oldClient = new ApiClient('/3/', options);
export default oldClient;
