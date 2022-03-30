import { getWindow } from 'ssr-window';

const window = getWindow();

export const pageSpeedApiEndpointUrl = (
  url: string,
  strategy: 'desktop' | 'mobile'
) => {
  const apiBaseUrl =
    'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const apiKey = window.localStorage?.getItem('apiKey');
  const websiteHomepageUrl = url;
  const apiEndpointUrl =
    apiBaseUrl +
    '?url=' +
    websiteHomepageUrl +
    '&key=' +
    apiKey +
    '&strategy=' +
    strategy;
  return apiEndpointUrl;
};
