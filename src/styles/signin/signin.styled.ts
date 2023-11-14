// src\pages\signin\signin.styled.ts
import styled from '@emotion/styled';
import googleLogo from './google_login.png'; // 336px * 90px
import kakaoLogo from './kakao_login.png'; // 336px * 90px
import naverLogo from './naver_login.png'; // 750px * 200px



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

export const GoogleButton = styled(SignInButton)`
  background-color: #DB4437;
  background-image: url(${googleLogo.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 70px;  // 비율 유지 및 크기 조정
  &:hover, &:focus {
    background-color: #c63426;
  }
`;

export const KakaoButton = styled(SignInButton)`
  background-color: #FFEB00;
  background-image: url(${kakaoLogo.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 70px;  // 비율 유지 및 크기 조정
  &:hover, &:focus {
    background-color: #e5d700;
  }
`;

export const NaverButton = styled(SignInButton)`
  background-color: #03C75A;
  background-image: url(${naverLogo.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 80px;  // 비율 유지 및 크기 조정
  &:hover, &:focus {
    background-color: #029b4a;
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
