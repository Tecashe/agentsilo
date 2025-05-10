
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSiteUrl() {
  // In production, use the NEXT_PUBLIC_SITE_URL environment variable
  // This will be automatically set by Vercel
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  // In development, use localhost
  return "http://localhost:3000"
}
