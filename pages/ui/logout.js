import {useEffect} from "react";
import {useRouter} from "next/router";
import {useAuth} from "../../src/contexts/auth.context";

export default function Logout() {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        logout();
        router.push('/ui/sign-in');
    }, [logout, router]);

    return null;
}