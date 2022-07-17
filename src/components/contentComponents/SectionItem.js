function SectionItem(props) {
  const headerId = 'header-' + props.sectionKey + '-' + props.idx;
  const bodyId = 'body-' + props.sectionKey + '-' + props.idx;
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id={ headerId }>
        <button
        className='accordion-button collapsed'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target={ '#' + bodyId }
        aria-expanded='false'
        aria-controls={ bodyId }>
          { props.header }
        </button>
      </h2>
      <div
        id={ bodyId }
        className='accordion-collapse collapse'
        aria-labelledby={ headerId }
        data-bs-parent={ '#accordion-' + props.sectionKey }
      >
        <div className='accordion-body'>
          <img src={ props.image } alt={ props.imageAlt } />
          <div>{ props.body }</div>
        </div>
      </div>
    </div>
  );
}

export default SectionItem;