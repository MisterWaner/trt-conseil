import { signIn } from "next-auth/react";

export default function signInAndRedirect(roleId: number) {

    if (roleId === 1) {
        return signIn('credentials', { callbackUrl: '/admin' })
    } else if (roleId === 2) {
        return signIn('credentials', { callbackUrl: '/consultant' })
    } else if (roleId === 3) {
        return signIn('credentials', { callbackUrl: '/recruiter' })
    } else if (roleId === 4) {
        return signIn('credentials', { callbackUrl: '/candidat' })
    } else {
        return signIn('credentials', { callbackUrl: '/login' })
    }
}

