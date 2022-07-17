import logo from '../assets/images/logo/logo.png';

function Navigation(props) {
  return (
    <nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
      <div className='container'>
        <span className='navbar-brand'>Hacking with Haresh</span>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav'>
            <li className='nav-item active nav-link'><span>About Me</span></li>
            <li className='nav-item nav-link'><span>Physics</span></li>
            <li className='nav-item nav-link'><span>Machine Learning</span></li>
            <li className='nav-item nav-link'><span>Graphics</span></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;