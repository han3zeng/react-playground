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
