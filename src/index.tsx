import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import configureStore from './store/configureStore';

const store = configureStore();
render(<AppContainer><Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider></AppContainer>, document.querySelector('#app'));

if (module && module.hot) {
  module.hot.accept('./App.tsx', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      document.querySelector('#app')
    );
  });
}
