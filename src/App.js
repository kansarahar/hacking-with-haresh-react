import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
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
          <span className='container-fluid col-sm-6 content-item'><MainContent title='About Me'></MainContent></span>
          <span className='container-fluid col-sm-1 content-item d-flex'><span className='vr' /></span>
          <span className='container-fluid col-sm-5 content-item'><Canvas></Canvas></span>
        </div>
      </div>
    </div>
  );
}

export default App;
