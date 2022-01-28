import React from 'react';
import './page-switcher.sass';
import { usePagination } from '~/hooks/paginationHooks';

interface MyProps {
  page: number;
  totalPages: number;
  handlePrevPage?: () => void;
  handleNextPage?: () => void;
}

const PageSwitcher = ({ page, totalPages, handlePrevPage, handleNextPage }: MyProps) => {
  if (totalPages === 1) {
    return null;
  }

  const prevPageHandler = handlePrevPage || usePagination().prevPage;
  const nextPageHandler = handleNextPage || usePagination().nextPage;

  return (
    <div className='pager-btns clearfix'>
      {page - 1 > 1 &&
        <div
          className='pager-btn pager-btn--prev link-angle link-angle--left'
          onClick={prevPageHandler}
        >
          <i className='fa fa-angle-left' aria-hidden='true' />
          <span>Предыдущая страница</span>
        </div>}

      {page + 1 < totalPages &&
        <div
          className='pager-btn pager-btn--next link-angle'
          onClick={nextPageHandler}
        >
          <span>Следующая страница</span>
          <i className='fa fa-angle-right' aria-hidden='true' />
        </div>}
    </div>
  );
};

export default PageSwitcher;
