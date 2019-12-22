import React from 'react';
import PropTypes from 'prop-types';

export const PageSwitcher = ({ page, totalPages, handlePrevPage, handleNextPage }) => {
  if (totalPages > 1) {
    return (
      <div className='pager-btns clearfix'>
        {page - 1 > 1
          ? <div
            className='pager-btn pager-btn--prev link-angle link-angle--left'
            onClick={handlePrevPage}
          >
            <i className='fa fa-angle-left' aria-hidden='true' />
            <span>Предыдущая страница</span>
          </div>
          : null}

        {page + 1 < totalPages
          ? <div
            className='pager-btn pager-btn--next link-angle'
            onClick={handleNextPage}
          >
            <span>Следующая страница</span>
            <i className='fa fa-angle-right' aria-hidden='true' />
          </div>
          : null}
      </div>
    );
  }
  return null;
};

PageSwitcher.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  handlePrevPage: PropTypes.func,
  handleNextPage: PropTypes.func
};
