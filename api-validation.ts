// Server-side validation utilities for API routes

export function validateName(name: any): { valid: boolean; error?: string } {
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }
  
  if (name.trim().length < 3) {
    return { valid: false, error: "Please enter your name properly." };
  }
  
  return { valid: true };
}

export function validateEmail(email: any): { valid: boolean; error?: string } {
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return { valid: false, error: "Email is required" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: "Email format appears incorrect." };
  }
  
  return { valid: true };
}

export function validatePhone(phone: any): { valid: boolean; error?: string } {
  if (!phone || typeof phone !== "string") {
    return { valid: false, error: "Phone number is required" };
  }
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length !== 10) {
    return { valid: false, error: "Please enter a valid 10-digit phone number." };
  }
  
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, error: "Please enter a valid 10-digit phone number." };
  }
  
  return { valid: true };
}

export function validateQuantity(quantity: any): { valid: boolean; error?: string } {
  if (quantity === null || quantity === undefined || quantity === "") {
    return { valid: false, error: "Quantity is required" };
  }
  
  const num = typeof quantity === "string" ? parseFloat(quantity) : Number(quantity);
  
  if (isNaN(num) || num <= 0) {
    return { valid: false, error: "Quantity must be at least 1." };
  }
  
  if (!Number.isInteger(num)) {
    return { valid: false, error: "Quantity must be a whole number." };
  }
  
  return { valid: true };
}

export function validateMessage(message: any): { valid: boolean; error?: string } {
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return { valid: false, error: "Message is required" };
  }
  
  if (message.trim().length < 5) {
    return { valid: false, error: "Message must be at least 5 characters" };
  }
  
  return { valid: true };
}

export function validateLocation(location: any): { valid: boolean; error?: string } {
  if (!location || typeof location !== "string" || location.trim().length === 0) {
    return { valid: false, error: "Location is required" };
  }
  
  return { valid: true };
}

