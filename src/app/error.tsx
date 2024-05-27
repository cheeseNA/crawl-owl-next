"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center">
      <p>Something went wrong!</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
