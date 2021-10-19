import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { getStories } from '../api';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  border-bottom: 1px solid rgb(230 230 230);
  padding: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`

function Stories({
  csrfToken
}) {
  const [ stories, setStories] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStories({
        csrfToken,
      });
      setStories(data);
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
          <Row><Title>{title}</Title></Row>
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
