"use server";

import { db } from "@/lib/db";

export const setDefaultAdmissionFee = async (admissionFee: number) => {
  try {
    if (typeof admissionFee !== "number") {
      return { error: "Invalid value" };
    }

    const currentModel = await db.default.findFirst();

    if (currentModel) {
      await db.default.update({
        where: { id: currentModel.id },
        data: { admissionFee },
      });
    } else {
      await db.default.create({ data: { admissionFee } });
    }

    return { success: "Addmission Fee Saved" };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};
