import React from 'react';

import { Languages } from '~/store/config/config.slice';
import './language-switcher.sass';
import useTranslations from '~/hooks/useTranslations';

export default function LanguageSwitcher () {
  const { setLang, lang } = useTranslations();
  const selectedLanguageTitle = lang === Languages.RU ? 'RU' : 'EN';

  return (

    <div className='language-switcher'>
      <button className='language-switcher__button link'>
        <span>{selectedLanguageTitle}</span>
        <i className='fa fa-sort-desc' />
      </button>

      <div className='languages-list'>
        <button
          disabled={lang === Languages.EN}
          className='languages-list__item'
          onClick={() => setLang(Languages.EN)}
        >
          ENG
        </button>
        <button
          disabled={lang === Languages.RU}
          className='languages-list__item'
          onClick={() => setLang(Languages.RU)}
        >
          RU
        </button>
      </div>
    </div>

  );
}
