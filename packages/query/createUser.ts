import { prisma } from "../lib/prisma";

export const createUser = async (email:string, name:string, hashedPassword:string) => { 
    return await prisma.user.create({
        data:{
            email:email,
            name: name,
            password: hashedPassword,
        }
    });
 }