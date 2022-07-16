import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';

import logo from './assets/images/logo/logo.png';

function App() {
  return (
    <div className='app'>
      <Header src={ logo }></Header>
      <MainPage></MainPage>
    </div>
  );
}

export default App;
