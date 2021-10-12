import React, {useMemo, useState, useCallback} from "react";
import { createEditor, Transforms, Element } from "slate";
import {Slate, Editable, withReact} from "slate-react";
import styled from "styled-components";
import {CodeElement, DefaultElement, Leaf, LinkElement} from "./EditorElements";
import CustomEditor from './CustomEditor';
import ButtonGroup from './ButtonGroup';

const Container = styled.div `
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  label {
    font-size: 24px;
  }
  input {
    width: 100%;
    height: 28px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid ${props => props.theme
  ?.captionColor};
    outline: none;
    padding: 3px 6px;
    box-sizing: border-box;
  }
  p {
    margin: 29px 0 0 0;
  }
  p:first-child {
    margin: 0 0;
  }
`;

const Division = styled.div `
  margin-top: 50px;
`;

const EditableContainer = styled.div `
  border: 1px solid ${props => props
  ?.theme.inputBorderColor};
`;

function NewStory() {
  // const editor = useMemo(() => withReact(createEditor()), []);
  const initialValue = JSON.parse(localStorage.getItem('content')) || [
    {
      type: 'paragraph',
      children: [
        {
          text: 'A line of text in a paragraph.'
        }
      ]
    }
  ]
  const [editor] = useState(() => withReact(createEditor()))
  const { isInline, normalizeNode } = editor;

  editor.isInline = element => {
    return element.type === 'link'
      ? true
      : isInline(element)
  }

  const [value, setValue] = useState(initialValue);

  editor.normalizeNode = entry => {
    const [node, path] = entry
    if (Element.isElement(node) && node.type === 'link') {
      // for (const [ child, childPath ] of Node.children(editor, path)) {
      if (node?.children[0]?.text === '') {
        Transforms.unwrapNodes(editor, { at: path })
      }
    }
    normalizeNode(entry);
  }


  const onKeyDownHandler = event => {
    if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault();
      CustomEditor.insertDefaultNode(editor);
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

  return (<Container>
    <Division>
      <label>Title</label>
      <br/>
      <input type="text"/>
    </Division>
    <Slate editor={editor} value={value} onChange={value => {
        setValue(value)
        console.log(value)
        const isAstChange = editor.operations.some(op => 'set_selection' !== op.type)
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value)
          localStorage.setItem('content', content)
        }
      }}>
      <ButtonGroup editor={editor} CustomEditor={CustomEditor}/>
      <EditableContainer>
        <Editable style={{
            padding: '6px',
            height: '400px',
            overflowY: 'scroll'
          }} renderLeaf={renderLeaf} renderElement={renderElement} onKeyDown={onKeyDownHandler}/>
      </EditableContainer>
    </Slate>
  </Container>);
}

export default NewStory;
