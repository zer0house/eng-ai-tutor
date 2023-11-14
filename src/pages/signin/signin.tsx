// src\pages\signin\signin.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { SignInContainer, Image, SignInText, } from "@/styles/signin/signin.styled";
import ChatZHT from '@/styles/ChatZHT-0.6.png';
import NextImage from 'next/image';

function Signin() {
  const router = useRouter();
  const { data } = useSession();
  const [userClass, setUserClass] = useState('');
  const [userTeam, setUserTeam] = useState('');

  useEffect(() => {
    if (data?.user) {
      router.replace("/");
      return;
    }
  }, [data, router]);

  const handleLogin = async () => {
    // 로컬 스토리지에 반과 모둠 정보를 저장
    localStorage.setItem('userClass', userClass);
    localStorage.setItem('userTeam', userTeam);
  
    // 사용자를 홈 페이지로 리디렉션
    router.replace('/');
  };

  return (
    <SignInContainer>
      <Image>
        <NextImage
          src={ChatZHT}
          alt="profile"
          width={150}
          height={150}
        />
      </Image>
      <h1>라잇미 (Write-Me)</h1>
      <SignInText>
        로그인을 위해 반과 모둠을 선택해주세요.
      </SignInText>
      <select value={userClass} onChange={(e) => setUserClass(e.target.value)}>
        <option value="">반 선택</option>
        <option value="1">1반</option>
        <option value="7">7반</option>
      </select>
      <select value={userTeam} onChange={(e) => setUserTeam(e.target.value)}>
        <option value="">모둠 선택</option>
        {[1, 2, 3, 4, 5].map(number => <option value={number} key={number}>{number}모둠</option>)}
      </select>
      <button onClick={handleLogin}>로그인</button>
    </SignInContainer>
  );
}

export default Signin;
