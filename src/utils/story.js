const generateStoryPath = ({
  title,
  storyId,
}) => {
  if (!title || !storyId) {
    return undefined;
  }
  const titleInFormat = title.toLowerCase().split(' ').join('-');
  return `${titleInFormat}-${storyId}`;
}

const getStoryIdFromPath = ({
  path
}) => {
  if (!path || typeof path !== 'string') {
    return undefined;
  }
  return path?.split('-')?.pop();
}

export {
  generateStoryPath,
  getStoryIdFromPath
}
