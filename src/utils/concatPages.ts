import { ListData } from '~/core/types/listData';

export interface ResponsePages<T>{
  firstPage: {
    data: ListData<T>
  }
  secondPage?: {
    data: ListData<T>
  }
}

export default function ConcatPages<T> (data: ResponsePages<T>): ListData<T> {
  const { firstPage, secondPage } = data;
  if (secondPage && secondPage.data.results) {
    return {
      ...secondPage.data,
      results: firstPage.data.results.concat(secondPage.data.results),
      page: firstPage.data.page
    };
  } else {
    return firstPage.data;
  }
}
