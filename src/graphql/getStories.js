import config from '../config';

const { resourceServerOrigin } = config;

const queryString = `
query {
  getStories {
    id,
    userId,
    stories {
      storyId,
      title
    }
  }
}
`

const getStories = async ({
  csrfToken
}) => {
  if (!csrfToken) {
    return;
  }
  const option = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken,
    },
    referrerPolicy: 'no-referrer',
    credentials: 'include',
    body: JSON.stringify({
      query: queryString,
    }),
  }
  try {
    const response = await fetch(`${resourceServerOrigin}/story/get-all`, option);
    const result = await response.json();
    const { ok, message, stories } = result;
    if (response.status === 200 && ok) {
      return stories;
    }
  } catch(e) {
    return undefined;
    console.log('get stories error: ', e);
  }
}

export default getStories;
