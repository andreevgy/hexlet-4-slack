import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/not_found_image.svg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('notFound.header')} className="img-fluid h-25" src={notFoundImage} />
      <h1 className="h4 text-muted">
        {t('notFound.header')}
      </h1>
      <p className="text-muted">
        {t('notFound.message')}
        <Link to="/">{t('notFound.linkText')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
