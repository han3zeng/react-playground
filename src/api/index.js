import config from '../config';

const { resourceServerOrigin } = config;

const getCSRFToken = () => {
  if (document) {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  }
  return undefined;
};

const getUserProfile = () => {
  if (window) {
    return localStorage?.getItem('userProfile');
  }
  return undefined;
}

const createArticle = async ({
  content,
  title,
}) => {
  const userProfile = getUserProfile();
  const { sub } = userProfile;
  if (!sub || !title) {
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
      sub
    }),
  }
  const response = await fetch(`${resourceServerOrigin}/article/create`, option);
  const result = await response.json();
  const { ok, message } = result;
  if (response.status === 200 && ok) {
    console.log('create article successfully');
  }
}

const deleteArticle = ({
  userSub,
  articleId,
}) => {

}

export {
  createArticle,
  deleteArticle,
  getCSRFToken
}
