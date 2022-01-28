import ActionPayloadData from '~/core/types/actionPayloadData';
import { ListData } from '~/core/types/listData';

export const initListData = <T>(): ActionPayloadData<ListData<T>> => ({
  isFetching: false,
  isSuccess: true,
  data: {
    page: 1,
    results: [],
    totalResults: 0,
    totalPages: 0
  }
});
