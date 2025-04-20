import type { AuthOptions, Awaitable, RequestInternal, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from '@/services/auth.service';
import { loginSchema } from '@/zod/auth';

const authConfig = {
    pages: {
        signIn: "auth/login"
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24, // 1 day
        updateAge: 60 * 60 * 22, // 22 hours
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
            authorize: async function (credentials: Record<'email' | 'password', string> | undefined, req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>): Promise<User | null> {
                try {
                    const { email, password } = credentials || {};
                    
                    const validate = loginSchema.safeParse({
                        email,
                        password
                    });

                    if ( !validate.success ) {
                        return null;
                    }

                    const { data, success, message } = await login({ 
                        email: validate.data.email, 
                        password: validate.data.password 
                    });

                    if ( !success ) {
                        throw new Error(message ?? 'Login failed!');
                    }

                    return {
                        id: data?.id.toString(),
                        email: data?.email
                    } as User;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
} satisfies AuthOptions;

export default authConfig;