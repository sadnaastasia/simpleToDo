import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

function AppWrapper() {
  return (
    <Provider store={store}>
      {' '}
      <App />
    </Provider>
  );
}

export default AppWrapper;
