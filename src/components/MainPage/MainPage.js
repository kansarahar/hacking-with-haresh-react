import Canvas from './Canvas/Canvas';
import Navigation from './Navigation/Navigation';

function MainPage(props) {
  return (
    <div id='main-page'>
      <Navigation></Navigation>
      <Canvas></Canvas>
    </div>
  );
}

export default MainPage;