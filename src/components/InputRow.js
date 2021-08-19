import styled from 'styled-components';

const FormLabel = styled.label`
  display: block;
  font-size: 16px;
  color: #333;
`;

const FormInpupt = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 8px 5px;
  outline: none;
  border-radius: 3px;
  border: 1px solid #BEBEBE;
  &:focus {
    border-color: #333;
  }
`;

const Row = styled.div`
  margin-bottom: 10px;
`;

const SubRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Error = styled.div`
  font-size: 12px;
  color: red;
`;

const InputRow = ({
  labelName,
  name,
  type,
  error,
  onHandleInput,
}) => {
  const errorMessage = error[name];
  return (
    <Row>
      <SubRow>
        <FormLabel>{labelName}</FormLabel>
        {errorMessage && <Error>{errorMessage}</Error>}
      </SubRow>
      <FormInpupt
        name={name}
        type={type}
        onChange={onHandleInput}
      />
    </Row>
  );
}

export default InputRow;
