import styled from 'styled-components';

const Span = styled.span`
  font-weight: ${props => props.leaf.bold ? 'bold' : 'normal'};
  font-style: ${props => props.leaf.italic ? 'italic' : 'normal'};
`;

const Code = styled.code`
  border-radius: 3px;
  background-color: #ebeced;
  font-size: 85%;
  padding: 3px 6px;
  margin: 0 1px;
  white-space: pre-wrap;
`;

const CodeBlock = styled.code`
  margin: 0 1px;
  > div {
    border-radius: 3px;
    background-color: #ebeced;
    font-size: 85%;
    padding: 3px 6px;
    white-space: pre-wrap;
  }
`;

const A = styled.a`
  position: relative;
  &:after {
    transition: transform 0.3s ease-in-out;
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.buttonColor}
  }
  &:hover {
    &::after {
      transform: scaleY(2);
    }
  }
`;

const LinkElement = (props) => {
  const { element, attributes } = props;
  return (
    <A
      {...attributes}
      href={element.url}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </A>
  )
};


const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <CodeBlock>
        <div>{props.children}</div>
      </CodeBlock>
    </pre>
  )
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = props => {
  const Content = (() => {
    if (props.leaf.code) {
      return (
        <Code
          {...props.attributes}
        >
          {props.children}
        </Code>
      )
    } else if (props.leaf.link) {
      return (
        <A
          href={props.leaf.url}
          {...props.attributes}
          target="_blank"
          rel="noreferrer"
        >
          {props.children}
        </A>
      )
    } else {
      return (
        <>
          {props.children}
        </>
      )
    }
  })();

  return (
    <Span
      {...props.attributes}
      leaf={props.leaf}
    >
      {Content}
    </Span>
  )
}

export {
  CodeElement,
  DefaultElement,
  Leaf,
  LinkElement
}
