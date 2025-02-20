import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export const useCost = () => {
  const [cost, setCost] = useState(0);
  const [open, setOpen] = useState(false);

  const CostModifier = () => {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="font-medium ml-auto">
          Paying Amount:{" "}
          <span style={{ color: "#3b82f6" }}>{formatPrice(cost)}</span>
        </PopoverTrigger>
        <PopoverContent>
          <form>
            <Input
              value={cost}
              onChange={(e) => setCost(parseInt(e.target.value))}
              placeholder="Enter modified amount"
            />
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    );
  }

  return { cost, setCost, CostModifier };
};
