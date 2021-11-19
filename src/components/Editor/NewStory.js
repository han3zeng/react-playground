import React, { useState, useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { createEditor, Transforms, Element } from "slate";
import {Slate, Editable, withReact} from "slate-react";
import styled from "styled-components";
import {CodeElement, DefaultElement, Leaf, LinkElement} from "./EditorElements";
import CustomEditor from './CustomEditor';
import ButtonGroup from './ButtonGroup';
import { CREATE_STORY, getStories } from '../../api/graphql';
import { useMutation } from "@apollo/client";

const Container = styled.div`
  position: relative;
  padding-top: 40px;
  overflow: hidden;
`;

const Tag = styled.div`
  padding: 3px 6px 4px 6px;
  position: absolute;
  left: 50%;
  top: 0px;
  transform: ${props => props.isPublishing ? 'translate(-50%, 0)' : 'translate(-50%, -110%)'};
  font-size: 20px;
  color: ${props => props.theme.captionColor};
  transition: transform 0.3s ease-in-out;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 1px 1px 3px ${props => props.theme.inputBorderColor};
`

const EditorContainer = styled.div `
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto 0 auto;
  label {
    font-size: 24px;
  }
  p {
    margin: 29px 0 0 0;
  }
  p:first-child {
    margin: 0 0;
  }
`;

const Title = styled.input`
    width: 100%;
    height: 34px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid ${props => props.error ? 'red' : props.theme?.inputBorderColor};
    outline: none;
    padding: 3px 6px;
    box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Save = styled.button`
  height: 35px;
  font-weight: 500;
  font-size: 18px;
  width: 100px;
  border-radius: 3px;
  margin-top: 10px;
`;


const EditableContainer = styled.div `
  border: 1px solid ${props => props
  ?.theme.inputBorderColor};
`;

const Error = styled.div`
  font-size: 12px;
  color: red;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

function NewStory() {
  // const editor = useMemo(() => withReact(createEditor()), []);
  // const initialValue = JSON.parse(localStorage.getItem('content')) || []
  const initialValue = [{
    type: 'paragraph',
    children: [{ text: '' }],
  }];
  const [ editor ] = useState(() => withReact(createEditor()))
  const { isInline, normalizeNode } = editor;
  const [ value, setValue ] = useState(initialValue);
  const [ title, setTitle ] = useState('')
  const [error, setError] = useState(false);
  const history = useHistory();

  const [createStory, { data, loading, error: publishError }] = useMutation(CREATE_STORY, {
    onCompleted: () => {
      history.push("/stories");
    },
    awaitRefetchQueries: true,
    refetchQueries: [{ query: getStories }]
  });


  editor.isInline = element => {
    return element.type === 'link'
      ? true
      : isInline(element)
  }

  editor.normalizeNode = entry => {
    const [node, path] = entry
    if (Element.isElement(node) && node.type === 'link') {
      if (node?.children[0]?.text === '') {
        Transforms.unwrapNodes(editor, { at: path })
      }
    }
    normalizeNode(entry);
  }

  const onKeyDownHandler = event => {
    if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) {
      // event.preventDefault();
      // CustomEditor.insertDefaultNode(editor);
    } else if (!event.ctrlKey && !event.shiftKey) {
      return;
    } else {
      if (event.ctrlKey) {
        switch (event.key) {
          case "`":
            {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break
            }
          case "b":
            {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break
            }
          case "i":
            {
              event.preventDefault();
              CustomEditor.toggleItalicMark(editor);
              break
            }
          default:
            console.log('ctrl: exception')
        }
      } else if (event.shiftKey) {
        switch (event.key) {
          case "Enter":
            {
              event.preventDefault();
              CustomEditor.insertLineBreak(editor);
              break
            }

          default:
            console.log('shift: exception')
        }
      }
    }
  };

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props}/>;
      case 'link':
        return <LinkElement {...props}/>
      default:
        return <DefaultElement {...props}/>;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props}/>
  }, [])

  if (publishError) {
    return <div>error!!</div>
  }

  return (
    <Container>
      <Tag
        isPublishing={loading}
      >
        Publishing...
      </Tag>
      <EditorContainer>
      <div>
        <Row>
          <label>Title</label>
          {error && <Error>Title can not be empty</Error>}
        </Row>
        <Title
          error={error}
          type="text"
          value={title}
          onChange={(e) => {
            if (error && e.target.value) {
              setError(false);
            }
            setTitle(e.target.value);
          }}
        />
      </div>
      <Slate editor={editor} value={value} onChange={value => {
          setValue(value)
          const isAstChange = editor.operations.some(op => 'set_selection' !== op.type)
          if (isAstChange) {
            // Save the value to Local Storage. (you should save it to the database)
            // const content = JSON.stringify(value)
            // localStorage.setItem('content', content)
          }
        }}>
        <ButtonGroup
          editor={editor}
          CustomEditor={CustomEditor}
        />
        <EditableContainer>
          <Editable
            style={{
              padding: '6px',
              height: '400px',
              overflowY: 'scroll'
            }}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onKeyDown={onKeyDownHandler}
          />
        </EditableContainer>
      </Slate>
      <ButtonWrapper>
        <Save onClick={() => {
          createStory({
            variables: {
              content: JSON.stringify(value),
              title,
            }
          });
        }}>Publish</Save>
      </ButtonWrapper>
      </EditorContainer>
    </Container>
  );
}

export default NewStory;
