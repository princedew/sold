import { prisma } from "../lib/prisma"

export const userExist = async (email:string) => {
 const user = await prisma.user.findUnique({
    where:{
        email:email,
    }
 })   
 if (user) {
    return true;
 }
 return false;
}