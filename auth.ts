import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getUser } from './lib/data/user';
import { db } from './lib/db';
 


 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
   
            if (passwordsMatch) return user;
          }
   
          console.log('Invalid credentials');
          return null;
      },
    }),
  ],
  callbacks: {
    async session({token, session}){
      if(token){
        session.user!.id = token.id;
        session.user!.firstname = token.firstname;  // Champ ajouté
        session.user!.lastname = token.lastname;    // Champ ajouté
        session.user!.email = token.email;
        session.user!.role = token.role;
      }
      return session
    },
    async jwt({token, user}){
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })
      if(!dbUser){
        token.id = user!.id
        return token
      }
      return{
        id: dbUser?.id,
        firstname: dbUser?.firstname,  
        lastname: dbUser?.lastname,
        email: dbUser?.email,
        role:dbUser?.role
      }
    }
  }
});