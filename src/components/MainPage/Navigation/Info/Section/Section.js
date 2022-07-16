function Section(props) {
  const sectionImage = props.image ? <img src={ props.image } alt={ props.title }></img> : null;
  return (
    <div className='section'>
      <span className='section-title' href={ props.link }>{ props.title }</span>
      <div className='section-content'>{ props.content }</div>
      { sectionImage }
      <span className='section-spacer'></span>
    </div>
  );
}

export default Section;