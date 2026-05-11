"use client"

import { useEffect } from "react"
import Clarity from "@microsoft/clarity"

export default function ClarityProvider() {
  useEffect(() => {
    Clarity.init("wp25tm7zwa")
  }, [])

  return null
}