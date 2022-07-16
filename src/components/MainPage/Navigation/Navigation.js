import TopicsList from './Topics/TopicsList';

function Navigation(props) {
  return (
    <div id='navigation'>
      <span id='page-title'>Hacking with Haresh</span>
      <TopicsList></TopicsList>
    </div>
  );
}

export default Navigation;