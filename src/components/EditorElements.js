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
  white-space: normal;
`;

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <Code>{props.children}</Code>
    </pre>
  )
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = props => {
  if (props.leaf.code) {
    return (
      <Code
        {...props.attributes}
      >
        {props.children}
      </Code>
    )
  }

  return (
    <Span
      {...props.attributes}
      leaf={props.leaf}
    >
      {props.children}
    </Span>
  )
}

export {
  CodeElement,
  DefaultElement,
  Leaf
}
