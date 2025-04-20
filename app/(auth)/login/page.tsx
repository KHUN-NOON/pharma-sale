import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
    title: "Pharma-Sale | Login",
    description: "Login to your account",
};

export default async function LoginPage() {
    return (
        <LoginForm/>
    );
}