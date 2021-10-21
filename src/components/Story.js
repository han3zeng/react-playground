import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import escapeHtml from 'escape-html'
import { Text } from 'slate'
import styled from 'styled-components';
import { getStory } from '../api';
import { story as storyTool } from '../utils';
import { Leaf, DefaultElement, LinkElement, CodeElement } from './Editor/EditorElements';

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
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
  const [ story, setStory ] = useState({ content: [{text:''}] });
  useEffect(() => {
    const fetchData = async () => {
      const storyId = storyTool.getStoryIdFromPath({ path: location.pathname });
      const data = await getStory({
        csrfToken,
        storyId
      });
      if (data) {
        setStory(data);
      }
    }
    fetchData();
  }, [csrfToken, location])

  const { content, title } = story;
  const Content = content.map(serialize);
  return (
    <Container>
      <h1>{title}</h1>
      {Content}
    </Container>
  )
};

export default Story;
