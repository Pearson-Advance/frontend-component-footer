import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
  'FOOTER_PRIVACY_POLICY_LINK',
  'FOOTER_TERMS_OF_SERVICE_LINK',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

const dateNow = new Date();

const SiteFooter = ({
  supportedLanguages,
  onLanguageSelected,
}) => {
  const intl = useIntl();
  const { config } = useContext(AppContext);

  const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;

  return (
    <footer
      role="contentinfo"
      className="footer d-flex border-top py-3 px-4"
    >
      <div className="container-fluid d-flex">
        <ul>
          <li>
            <a href={config.FOOTER_PRIVACY_POLICY_LINK} target="_blank" rel="noopener noreferrer">
              {intl.formatMessage(messages['footer.legalLinks.privacyPolicy'])}
            </a>
          </li>
          <li>
            <a href={config.FOOTER_TERMS_OF_SERVICE_LINK} target="_blank" rel="noopener noreferrer">
              {intl.formatMessage(messages['footer.legalLinks.termsOfServiceNoHonorCode'])}
            </a>
          </li>
        </ul>
        <div className="flex-grow-1" />
        {showLanguageSelector && (
          <LanguageSelector
            options={supportedLanguages}
            onSubmit={onLanguageSelected}
          />
        )}
      </div>
      <div className="container-fluid d-flex copyright">
        <p>
          Copyright © {dateNow.getFullYear()} Pearson Education Inc. or its affiliate(s). All rights reserved.
        </p>
      </div>
    </footer>
  );
};

SiteFooter.propTypes = {
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default SiteFooter;
export { EVENT_NAMES };
