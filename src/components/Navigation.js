import sectionContent from '../content/sectionContent';

function Navigation(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.setActiveSection(e.target.innerText);
  }
  const navItems = sectionContent.map((elem, index) => {
    return (
      <li
        className='nav-item'
        key={ index }
        onClick={ handleClick }
      >
        <span
          className={ props.activeSection === elem.section ? 'nav-link active' : 'nav-link' }
        >
          { elem.section }
        </span>
      </li>
    );
  });

  return (
    <nav className='navbar navbar-expand-md fixed-top navbar-dark bg-dark'>
      <div className='container'>
        <span className='navbar-brand'>Hacking with Haresh</span>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-md-0'>
            { navItems }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;