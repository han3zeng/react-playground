import React from 'react';
import { useRouter } from 'next/router';
import escapeHtml from 'escape-html';
import { Text } from 'slate';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { story as storyTool } from '../utils';
import {
  Leaf, DefaultElement, LinkElement, CodeElement,
} from './Editor/EditorElements';
import { getStory } from '../api/graphql';
import Loading from './Loading';
import Error from './Error';

const DefaultData = {
  title: '',
  content: '[{"text":""}]',
};

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  margin-top: 100px;
  justify-content: center;
`;

const serialize = (node) => {
  if (Text.isText(node)) {
    const string = escapeHtml(node.text);
    return <Leaf leaf={node}>{string}</Leaf>;
  }

  const children = node.children.map((n) => serialize(n));

  switch (node.type) {
    case 'code':
      return <CodeElement>{children}</CodeElement>;
    case 'link':
      return <LinkElement element={node}>{children}</LinkElement>;
    default:
      return <DefaultElement>{children}</DefaultElement>;
  }
};

function Story() {
  const router = useRouter();
  const { storyPath } = router.query
  const storyId = storyTool.getStoryIdFromPath({ path: storyPath });
  const { loading, error, data } = useQuery(getStory({ storyId }));

  const { content, title } = data?.getStory || DefaultData;
  const Content = JSON.parse(content)?.map(serialize);

  if (error) return <Error />;

  return (
    <Container>
      <h1>{title}</h1>
      {loading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        Content
      )}
    </Container>
  );
}

export default Story;
