import { useState, useEffect } from 'react';
import { SigninWrapper, LoginButton, LogoutButton, } from './SigninButton.styled';
import { useRouter } from 'next/router';

const SigninButton = () => {
  const router = useRouter();
  // 로그인 상태를 로컬 스토리지의 정보를 기반으로 설정합니다.
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userClass = localStorage.getItem('userClass');
    const userTeam = localStorage.getItem('userTeam');

    if (userClass && userTeam) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    // 로그인 버튼 클릭 시 로그인 페이지로 리디렉션
    router.push('/signin');
  };

  const handleLogout = () => {
    // 로그아웃 로직
    localStorage.removeItem('userClass');
    localStorage.removeItem('userTeam');
    setLoggedIn(false);
    router.replace('/');
  };

  return (
    <SigninWrapper>
      {!loggedIn ? (
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      ) : (
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      )}
    </SigninWrapper>
  );
}

export default SigninButton;
