import { PrismaClient, User } from "@/generated/prisma";
import { ActionResponseType } from "@/types/action.type";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const login = async (payload: { email: string, password: string }): Promise<ActionResponseType<User>> => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: payload.email }
        });
    
        if ( !user ) {
            throw new Error(`User with email: ${payload.email} not found!`);
        }
    
        const isMatch = await bcrypt.compare(payload.password, user.password);
    
        if ( !isMatch ) {
            throw new Error("The provided password is invalid!");
        }
    
        return {
            message: "Login successful!",
            data: user,
            success: true
        }
    } catch (error) {       
        return {
            success: false,
            message: (error as Error).message,
            data: null
        }
    }
}