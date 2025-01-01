import { Gender } from "@prisma/client";
import { z } from "zod";

export const createMemberSchema = z.object({
  memberId: z.string().min(1, "ID is required"),
  name: z.string().min(3, "Name is required"),
  phone: z.string().optional(),
  age: z.coerce.number().optional(),
  imageUrl: z.string().optional(),
  address: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  membershipPlanId: z.string().min(1, "Membership Plan is required"),
  membershipPlanStartDate: z.date(),
  lockerId: z.string().optional(),
  lockerStartDate: z.date().optional(),
});

export const membershipPlanSchema = z.object({
  name: z.string().min(3, "Name is required"),
  durationInMonth: z.coerce.number(),
  price: z.coerce.number(),
});

export const renewMemberSchema = z.object({
  startDate: z.date({ required_error: "Start Date is required" }),
  membershipPlanId: z.string({ required_error: "Membership Plan is required" }),
});

export const lockerSchema = z.object({
  lockerNo: z.coerce.number({ required_error: "Locker no. is required" }),
  price: z.coerce.number({ required_error: "Locker Price is required" }),
});

export const assignLockerSchema = z.object({
  lockerId: z.string({ required_error: "Locker Id. is required" }),
  memberId: z.string({ required_error: "Member Id. is required" }),
  startDate: z.date({ required_error: "Start Date is required" }),
});

export const expenseSchema = z.object({
  title: z.string({ required_error: "Locker Id. is required" }),
  cost: z.coerce.number({ required_error: "Member Id. is required" }),
});

export const loginSchema = z.object({
  email: z.string().min(3, "Email is required").email(),
  password: z.string().min(8, "Password is required"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.string().min(3, "Email is required").email(),
    password: z.string().min(8, "Password is required"),
    confirmPassword: z.string().min(8, "Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password and Confirm Password do not match",
  });

export const updateMemberSchema = z.object({
  memberId: z.string().min(1, "ID is required"),
  name: z.string().min(3, "Name is required"),
  phone: z.string().optional(),
  age: z.coerce.number().optional(),
  imageUrl: z.string().optional(),
  address: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
});
