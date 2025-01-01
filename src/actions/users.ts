"use server";
import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { loginSchema, registerSchema } from "@/schemas";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export const getUserById = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedSchema = registerSchema.safeParse(values);
  if (!validatedSchema.success) {
    return { error: "Invalid fields" };
  }

  try {
    const { email, password } = values;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      return { error: "User already exists" };
    }

    await db.user.create({
      data: {
        name: "",
        email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Register Successful" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedSchema = loginSchema.safeParse(values);
  if (!validatedSchema.success) {
    return { error: "Invalid fields" };
  }

  try {
    const { email, password } = values;

    const userExist = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExist) {
      return { error: "User does not exist" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Register Successful" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Please Confirm Your Email Address" };
      }
    }
    return { error: "Something went wrong" };
  }
};

export const googleLogin = async () => {
  await signIn("google");
};

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};

export const changeRole = async ({id, role} : {id: string, role: Role}) => {
  const currentUser = await getCurrentUser();
  try {
    if(currentUser?.role !== "ADMIN") {
      return {error: "You are not authorized to perform this action"}
    }

    await db.user.update({
      where: {
        id
      },
      data: {
        role
      }
    })
    
    return {success: "Role updated successfully"}
  } catch (error) {
    console.log(error);
    return {error: "Something went wrong"}
  }
}