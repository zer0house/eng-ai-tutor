// src\pages\signin\signin.styled.ts
import styled from '@emotion/styled';



export const SignInContainer = styled.main`
  overflow: auto;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 20px;
  background-color: var(--background-color-primary);
`;

export const SignInButton = styled.button`
  width: 300px;  // 버튼의 너비 설정
  height: 80px;  // 버튼의 높이 설정
  padding: 24px 24px;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.9;
  }
`;


export const Image = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 100%;
`;

export const SignInText = styled.p`
  text-align: center;
  font-size: 16px;
  color: var(--text-color-primary);
  color: var(--text-color);
  margin-bottom: 20px;
`;
