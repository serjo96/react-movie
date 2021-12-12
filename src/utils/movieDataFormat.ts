export function movieDues (dues: string) {
  return dues ? '$' + dues.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '\$1 ') : '-';
}
