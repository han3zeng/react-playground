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

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;
  width: 100%;
`;

const SubButton= styled.div`
  position: relative;
  padding: 10px 0;
  z-index: 2;
  width: 100%;
  background-color: white;
  > button {
    margin-right: 10px;
    cursor: pointer;
  }
`

const LinkContainer = styled.div`
  position: absolute;
  background-color: white;
  top: 100%;
  z-index: 1;
  left: 0;
  box-sizing: border-box;
  padding: 12px 8px 18px 8px;
  width: 100%;
  border: 1px solid ${props => props?.theme.inputBorderColor};
  border-radius: 3px;
  height: 100px;
  box-shadow: 0px 1px 2px #B8B8B8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform-origin: top;
  transform:  ${props => props.ifShowLinkModal ? 'scaleY(1) translateY(0)' : 'scaleY(0)  translateY(-100%)'};
  opacity: ${props => props.ifShowLinkModal ? '100%' : '0%'};
  > div:last-child {
    height: 36px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    input {
      border: 1px solid ${props => props?.theme.inputBorderColor};
      height: 100%;
      box-sizing: border-box;
      flex: 0 2 50%;
      border-radius: 3px;
    }
    > button:nth-child(2) {
      flex: 0 1 20%;
      border-radius: 3px;
      background-color: white;
      border: 1px solid ${props => props.theme.buttonColor};
      color: ${props => props.theme.buttonColor};
    }
    > button:nth-child(3) {
      flex: 0 1 20%;
      border-radius: 3px;
      color: ${props => props.theme.buttonColor};
      background-color: white;
    }
  }
`;

const EditableContainer = styled.div`
  border: 1px solid ${props => props?.theme.inputBorderColor};
`;


const LinkModal = ({
  ifShowLinkModal,
  editor,
  insertLink,
  toggleLinkModal
}) => {
  const [ url, setUrl ] = useState('');
  return (
    <LinkContainer
      ifShowLinkModal={ifShowLinkModal}
    >
      <div>Insert Hyperlink</div>
      <div>
        <input
          value={url}
          onChange={(e) => {
            setUrl(e?.target?.value);
          }}
        />
        <button
          onClick={() => {
            insertLink({
              editor,
              url,
            })
          }}
        >
          Add Link
        </button>
        <button
          onClick={() => {
            toggleLinkModal();
          }}
        >
          Cancel
        </button>
      </div>
    </LinkContainer>
  );
};

const ButtonGroup = React.memo(({
  editor,
  CustomEditor,
  insertLink,
}) => {
  const [ ifShowLinkModal, toggleLinkModal ] = useState(null);
  return (
    <>
      <Buttons>
        <SubButton>
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
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              toggleLinkModal(ifShowLinkModal => {
                return !ifShowLinkModal;
              });
            }}
          >
            Link
          </button>
        </SubButton>
        <LinkModal
          ifShowLinkModal={ifShowLinkModal}
          editor={editor}
          insertLink={insertLink}
          toggleLinkModal={toggleLinkModal}
        />
      </Buttons>
    </>
  )
});


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

  insertLink({
    editor,
    url
  }) {
    console.log('url: ', url);
    console.log('editor: ', editor);
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
  const [ editor ] = useState(() => withReact(createEditor()))
  const [ value, setValue ] = useState(initialValue);

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
        <ButtonGroup
          insertLink={CustomEditor.insertLink}
          editor={editor}
        />
        <EditableContainer>
          <Editable
            style={{
              padding: '6px',
              height: '400px',
              overflowY: 'scroll',
            }}
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onKeyDown={onKeyDownHandler}
          />
        </EditableContainer>
      </Slate>
    </Container>
  );
}

export default NewStory;
