"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const Icon = isCopied ? Check : Copy;

  const handleClick = () => {
    toast.success(`${text} copied`);
    console.log("clicked")
    setIsCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <Icon className="size-4" />
    </Button>
  );
};
