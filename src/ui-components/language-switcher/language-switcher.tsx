import React from 'react';

import { Languages } from '~/store/config/config.slice';
import './language-switcher.sass';
import useTranslations from '~/hooks/useTranslations';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

export default function LanguageSwitcher () {
  const { setLang, lang } = useTranslations();
  const selectedLanguageTitle = lang === Languages.RU ? 'RU' : 'EN';

  return (

    <div className='language-switcher'>
      <Tippy
        interactive
        className='languages-list'
        content={
          <React.Fragment>
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
          </React.Fragment>
        }
      >
        <button className='language-switcher__button link'>
          <span>{selectedLanguageTitle}</span>
          <i className='fa fa-sort-desc' />
        </button>
      </Tippy>

    </div>

  );
}
