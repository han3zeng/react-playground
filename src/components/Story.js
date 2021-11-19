import React from 'react';
import { useLocation } from 'react-router-dom';
import escapeHtml from 'escape-html'
import { Text } from 'slate'
import styled from 'styled-components';
// import { getStory } from '../api';
import { story as storyTool } from '../utils';
import { Leaf, DefaultElement, LinkElement, CodeElement } from './Editor/EditorElements';
import { getStory } from '../api/graphql';
import Loading from './Loading';
import {
  useQuery,
} from "@apollo/client";


const DefaultData = {
  title: '',
  content: '[{"text":""}]',
}

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  margin-top: 100px;
  justify-content: center;
`;

const serialize = node => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    return (
      <Leaf
        leaf={node}
      >
        {string}
      </Leaf>
    )
  }

  const children = node.children.map(n => serialize(n))

  switch (node.type) {
    case 'code':
      return (
        <CodeElement>
          {children}
        </CodeElement>
      )
    case 'link':
      return (
        <LinkElement
          element={node}
        >
          {children}
        </LinkElement>
      )
    default:
      return <DefaultElement>{children}</DefaultElement>
  }
}


function Story({
  csrfToken
}) {
  const location = useLocation();
  const storyId = storyTool.getStoryIdFromPath({ path: location.pathname });
  const { loading, error, data } = useQuery(getStory({ storyId }));

  const { content, title } = data?.getStory || DefaultData;
  const Content = JSON.parse(content)?.map(serialize);
  return (
    <Container>
      <h1>{title}</h1>
      {loading ? <LoadingContainer><Loading /></LoadingContainer> : Content}
    </Container>
  )
};

export default Story;
