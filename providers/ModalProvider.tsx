"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";

const ModalProvider = ()  => {

  const [isMounted, setIsMounted] = useState(false);

  //If it true that already in client side
  useEffect(() =>{
    setIsMounted(true);
  }, []);

  //If in server side return null
  if(!isMounted){
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  )
}

export default ModalProvider
