import { useState } from 'react';
import sectionContent from '../content/sectionContent';

function Navigation(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.setActiveSection(e.target.innerText);
  }
  const navItems = sectionContent.map((elem, index) => {
    return (
      <li
        className={ props.activeSection === elem.section ? 'nav-item nav-link active' : 'nav-item nav-link' }
        key={ index }
        onClick={ handleClick }
      >
        <span>{ elem.section }</span>
      </li>
    );
  });

  return (
    <nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
      <div className='container'>
        <span className='navbar-brand'>Hacking with Haresh</span>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav'>
            { navItems }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;