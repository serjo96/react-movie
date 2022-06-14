import ReactGA from 'react-ga4';

export default function initGoogleAds () {
  ReactGA.initialize(process.env.GOOGLE_ADS_TRACKING_ID);
  ReactGA.send(window.location.pathname + window.location.search);
}
