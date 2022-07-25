import { useState } from 'react';

import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import Canvas from './components/Canvas';

function App() {
  const [activeSection, setActiveSection] = useState('About Me');
  return (
    <div className='app container-fluid'>
      <div className='row nav'><Navigation activeSection={ activeSection } setActiveSection={ setActiveSection }></Navigation></div>
      <div className='container content-container'>
        <div className='row h-100 d-flex align-items-center container'>
          <span className='container-fluid col-lg-6 col-xs-12 content-item'><MainContent activeSection={ activeSection }></MainContent></span>
          <span className='container-fluid col-sm-1 content-item d-flex d-none d-lg-flex'><span className='vr' /></span>
          <span className='container-fluid col-sm-5 content-item d-none d-lg-block'><Canvas activeSection={ activeSection }></Canvas></span>
        </div>
      </div>
    </div>
  );
}

export default App;
