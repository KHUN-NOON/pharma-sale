import { clsx, type ClassValue } from "clsx"
import { format, isValid, parseISO } from "date-fns";
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

export const formatDateSafe = (date: Date | string | null | undefined): string => {
  if (!date) return "";
  
  let dateObj: Date;
  
  if (date instanceof Date) {
    dateObj = date;
  } else {
    try {
      dateObj = parseISO(date);
    } catch {
      return "";
    }
  }
  
  return isValid(dateObj) ? format(dateObj, 'yyyy-MM-dd') : "";
};

