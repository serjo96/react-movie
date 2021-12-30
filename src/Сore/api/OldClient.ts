import ApiClient from '~/Сore/api/apiClient';

const options = {
  baseUrl: 'https://api.themoviedb.org'
};

const oldClient = new ApiClient('/3/', options).setQueryParams({
  api_key: '5a1d310d575e516dd3c547048eb7abf1'
});
export default oldClient;
