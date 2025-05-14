"use client";

import { CountUp } from "@/components/count-up";

// import { Button } from "@/components/ui/button";
// import { useTransition } from "react";
// import { updateAllMembers } from "./actions";


const Page = () => {
  // const [isPending, startTransition] = useTransition();
  // const handleClick = () => {
  //   startTransition(() => {
  //     updateAllMembers();
  //   });
  // };
  return (
    <div className="h-screen flex items-center justify-center">
      {/* <Button disabled={isPending} onClick={handleClick}>
        Click
      </Button> */}
      <CountUp value="5345.33"/>
    </div>
  );
};

export default Page;
