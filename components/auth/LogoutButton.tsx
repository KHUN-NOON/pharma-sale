'use client';

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const LogoutButton = () => {
    const router = useRouter();

    const [ isLoading, setIsLoading ] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        await signOut();
        router.replace('/login');
        setIsLoading(false);
    };

    return (
        <Button className="w-[80%]" onClick={handleLogin} disabled={isLoading}>
            Logout
        </Button>
    );
}

export default LogoutButton;