import { SearchResult } from 'tmdb-typescript-api';

interface ResponsePages<T>{
  firstPage: {
    data: SearchResult<Array<T>>
  }
  secondPage?: {
    data: SearchResult<Array<T>>
  }
}

export default function ConcatPages<T> (data: ResponsePages<T>) {
  const { firstPage, secondPage } = data;
  if (firstPage.data.total_pages > 1) {
    return {
      ...secondPage.data,
      results: secondPage.data.results.concat(secondPage.data.results),
      page: secondPage.data.page
    };
  } else {
    return firstPage.data;
  }
}
