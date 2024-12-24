import { Gender } from "@prisma/client";
import { z } from "zod";

export const memberSchema = z.object({
  memberId: z.string().min(1, "ID is required"),
  name: z.string().min(3, "Name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  membershipPlanId: z.string().min(1, "Membership Plan is required"),
  startDate: z.date(),
  gender: z.nativeEnum(Gender).optional(),
  // image: z.custom<File>(
  //   (value) => {
  //     if (!(value instanceof File)) {
  //       return false;
  //     }
  //     return value.type.startsWith("image/");
  //   },
  //   { message: "Image must be a valid image file" },
  // ).optional(),
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

export const asignLockerToMemberSchema = z.object({
  lockerId: z.string({ required_error: "Locker Id. is required" }),
  startDate: z.date({ required_error: "Start Date is required" }),
});
