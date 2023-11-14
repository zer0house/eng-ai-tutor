import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (value == null) {  // Checks both null and undefined
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: getEnvVar('KAKAO_CLIENT_ID'),
      clientSecret: getEnvVar('KAKAO_CLIENT_SECRET'),
    }),
    GoogleProvider({
      clientId: getEnvVar('GOOGLE_CLIENT_ID'),
      clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET'),
    }),
    NaverProvider({
      clientId: getEnvVar('NAVER_CLIENT_ID'),
      clientSecret: getEnvVar('NAVER_CLIENT_SECRET'),
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});

export default handler;
