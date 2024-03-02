import * as argon2 from 'argon2';

export const hashPassword = async (password: string) => {
    // hash the password with argon2
    return await argon2.hash(password);
}

export const correctPassword = async(password: string, secretPassword: string) => 
{
    return await argon2.verify(secretPassword, password);
}