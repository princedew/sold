import { prisma } from "../lib/prisma"

export const deleteAuctionRecord = async (auctionId:number) => { 
    return await prisma.auction.delete({
        where:{
            id:auctionId
        }
    })
 }