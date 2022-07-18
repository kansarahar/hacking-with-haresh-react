function SectionItem(props) {
  const headerId = 'header-' + props.sectionKey + '-' + props.idx;
  const bodyId = 'body-' + props.sectionKey + '-' + props.idx;
  const anchor = props.link ? (
    <a href={ props.link } className='accordion-body-goto-icon col-sm-2 d-flex justify-content-center align-items-center bg-light'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
      </svg>
    </a>
  ) : null;
  const image = props.image ? (
    <div className='accordion-image-container col-sm-3 d-flex align-items-center'>
      <img className='accordion-image' src={ props.image } alt={ props.imageAlt } />
    </div>
  ) : null;
  const remainingSpace = 12 - (props.image ? 3 : 0) - (props.link ? 2 : 0);

  const accordionBody = (
    <div className='accordion-body row'>
      { image }
      <div className= { 'accordion-body-content col-sm-' + remainingSpace } dangerouslySetInnerHTML={{ __html: props.body }} />
      { anchor }
    </div>
  );

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id={ headerId }>
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={ '#' + bodyId }
          aria-expanded='false'
          aria-controls={ bodyId }
        >
          { props.header }
        </button>
      </h2>
      <div
        id={ bodyId }
        className='accordion-collapse collapse'
        aria-labelledby={ headerId }
        data-bs-parent={ '#accordion-' + props.sectionKey }
      >
        { accordionBody }
      </div>
    </div>
  );
}

export default SectionItem;