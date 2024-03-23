import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/database/connection";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connectToDB();


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please Fill Out All The Fields",
        },
        { status: 400 }
      );
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    // Send Verification Email
    await sendEmail({email,emailType:"VERIFY",userId:user._id})

    return NextResponse.json(
      {
        success: true,
        message: "User Registered Successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: true,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 400 }
    );
  }
}
