import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      role,
      email,
      password,
      aadhaar,
      state,
      city,
      zipcode,
      address,
      mobile,
      emailVerified = false, // default false if not passed
      imageFile, // string (URL or filename)
    } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in DB
    const user = await prisma.user.create({
      data: {
        role,
        email,
        password: hashedPassword,
        aadhaar,
        state,
        city,
        zipcode,
        address,
        mobile,
        emailVerified,
        imageFile,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register user" },
      { status: 500 }
    );
  }
}
