import { prisma } from "../lib/prisma"

export const getUser = async (email:string) => {
 return await prisma.user.findUnique({
    where:{
        email:email,
    }
 })   
}