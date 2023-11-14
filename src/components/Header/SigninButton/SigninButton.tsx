import { useState, useEffect } from 'react';
import { SigninWrapper, LoginButton, LogoutButton, } from './SigninButton.styled';
import { useSession, signIn, signOut } from 'next-auth/react';

interface CustomSession {
  user: {
    name: string;
    id: string;
  }
}

const SigninButton = () => {
  // 로그인 세팅
  const [loggedIn, setLoggedIn] = useState(false);
    const { data: session } = useSession({
      required: false
    }) as { data: CustomSession | null };

    const handleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error('Error during sign in: ', error);
      alert("로그인 에러. 페이지에 다시 접속해주세요😥 \n오류가 지속되면 관리자에게 말해주세요🤔");
    }
    };

  useEffect(() => {
    if (session && !loggedIn) {
      setLoggedIn(true);
    } else if (!session) {
      setLoggedIn(false);
    }
    // Update the 'userName' and 'userId' states if the session user information changes
    // if (session && session.user) {
    //   setUserName(session.user?.name);
    //   setUserId(session.user?.id);
    //   console.log('session :', session);
    //   console.log('session.user :', session.user);
    //   console.log('session.user.name :', session.user.name);
    //   console.log('session.user.id :', session.user.id);
    // }
  }, [session, loggedIn]);

  
  return (
    <SigninWrapper>
        {!session ? (
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
        ) : (
            <>
                <LogoutButton onClick={() => signOut()}>로그아웃</LogoutButton>
            </>
        )}
    </SigninWrapper>
);
}

export default SigninButton;