"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { saveUserToFirestore } from "@/lib/saveUserToFirestore";

export default function AuthHandler() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      saveUserToFirestore(user);
    }
  }, [isSignedIn, user]);

  return null; // Runs in the background
}
