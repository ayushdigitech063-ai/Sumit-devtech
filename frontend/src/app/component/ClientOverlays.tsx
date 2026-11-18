"use client";

import dynamic from "next/dynamic";

const ExitIntentModal = dynamic(() => import("../(site)/modal/page"), {
  ssr: false,
});
const Chatbot = dynamic(() => import("./Chatbot"), {
  ssr: false,
});

export default function ClientOverlays() {
  return (
    <>
      <ExitIntentModal />
      <Chatbot />
    </>
  );
}
