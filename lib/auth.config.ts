import type { AuthOptions, Awaitable, RequestInternal, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authConfig = {
    pages: {
        signIn: "auth/login"
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 10,
        updateAge: 60 * 9,
    },
    callbacks: {
        async signIn(params) {
            if (params.user) {
                return true;
            } else {
                return false;
            }
        },
        async session({ session, token}) {
            if ( token && session.user ) {
                session.user.email = token.email;
            }
            return session;
        },
        async jwt({token, user}) {
            if (token && user) {
                token.sub = user.id;
                token.email = user.email;
            }
            return token;
        },
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: function (credentials: Record<'email' | 'password', string> | undefined, req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>): Awaitable<User | null> {
                throw new Error('Function not implemented.');
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
} satisfies AuthOptions;

export default authConfig;