import {
  gql
} from "@apollo/client";

export const getStories = gql`
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

export const getStory = ({ storyId }) => gql`
query {
  getStory (storyId: "${storyId}") {
    id,
    userId,
    storyId,
    content,
    title
  },
}
`

export const DELETE_STORY = gql`
mutation DeleteStory($storyId: String!) {
  deleteStory(storyId: $storyId) {
    message,
    ok
  }
}
`

export const CREATE_STORY = gql`
mutation CreateStory($content: String!, $title: String!) {
  createStory(content: $content, title: $title) {
    storyId,
    message,
    ok
  }
}
`
