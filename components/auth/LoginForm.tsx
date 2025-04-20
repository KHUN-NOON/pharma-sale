'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginSchema } from "@/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { dismissableToaster } from "@/lib/toaster";

const LoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: zodResolver(loginSchema)
    });
    
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (data: { email: string, password: string }) => {
        setIsLoading(true);
        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        });

        if (res?.error) {
            dismissableToaster({
                title: "Login Information!",
                description: "Invalid email or password!",
            });
        } else {
            dismissableToaster({
                title: "Login Information!",
                description: "Login Successful!",
            });

            router.push('/');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Card className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[40%] lg:max-w-[30%] shadow-background"> 
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome Back!
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to login
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 bg-white dark:bg-gray-950">
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...register('email')}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                className="border-2 focus-visible:ring-2 focus-visible:ring-primary"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                {...register('password')}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                className="border-2 focus-visible:ring-2 focus-visible:ring-primary"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <div className="mt-6 flex">
                            <Button type="submit" className="flex-1" aria-disabled={isLoading} disabled={isLoading}>
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div> 
    );
}

export default LoginForm;