import { authClient } from "@/lib/auth-client";

const criaUser = () => authClient.signUp.email({
    email: "a@a.com",
    password: '123456',
    name: 'Admin',
})

try {
    criaUser()
    console.log('criado');
} catch (error) {
    console.log(error);
}