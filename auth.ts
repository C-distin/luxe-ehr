import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { HashPassword } from "./utils/hashpassword"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {}
      },
      authorize: async (credentials) => {
         let user = null;

        const hashedPassword = HashPassword(credentials.password)

        user = await getUserFromDb(credentials.username, hashedPassword)
        
        if (!user) {
          throw new Error ("Invalid username or password")
        }
      }
    })
  ]
})
