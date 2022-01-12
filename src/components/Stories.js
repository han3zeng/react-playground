import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { story } from '../utils';
import Loading from './Loading';
import Error from './Error';
import { GET_STORIES, DELETE_STORY } from '../api/graphql';
import { PATH } from '../constants';

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

const Delete = styled.button``;

function Stories() {
  const { loading: getLoading, error: getError, data } = useQuery(GET_STORIES);
  const router = useRouter();

  const [deleteStory, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_STORY, {
    onCompleted: () => {
      router.push(`/${PATH.stories}`);
    },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_STORIES }],
  });

  const onClickTitleHandler = (data) => {
    const path = story.generateStoryPath(data);
    router.push(`/${PATH.story}/${path}`);
  };

  const onDeleteHandler = ({ storyId }) => {
    deleteStory({
      variables: {
        storyId,
      },
    });
  };

  if (getError || deleteError) return <Error />;
  if (getLoading || deleteLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  const content = () => {
    const stories = data?.getStories?.stories;
    return stories?.map(({ title, storyId }) => (
      <ContentContainer key={storyId}>
        <Row>
          <Title
            onClick={() => {
              onClickTitleHandler({ storyId, title });
            }}
          >
            {title}
          </Title>
          <div>
            <Delete
              onClick={() => {
                onDeleteHandler({ storyId });
              }}
            >
              delete
            </Delete>
          </div>
        </Row>
      </ContentContainer>
    ));
  };
  return (
    <div>
      <h2>Your Stories</h2>
      {content()}
    </div>
  );
}

export default Stories;
