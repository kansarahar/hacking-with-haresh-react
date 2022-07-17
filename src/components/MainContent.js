import Canvas from './Canvas';
import Section from './contentComponents/Section';

function MainContent(props) {
  return (
    <div className='main-content h-100'>
      <h2 className='section-title'>{ props.title }</h2>
      <Section section='About Me'></Section>
    </div>
  );
}

export default MainContent;