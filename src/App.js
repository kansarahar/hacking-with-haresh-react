import Navigation from './components/Navigation';
import MainPage from './components/MainPage';
import Canvas from './components/Canvas'

import logo from './assets/images/logo/logo.png';

function App() {
  return (
    <div className='app container-fluid'>
      <div className='row nav'>
        <Navigation></Navigation>
      </div>
      <div className='container content-container'>
        <div className='row h-100 d-flex align-items-center'>
          <span className='col-sm-6 h-90'><MainPage></MainPage></span>
          <span className='col-sm-1 h-90 d-flex'><span className='vr' /></span>
          <span className='col-sm-5 h-90'><Canvas></Canvas></span>
        </div>
      </div>
    </div>
  );
}

export default App;
