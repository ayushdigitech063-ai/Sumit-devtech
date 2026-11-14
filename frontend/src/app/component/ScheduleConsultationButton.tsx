"use client";

import React from "react";
import Button from "@/app/ui/Button";

export default function ScheduleConsultationButton({
  cityName,
  className,
}: {
  cityName: string;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-quote-modal"));
    }
  };

  return (
    <Button
      href="#"
      onClick={handleClick}
      variant="primary"
      className={className || "w-full justify-center text-xs py-2.5 font-bold cursor-pointer"}
    >
      Schedule Free Consultation
    </Button>
  );
}
