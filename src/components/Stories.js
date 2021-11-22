import React from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { story } from '../utils';
import Loading from './Loading';
import Error from './Error';
import { getStories, DELETE_STORY } from '../api/graphql';
import {
  useQuery,
  useMutation,
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
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const Delete = styled.button`

`

function Stories({
  csrfToken
}) {
  const { loading: getLoading, error: getError, data } = useQuery(getStories);
  const history = useHistory();

  const [deleteStory, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_STORY, {
    onCompleted: () => {
      history.push("/stories");
    },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getStories }]
  });

  const onClickTitleHandler = (data) => {
    const path = story.generateStoryPath(data);
    history.push(`/story/${path}`);
  }

  const onDeleteHandler = ({
    storyId,
  }) => {
    deleteStory({
      variables: {
        storyId,
      }
    })
  }

  if (getError || deleteError) return <Error />;
  if (getLoading || deleteLoading) return <LoadingContainer><Loading /></LoadingContainer>;

  const content = () => {
    const stories = data?.getStories.stories;
    return stories?.map(({
      title,
      storyId
    }) => {
      return (
        <ContentContainer
          key={storyId}
        >
          <Row>
            <Title
              onClick={() => {
                onClickTitleHandler({ storyId, title })
              }}
            >{title}</Title>
            <div>
              <Delete
                onClick={() => {
                  onDeleteHandler({ storyId })
                }}
              >
                delete
              </Delete>
            </div>
          </Row>
        </ContentContainer>
      )
    })
  }
  return (
    <div>
      <h2>Your Stories</h2>
      {content()}
    </div>
  )
}

export default Stories;
