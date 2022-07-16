import Section from './Section/Section';
import AboutMeContent from '../../../../content/topicSections/AboutMe.json'

function Info(props) {
  const sections = AboutMeContent.sections.map((section, index) => {
    return (
      <Section
        title={ section.title }
        link={ section.link }
        content={ section.content }
        image={ section.image }
        key={ index }
      >
      </Section>
    );
  })
  return (
    <div className='info'>
      { sections }
    </div>
  );
}

export default Info;