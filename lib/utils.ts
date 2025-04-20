import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const devLogger = {
  log: (...args: any[]) => {
      if (process.env.NODE_ENV === 'development') {
          console.log(...args);
      }
  },
  error: (...args: any[]) => {
      if (process.env.NODE_ENV === 'development') {
          console.error(...args);
      }
  },
};
