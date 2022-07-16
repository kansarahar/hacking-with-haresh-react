import TopicsListItem from './TopicsListItem';

function Topics(props) {
  const topics = [
    'About Me',
    'Physics',
    'Computer Science',
    'Games',
  ].map((topic, index) => {
    return <TopicsListItem name={ topic } key={ index }></TopicsListItem>
  });
  return (
    <div id='topics-list'>
      { topics }
    </div>
  );
}

export default Topics;