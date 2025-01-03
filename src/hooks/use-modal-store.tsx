import { create } from "zustand";

export type ModalType =
  | "deleteMemberModal"
  | "renewMemberModal"
  | "deleteMembershipPlanModal"
  | "deleteLockerModal"
  | "deleteExpenseModal"
  | "unassignLockerModal"
interface ModalData {
  id?: string;
  ids?: string[];
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
