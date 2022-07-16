import TopicsList from './Topics/TopicsList';
import Info from './Info/Info';

function Navigation(props) {
  return (
    <div className='navigation'>
      <TopicsList></TopicsList>
      <Info></Info>
    </div>
  );
}

export default Navigation;