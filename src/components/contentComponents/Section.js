import 'bootstrap/js/dist/collapse';
import sectionContent from '../../content/sectionContent';
import SectionItem from './SectionItem';

function Section(props) {
  const sectionObj = sectionContent.find((elem) => elem.section = props.section);
  const content = sectionObj.content.map((obj, index) => {
    return (
      <SectionItem
        key={ index }
        idx={ index }
        sectionKey={ sectionObj.key }
        header={ obj.header }
        body={ obj.body }
        image={ obj.image }
        imageAlt={ obj.imageAlt }
      >
      </SectionItem>
    )
  });
  console.log(content);
  return (
    <div className='accordion' id={ 'accordion-' + sectionObj.key }>
      { content }
    </div>
  );
}

export default Section