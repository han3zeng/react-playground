import config from '../config';

const { resourceServerOrigin } = config;

const getCSRFToken = () => {
  if (document) {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  }
  return undefined;
};

const getUserProfile = async () => {
  if (window) {
    const dataString = localStorage?.getItem('userProfile');
    try {
      return await JSON.parse(dataString);
    } catch(e) {
      console.log('parse profile error')
    }
  }
  return undefined;
}

const createStory = async ({
  content,
  title,
}) => {
  if (!title) {
    return;
  }
  const option = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': getCSRFToken(),
    },
    referrerPolicy: 'no-referrer',
    credentials: 'include',
    body: JSON.stringify({
      content,
      title,
    }),
  }
  try {
    const response = await fetch(`${resourceServerOrigin}/story/create`, option);
    const result = await response.json();
    const { ok, message } = result;
    if (response.status === 200 && ok) {
      return {
        ok: true,
      }
    }
  } catch (e) {
    return {
      ok: false,
    }
  }
}

const deleteStory = ({
  userSub,
  storyId,
}) => {

}

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
    credentials: 'include'
  }
  try {
    const response = await fetch(`${resourceServerOrigin}/story/get-all`, option);
    const result = await response.json();
    const { ok, message, stories } = result;
    if (response.status === 200 && ok) {
      return stories;
    }
  } catch(e) {
    console.log('get stories error: ', e);
  }
}

export {
  createStory,
  deleteStory,
  getCSRFToken,
  getStories
}
