
// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
 
// import GoogleProvider from "next-auth/providers/google";
// // import type { NextAuthOptions } from "next-auth";

// export const authOptions = {
//   secret:process.env.AUTH_SECRET,
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID! ,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET! ,
//     }),
//   ], 
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";
  
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

 