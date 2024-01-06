import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {hash} from "bcrypt";
import * as z from 'zod';
// Define a schema for input validation
const userSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Paswword is required")
      .min(8, "Password must have 8 characters minimum"),
  })

export async function POST(req: Request){
  try{
    const body = await req.json();
    const {email, username, password} = userSchema.parse(body) ;

    // checking if email already exist
    const existingUserByEmail = await db.user.findUnique({
      where: {email: email}
    })
    if(existingUserByEmail){
      return NextResponse.json({user: null, message: "User with this email already exists"}, {status: 409})
    }
    // checking if username already exist
    const existingUserByUsername = await db.user.findUnique({
      where: {username: username}
    })
    if(existingUserByUsername){
      return NextResponse.json({user: null, message: "Username already exists"}, {status: 409})
    }
    const hashedPassword = await hash(password, 10);
    const newUser =await db.user.create({
      data:{
        username,
        email,
        password: hashedPassword
      }
    })
    const {password: newUserPassword , ...rest} = newUser;
    return NextResponse.json({user: rest, message: "User created successfully"}, {status: 201});
  }catch(error){
    return NextResponse.json({user: resizeTo, message: "Something went wrong !"}, {status: 500});
  }
}