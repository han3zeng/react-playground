import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 50px;
`

function NewStory() {
  return (
    <Container>
      <div contentEditable="true">
        new story
      </div>
    </Container>
  )
}

export default NewStory;
