import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const url = process.env.NEXT_PUBLIC_API_URL + "/api/auth/login";
        const formData = new URLSearchParams();
        formData.append("username", credentials.username);
        formData.append("password", credentials.password);

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
          });

          console.log("Response status:", res.status);
          const userData = await res.json();
          console.log("User data received:", userData);

          if (res.ok) {
            return {
              refresh_token: userData.refresh,
              access_token: userData.access,
            };
          }

          throw new Error(userData.detail || "Login failed");
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Authorization error: " + error.message);
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      if (session?.accessToken) {
        const url = process.env.NEXT_PUBLIC_API_URL + "/api/auth/me";
        const userRes = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });

        if (userRes.ok) {
          const userDetails = await userRes.json();
          session.user.username = userDetails.username;
          session.user.role = userDetails.role;
        }
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.refreshToken = user.refresh_token;
        token.accessToken = user.access_token;
      }

      return token;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
