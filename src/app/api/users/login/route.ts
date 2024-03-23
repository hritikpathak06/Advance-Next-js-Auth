import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDB } from "@/database/connection";


connectToDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User Doesn't Exists",
      });
    }

    const isMatchedPassword = await user.comparePassword(password);

    if (!isMatchedPassword) {
      return NextResponse.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "User Logged In Successfully",
        user,
      },
      { status: 200 }
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
