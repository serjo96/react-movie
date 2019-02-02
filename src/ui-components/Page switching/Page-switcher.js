import React from 'react';
import PropTypes from 'prop-types';

export const PageSwitcher  = (PagesData) => {
    if (PagesData.total_pages > 1) {
        return (
            <div className="pager-btns clearfix">
                {PagesData.page - 1 > 1
                    ? <div
                        className="pager-btn pager-btn--prev link-angle link-angle--left"
                        onClick={PagesData.prevPage}>
                        <i className="fa fa-angle-left" aria-hidden="true" />
                        <span>Предыдущая страница</span>
                    </div>
                    : null}

                {PagesData.page + 1 < PagesData.total_pages
                    ? <div
                        className="pager-btn pager-btn--next link-angle"
                        onClick={PagesData.nextPage}>
                        <span>Следующая страница</span>
                        <i className="fa fa-angle-right" aria-hidden="true" />
                    </div>
                    : null}
            </div>
        );
    } 
    return null;
	
};

PageSwitcher.propTypes = {
    page: React.PropTypes.number,
    total_pages: React.PropTypes.number,
    prevPage: React.PropTypes.func,
    nextPage: React.PropTypes.func
};
