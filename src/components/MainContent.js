import Section from './Sections/Section';

function MainContent(props) {
  return (
    <div className='main-content h-100'>
      <h2 className='section-title'>{ props.activeSection }</h2>
      <Section activeSection={ props.activeSection }></Section>
    </div>
  );
}

export default MainContent;