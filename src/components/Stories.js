import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { getStories } from '../api';
import { useLocation, useHistory } from 'react-router-dom';
import { story } from '../utils';

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
  const [ stories, setStories] = useState(null);
  const history = useHistory();
  const onClickTitleHandler = (data) => {
    const path = story.generateStoryPath(data);
    history.push(`/story/${path}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStories({
        csrfToken,
      });
      if (data) {
        setStories(data);
      }
    }
    fetchData();
  }, [csrfToken])
  const content = () => {
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
  return (
    <div>
      <h2>Your Stories</h2>
      {content()}
    </div>
  )
}

export default Stories;
