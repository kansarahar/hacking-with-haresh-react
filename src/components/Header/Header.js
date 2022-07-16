function Header(props) {
  return (
    <div className='header'>
      <img className='header-logo' src={ props.src } alt='logo'></img>
    </div>
  );
}

export default Header;