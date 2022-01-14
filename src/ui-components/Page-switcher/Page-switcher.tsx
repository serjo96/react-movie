import React from 'react';
import './page-switcher.sass';

interface MyProps {
  page: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const PageSwitcher = ({ page, totalPages, handlePrevPage, handleNextPage }: MyProps) => {
  if (totalPages === 1) {
    return null;
  }

  return (
    <div className='pager-btns clearfix'>
      {page - 1 > 1 &&
        <div
          className='pager-btn pager-btn--prev link-angle link-angle--left'
          onClick={handlePrevPage}
        >
          <i className='fa fa-angle-left' aria-hidden='true' />
          <span>Предыдущая страница</span>
        </div>}

      {page + 1 < totalPages &&
        <div
          className='pager-btn pager-btn--next link-angle'
          onClick={handleNextPage}
        >
          <span>Следующая страница</span>
          <i className='fa fa-angle-right' aria-hidden='true' />
        </div>}
    </div>
  );
};

export default PageSwitcher;
