import React from 'react';
import classNames from 'classnames';

import {useAppDispatch, useAppSelector} from '~/hooks/storeHooks';
import {Languages, setLanguage} from '~/store/config/config.slice';
import './language-switcher.sass';

export default function LanguageSwitcher () {
  const appDispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(state => state.config.language);
  const selectedLanguageTitle = selectedLanguage === Languages.RU ? 'RU' : 'EN';

  const languageItemClass = (isActive: boolean) => classNames('languages-list__item', {
    'languages-list__item--active': isActive
  });

  return (

    <div className='language-switcher'>
      <button className='language-switcher__button link'>
        <span>{selectedLanguageTitle}</span>
        <i className='fa fa-sort-desc' />
      </button>

      <div className='languages-list'>
        <div
          className={languageItemClass(selectedLanguage === Languages.EN)}
          onClick={() => appDispatch(setLanguage(Languages.EN))}
        >
          English
        </div>
        <div
          className={languageItemClass(selectedLanguage === Languages.RU)}
          onClick={() => appDispatch(setLanguage(Languages.RU))}
        >
          Russian
        </div>
      </div>
    </div>

  );
}
