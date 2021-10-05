import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import styled from "styled-components";
import { _ } from "../utils";
import { CodeElement, DefaultElement, Leaf } from "./EditorElements";

const { debounce } = _;

const Container = styled.div`
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
    border: 1px solid ${props => props.theme?.captionColor};
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

const Division = styled.div`
  margin-top: 50px;
`;

const ContentEditable = styled.div`
  border: 1px solid ${props => props.theme?.captionColor};
  outline: none;
  padding: 3px 6px;
  font-size: 16px;
  border-radius: 3px;
  min-height: 300px;
`;

const Buttons = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
  > button {
    margin-right: 10px;
  }
`;



const CustomEditor = {
  isCodeTextActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.code === true,
      universal: true,
    })
    return !!match
  },

  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })
    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })
    return !!match
  },

  insertDefaultNode(editor) {
    Transforms.insertNodes(
      editor,
      {
        children: [{ text: '' }],
        type: 'paragraph',
      }
    )
  },

  insertLineBreak(editor) {
    editor.insertText('\n')
  },

  toggleCodeText(editor) {
    const isActive = this.isCodeTextActive(editor)
    Transforms.setNodes(
      editor,
      { code: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleBoldMark(editor) {
    const isActive = this.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = this.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }
}



function NewStory() {
  // const editor = useMemo(() => withReact(createEditor()), []);
  const initialValue = JSON.parse(localStorage.getItem('content')) || [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState(initialValue);

  const onKeyDownHandler = event => {
    if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault();
      CustomEditor.insertDefaultNode(editor);
    } else if (!event.ctrlKey && !event.shiftKey) {
      return;
    } else {
      if (event.ctrlKey) {
        switch (event.key) {
          // When "`" is pressed, keep our existing code block logic.
          case "`": {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
            break
          }

          // When "B" is pressed, bold the text in the selection.
          case "b": {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
            break
          }
          default:
            console.log('ctrl: exception')
        }
      } else if (event.shiftKey) {
        switch (event.key) {
          case "Enter": {
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
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <Container>
      <Division>
        <label>Title</label>
        <br />
        <input type="text" />
      </Division>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
          setValue(value)
          const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
          )
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value)
            localStorage.setItem('content', content)
          }
        }}
      >
        <Buttons>
          <button
            onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
            }}
          >
            Bold
          </button>
          <button
            onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleCodeText(editor)
            }}
          >
            Code
          </button>
          <button
            onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
          >
            Code Block
          </button>
        </Buttons>
        <Editable
          style={{
            border: '1px solid black',
            padding: '6px',
          }}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={onKeyDownHandler}
        />
      </Slate>
    </Container>
  );
}

export default NewStory;
