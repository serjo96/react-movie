import ReactGA from 'react-ga';

export default function initGoogleAds () {
  ReactGA.initialize(process.env.GOOGLE_ADS_TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
}
