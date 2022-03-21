import React from 'react';
import './page-switcher.sass';
import { usePagination } from '~/hooks/paginationHooks';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('lists');

  const prevPageHandler = handlePrevPage || usePagination().prevPage;
  const nextPageHandler = handleNextPage || usePagination().nextPage;

  return (
    <div className='pager-btns clearfix'>
      {page > 1 &&
        <div
          className='pager-btn pager-btn--prev link-angle link-angle--left'
          onClick={prevPageHandler}
        >
          <i className='fa fa-angle-left' aria-hidden='true' />
          <span>{t('list.common.pagination.prev')}</span>
        </div>}

      {page < totalPages &&
        <div
          className='pager-btn pager-btn--next link-angle'
          onClick={nextPageHandler}
        >
          <span>{t('list.common.pagination.next')}</span>
          <i className='fa fa-angle-right' aria-hidden='true' />
        </div>}
    </div>
  );
};

export default PageSwitcher;
