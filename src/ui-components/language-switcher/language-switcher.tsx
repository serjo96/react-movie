import React from 'react';
import classNames from 'classnames';

import {useAppDispatch, useAppSelector} from '~/hooks/storeHooks';
import {Languages, setLanguage} from '~/store/config/config.slice';
import './language-switcher.sass';

export default function LanguageSwitcher () {
  const appDispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(state => state.config.language);
  const selectedLanguageTitle = selectedLanguage === Languages.RU ? 'RU' : 'EN';

  return (

    <div className='language-switcher'>
      <button className='language-switcher__button link'>
        <span>{selectedLanguageTitle}</span>
        <i className='fa fa-sort-desc' />
      </button>

      <div className='languages-list'>
        <button
          disabled={selectedLanguage === Languages.EN}
          className='languages-list__item'
          onClick={() => appDispatch(setLanguage(Languages.EN))}
        >
          English
        </button>
        <button
          disabled={selectedLanguage === Languages.RU}
          className='languages-list__item'
          onClick={() => appDispatch(setLanguage(Languages.RU))}
        >
          Russian
        </button>
      </div>
    </div>

  );
}
