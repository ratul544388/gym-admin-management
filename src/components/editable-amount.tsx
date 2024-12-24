"use client";

import { ChangeEvent, useEffect, useRef } from "react";

interface EditableAmountProps {
  value: number;
  onChange: (value: number) => void;
}

export const EditableAmount = ({ value, onChange }: EditableAmountProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value || 1);
    onChange(value);
    setWidth();
  };

  const setWidth = () => {
    if (inputRef.current && spanRef.current) {
      const minWidth = 10;
      const offsetWidth = spanRef.current.offsetWidth + 10;
      inputRef.current.style.width = `${Math.max(offsetWidth, minWidth)}px`;
    }
  };

  useEffect(() => {
    setWidth();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="number"
        value={value}
        onChange={onValueChange}
        className="text-end font-semibold text-blue-500 outline-none"
      />
      <span ref={spanRef} className="invisible absolute font-semibold">
        {value}
      </span>
      <span className="font-semibold text-blue-500">/-</span>
    </div>
  );
};
