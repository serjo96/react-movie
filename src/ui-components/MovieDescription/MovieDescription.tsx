import React from 'react';
import './media-description.sass';
import useTranslations from '~/hooks/useTranslations';
import { Languages } from '~/store/config/config.slice';
import { useTranslation } from 'react-i18next';

interface MyProps {
  short?: boolean;
  overview: string;
  fetchEngData?: () => void;
}

const MovieDescription = ({ short, overview, fetchEngData }: MyProps) => {
  const { lang } = useTranslations();
  const { t } = useTranslation('mediaCommon');
  const mediaOverview = () => {
    const textLength = 375;

    if (!overview) {
      return null;
    }
    if (!short || overview.length < textLength) {
      return overview;
    }
    return `${overview.substring(0, textLength)}...`;
  };

  if (mediaOverview() || !fetchEngData) {
    return (<p className='media-description'>{mediaOverview()}</p>);
  } else {
    return (
      <div className='media-description__no-description'>
        <div>{t('description.noDescription')}</div>
        {lang === Languages.RU &&
          <div className='load-eng-description'>
            <button onClick={fetchEngData}>Загрузить описание на английском?</button>
          </div>}
      </div>
    );
  }
};

export default MovieDescription;
