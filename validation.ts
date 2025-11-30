// Validation utilities for form inputs

export function validatePhone(phone: string): { valid: boolean; error?: string } {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's empty
  if (!cleaned) {
    return { valid: false, error: "Phone number is required" };
  }
  
  // Must be exactly 10 digits (India)
  if (cleaned.length !== 10) {
    return { valid: false, error: "Please enter a valid 10-digit phone number." };
  }
  
  // Check if it contains only digits
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, error: "Please enter a valid 10-digit phone number." };
  }
  
  return { valid: true };
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) {
    return { valid: false, error: "Email is required" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Email format appears incorrect." };
  }
  
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }
  
  if (name.trim().length < 3) {
    return { valid: false, error: "Please enter your name properly." };
  }
  
  return { valid: true };
}

export function validateQuantity(quantity: string | number): { valid: boolean; error?: string } {
  if (quantity === null || quantity === undefined || quantity === "") {
    return { valid: false, error: "Quantity is required" };
  }
  
  const num = typeof quantity === "string" ? parseFloat(quantity) : quantity;
  
  if (isNaN(num) || num <= 0) {
    return { valid: false, error: "Quantity must be at least 1." };
  }
  
  if (!Number.isInteger(num)) {
    return { valid: false, error: "Quantity must be a whole number." };
  }
  
  return { valid: true };
}

export function validateMessage(message: string): { valid: boolean; error?: string } {
  if (!message || message.trim().length === 0) {
    return { valid: false, error: "Message is required" };
  }
  
  if (message.trim().length < 5) {
    return { valid: false, error: "Message must be at least 5 characters" };
  }
  
  return { valid: true };
}

export function validateLocation(location: string): { valid: boolean; error?: string } {
  if (!location || location.trim().length === 0) {
    return { valid: false, error: "Location is required" };
  }
  
  return { valid: true };
}

export function formatPhoneInput(value: string): string {
  // Remove all non-digit characters and limit to 10 digits
  const cleaned = value.replace(/\D/g, '');
  return cleaned.slice(0, 10);
}

export function formatPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    // Format Indian phone number: +91 XXXXX XXXXX
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return cleaned;
}
