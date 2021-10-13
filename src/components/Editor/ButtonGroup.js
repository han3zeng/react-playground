import React, { useState } from "react";
import styled from "styled-components";

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


const LinkModal = ({
  ifShowLinkModal,
  editor,
  insertLink,
  toggleLinkModal,
  linkSelection,
}) => {
  const [ url, setUrl ] = useState('https://');
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
              linkSelection,
            });
            toggleLinkModal();
            setUrl('https://');
          }}
        >
          Add Link
        </button>
        <button
          onClick={() => {
            toggleLinkModal();
            setUrl('https://')
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
}) => {
  const [ ifShowLinkModal, toggleLinkModal ] = useState(null);
  const [ linkSelection, setLinkSelection ] = useState(null);
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
                if (!ifShowLinkModal) {
                  setLinkSelection(editor?.selection)
                } else {
                  setLinkSelection(null);
                }
                return !ifShowLinkModal;
              });
            }}
          >
            Link
          </button>
          <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleItalicMark(editor)
          }}
          >
            Italic
          </button>
        </SubButton>
        <LinkModal
          ifShowLinkModal={ifShowLinkModal}
          editor={editor}
          insertLink={CustomEditor.insertLink}
          toggleLinkModal={toggleLinkModal}
          linkSelection={linkSelection}
        />
      </Buttons>
    </>
  )
});

export default ButtonGroup;
