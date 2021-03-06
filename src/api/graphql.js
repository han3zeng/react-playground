import {
  gql,
} from '@apollo/client';

export const GET_STORIES = gql`
query GetStories{
  getStories {
    id,
    userId,
    stories {
      storyId,
      title
    }
  }
}
`;

export const getStory = gql`
query GetStory($storyId: String!){
  getStory (storyId: $storyId) {
    id,
    userId,
    storyId,
    content,
    title
  },
}
`;

export const DELETE_STORY = gql`
mutation DeleteStory($storyId: String!) {
  deleteStory(storyId: $storyId) {
    message,
    ok
  }
}
`;

export const CREATE_STORY = gql`
mutation CreateStory($content: String!, $title: String!) {
  createStory(content: $content, title: $title) {
    storyId,
    message,
    ok
  }
}
`;
