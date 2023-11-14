// src\pages\signin\signin.tsx
import React, { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SignInContainer, KakaoButton, GoogleButton, NaverButton, Image, SignInText } from "@/styles/signin/signin.styled";
import ChatZHT from '@/styles/ChatZHT-0.6.png';
import NextImage from 'next/image';
import { Providers } from '@/core/types';

function Signin() {
  const [providers, setProviders] = useState<Providers | null>(null);
  const router = useRouter();
  const { data } = useSession(); // 세션 상태를 체크하기 위해 useSession 훅 추가

  useEffect(() => {
    if (data?.user) { // 이미 로그인 되어있는 경우
      router.replace("/"); // 메인 페이지로 리다이렉트
      return;
    }

    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, [data, router]);

  if (!providers) return null;

  return (
    <SignInContainer>
      <Image>
        <NextImage
          src= {ChatZHT}
          alt="profile"
          width={150}
          height={150}
        />
      </Image>
      {/* Text 적용 */}
      <h1>과학봇 (Sci-Ai-Tutor)</h1>
      <SignInText>
        과학과 교육용 챗봇은 개별화 교육 지원을 위해서 사용자 확인이 필요합니다. <br />
        간편 로그인을 위해 소셜 로그인에 최적화 되어있으며 현재 접속 기기에서 로그인이 편한 계정을 이용하면 됩니다.
      </SignInText>
      {providers.kakao && (
        <KakaoButton onClick={() => signIn("kakao", { redirect: true, callbackUrl: "/" })} />
      )}
      {providers.google && (
        <GoogleButton onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })} />
      )}
      {providers.naver && (
        <NaverButton onClick={() => signIn("naver", { redirect: true, callbackUrl: "/" })} />
      )}
    </SignInContainer>
  );
}

export default Signin;
