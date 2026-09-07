import type { Request, Response } from "express";


export function signUp(req:Request, res:Response) {
    return res.send("sign up success")
}