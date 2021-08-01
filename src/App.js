import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//importing store
import { store, persistor } from './store/store';

//importing custom component
import Component from './component/component'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
