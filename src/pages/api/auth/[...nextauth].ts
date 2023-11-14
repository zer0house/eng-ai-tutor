import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// User 인터페이스 확장
interface ExtendedUser extends User {
  userClass?: string;
  userTeam?: string;
}

// JWT 인터페이스 확장
interface ExtendedJWT extends JWT {
  userClass?: string;
  userTeam?: string;
}

// Session 인터페이스 확장
interface ExtendedSession extends Session {
  userClass?: string;
  userTeam?: string;
}

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (value == null) {  // Checks both null and undefined
    console.log(`Environment variable ${key} is not set`);
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

const handler = NextAuth({
  providers: [
  ],
  callbacks: {
    async jwt({ token, user }: { token: ExtendedJWT, user?: ExtendedUser }) {
      if (user) {
        token.userClass = user.userClass;
        token.userTeam = user.userTeam;
      }
      return token;
    },
    async session({ session, token }: { session: ExtendedSession, token: ExtendedJWT }) {
      session.userClass = token.userClass;
      session.userTeam = token.userTeam;
      return session;
    },
  },
});

export default handler;
