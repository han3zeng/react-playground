import React from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { story } from '../utils';
import Loading from './Loading';
import { getStories } from '../api/graphql';
import {
  useQuery,
} from "@apollo/client";

const LoadingContainer = styled.div`
  display: flex;
  margin-top: 100px;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  border-bottom: 1px solid rgb(230 230 230);
  padding: 10px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`

function Stories({
  csrfToken
}) {
  const { loading, error, data } = useQuery(getStories);
  const history = useHistory();
  const onClickTitleHandler = (data) => {
    const path = story.generateStoryPath(data);
    history.push(`/story/${path}`);
  }
  const content = () => {
    if (loading) return <LoadingContainer><Loading /></LoadingContainer>;
    const stories = data?.getStories.stories;
    return stories?.map(({
      title,
      storyId
    }) => {
      return (
        <ContentContainer
          key={storyId}
        >
          <Row
            onClick={() => {
              onClickTitleHandler({ storyId, title })
            }}
          >
            <Title>{title}</Title>
          </Row>
        </ContentContainer>
      )
    })
  }

  if (error) return <p>Error :(</p>;
  return (
    <div>
      <h2>Your Stories</h2>
      {content()}
    </div>
  )
}

export default Stories;
