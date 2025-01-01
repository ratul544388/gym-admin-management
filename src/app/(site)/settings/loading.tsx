import { Loader } from "@/components/loader";
import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-offset-screen items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
