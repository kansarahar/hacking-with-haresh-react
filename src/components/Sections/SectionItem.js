function SectionItem(props) {
  const headerId = 'header-' + props.sectionKey + '-' + props.idx;
  const bodyId = 'body-' + props.sectionKey + '-' + props.idx;
  const anchor = props.link ? (
    <a href={ props.link } className='accordion-body-goto-icon col-xl-2 d-flex justify-content-center align-items-center bg-light'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </a>
  ) : null;
  const image = props.image ? (
    <div className='accordion-image-container col-xl-3 d-flex align-items-center'>
      <img className='accordion-image' src={ props.image } alt={ props.imageAlt } />
    </div>
  ) : <div className='accordion-image-container col-xl-3 d-flex align-items-center'></div>
  const remainingSpace = 12 - (props.image ? 3 : 0) - (props.link ? 2 : 0);

  const accordionBody = (
    <div className='accordion-body row'>
      { image }
      <div className={ 'accordion-body-content col-xl-' + remainingSpace } dangerouslySetInnerHTML={{ __html: props.body }} />
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