'use server';
import { ActionResponseType } from "@/types/action.type";
import { getServerSession } from "next-auth";
import authConfig from "./auth.config";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { auth } from "./auth";

type WithAuthArgsType<T> = {
    action: (...args: any[]) => Promise<ActionResponseType<T>>,
    requireAuth?: boolean
}

export async function withAuth<T>({ action, requireAuth = true }: WithAuthArgsType<T>): Promise<ActionResponseType<T>> {
    try {
        const cookieHeader = cookies().toString();

        const token = await getToken({
            req: {
                headers: {
                    cookie: cookieHeader,
                },
            } as any,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (requireAuth) {
            if (!token?.user) {
                return {
                    success: false,
                    message: "Unauthorized",
                    data: null
                }
            }
        }

        return await action(token);
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown Error!",
            data: null
        }
    }
}