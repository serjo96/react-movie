export const movieDues = (dues) => dues ? '$' + dues.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '\$1 ') : '-';
