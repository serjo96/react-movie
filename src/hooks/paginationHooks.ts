import { firstOrderObjectValue } from '~/utils/format';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';

export const usePagination = () => {
  const { search } = useLocation();
  const history = useHistory();
  const getUrlObjectState = {
    ...queryString.parse(search, { parseNumbers: true, parseBooleans: true }),
    genre: queryString.parse(search, { parseNumbers: true }).genre as number,
    adult: queryString.parse(search, { parseBooleans: true }).adult as boolean,
    page: queryString.parse(search, { parseNumbers: true }).page as number,
    country: queryString.parse(search).country as string,
    sort_by: queryString.parse(search).sort_by as string,
    year: queryString.parse(search).year as string
  };

  const prevPage = () => {
    let urlObj = { ...getUrlObjectState, page: getUrlObjectState.page };

    if (getUrlObjectState.page > 2) {
      urlObj.page = getUrlObjectState.page - 1;
    }
    urlObj = firstOrderObjectValue('page', urlObj);

    if (getUrlObjectState.page <= 2) {
      delete urlObj.page;
    }

    history.push({
      search: queryString.stringify(urlObj, { sort: false })
    });
  };

  const nextPage = () => {
    let urlObj = { ...getUrlObjectState, page: 2 };

    if (getUrlObjectState.page >= 2) {
      urlObj.page = getUrlObjectState.page + 1;
    }

    urlObj = firstOrderObjectValue('page', urlObj);
    history.push({
      search: queryString.stringify(urlObj, { sort: false })
    });
  };

  return { prevPage, nextPage };
};
