import { Gender } from "@prisma/client";
import { z } from "zod";

export const MemberSchema = z.object({
  memberId: z.coerce.number().min(1),
  name: z.string().min(3),
  phone: z.string().optional(),
  age: z.coerce.number().optional(),
  image: z.string().optional(),
  address: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  membershipPlanId: z.string().min(1, "Membership Plan is required"),
  startDate: z.date(),
});

export type MemberValues = z.infer<typeof MemberSchema>;

export const MembershipPlanSchema = z.object({
  name: z.string().min(3, "Name is required"),
  durationInMonth: z.coerce.number().min(1).max(24),
  price: z.coerce.number().min(500).max(20000),
});

export type MembershipPlanValues = z.infer<typeof MembershipPlanSchema>;

export const RenewMemberSchema = z.object({
  startDate: z.date({ required_error: "Start Date is required" }),
  membershipPlanId: z.string({ required_error: "Membership Plan is required" }),
});

export type RenewMemberValues = z.infer<typeof RenewMemberSchema>;

export const ExpenseSchema = z.object({
  title: z.string().min(3),
  cost: z.coerce.number().min(1),
});

export type ExpenseValues = z.infer<typeof ExpenseSchema>;

// export const AssignLockerSchema = z.object({
//   lockerId: z.string({ required_error: "Locker Id. is required" }),
//   memberId: z.string({ required_error: "Member Id. is required" }),
//   startDate: z.date({ required_error: "Start Date is required" }),
// });
