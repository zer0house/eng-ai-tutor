import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--background-color-primary);
`;

export const FormContainer = styled.form`
  width: 300px;
  padding: 20px;
  background-color: var(--background-color-secondary);
  box-shadow: 0 2px 10px var(--box-shadow-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--box-shadow-color);
  border-radius: 5px;
  color: var(--text-color);
  background-color: var(--background-color-secondary);
  transition: border 0.3s, background-color 0.3s;
  
  &:focus {
    border: 1px solid var(--point-color-0);
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: var(--point-color-0);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--point-color-1);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--box-shadow-color);
  border-radius: 4px;
  font-size: 16px;
  color: var(--text-color);
  background-color: var(--background-color-secondary);
  transition: border 0.3s, background-color 0.3s;

  &:focus {
    border: 1px solid var(--point-color-0);
    outline: none;
  }`;
