import nodemailer from "nodemailer";

// Email configuration
export const EMAIL_CONFIG = {
  ADMIN: "ecobrickster@gmail.com",
  FROM: "ecobrickster@gmail.com",
  APP_PASSWORD: "cbhdgjmkqsebuvpk",
} as const;

// Create reusable transporter
function createTransporter() {
  const adminEmail = EMAIL_CONFIG.FROM;
  const appPassword = EMAIL_CONFIG.APP_PASSWORD;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: adminEmail,
        pass: appPassword.trim(),
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    return transporter;
  } catch (error) {
    console.error("Failed to create email transporter:", error);
    return null;
  }
}

// Send email function
export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  fromName?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, error: "Email service not configured" };
    }

    const fromName = options.fromName || "Website";
    const mailOptions = {
      from: `"${fromName}" <${EMAIL_CONFIG.FROM}>`,
      to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ""),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Helper function to create admin notification email template
function createAdminNotificationEmail(formType: string, data: Record<string, any>): string {
  // Extract all fields from data
  const name = data.name || data.fullName || "";
  const email = data.email || "";
  const phone = data.phone || "";
  const productName = data.product || data.productName || "";
  const quantity = data.quantity || "";
  const message = data.message || data.why || "";

  // Build product/quantity section if applicable
  let productSection = "";
  if (productName || quantity) {
    const productDisplay = productName ? `${productName}${quantity ? " – Qty: " + quantity : ""}` : (quantity ? `Qty: ${quantity}` : "");
    productSection = `
      <tr>
        <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; width: 35%;"><strong>Product / Quantity (if applicable):</strong></td>
        <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb;">${productDisplay}</td>
      </tr>`;
  }

  // Build message/details section
  let messageSection = "";
  if (message) {
    messageSection = `
      <tr>
        <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; width: 35%;"><strong>Message / Details:</strong></td>
        <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; white-space: pre-wrap;">${String(message).replace(/\n/g, "<br>")}</td>
      </tr>`;
  }

  // Get all other fields
  const otherFields: Array<{ key: string; value: any }> = [];
  const excludedKeys = ["name", "email", "phone", "product", "productName", "quantity", "message", "why", "fullName", "location", "locality", "village"];
  
  Object.keys(data).forEach(key => {
    if (!excludedKeys.includes(key.toLowerCase()) && data[key] !== null && data[key] !== undefined && data[key] !== "") {
      const value = data[key];
      let displayValue = "";
      if (Array.isArray(value)) {
        displayValue = value.filter(Boolean).join(", ");
      } else if (typeof value === "boolean") {
        displayValue = value ? "Yes" : "No";
      } else {
        displayValue = String(value);
      }
      if (displayValue) {
        otherFields.push({ key, value: displayValue });
      }
    }
  });

  const otherFieldsHtml = otherFields.map(field => {
    const label = field.key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
    return `
      <tr>
        <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; width: 35%;"><strong>${label}:</strong></td>
        <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb;">${String(field.value).replace(/\n/g, "<br>")}</td>
      </tr>`;
  }).join("");

  // Build location section if applicable
  const location = data.location || data.locality || data.village || "";
  let locationSection = "";
  if (location) {
    locationSection = `
      <tr>
        <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; width: 35%;"><strong>Location:</strong></td>
        <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb;">${location}</td>
      </tr>`;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px;">
        <h1 style="color: #2d5016; margin: 0 0 20px 0; font-size: 24px;">New Website Submission</h1>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; width: 35%;"><strong>Form Type:</strong></td>
            <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb;">${formType}</td>
          </tr>
          <tr>
            <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; width: 35%;"><strong>Name:</strong></td>
            <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb;">${name || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; width: 35%;"><strong>Email:</strong></td>
            <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb;">${email || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb; background: #f9fafb; width: 35%;"><strong>Phone:</strong></td>
            <td style="padding: 10px 15px; border-bottom: 1px solid #e5e7eb;">${phone || "N/A"}</td>
          </tr>
          ${productSection}
          ${messageSection}
          ${locationSection}
          ${otherFieldsHtml}
        </table>
        
        <p style="color: #999; font-size: 11px; margin: 20px 0 0 0;">Sent automatically by Eco-Brickster Website backend.</p>
      </div>
    </body>
    </html>
  `;
}

// Helper function to create user confirmation email for Contact form
function createUserContactEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px;">
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Hello ${name},</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Thank you for contacting Eco-Brickster.</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">We've received your message and will respond shortly.</p>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0;">If your query is urgent, feel free to send an email to: <a href="mailto:ecobrickster@gmail.com" style="color: #2d5016; text-decoration: none;">ecobrickster@gmail.com</a></p>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 10px 0;">Eco-Brickster Website Team</p>
      </div>
    </body>
    </html>
  `;
}

// Helper function to create user confirmation email for Product Orders
function createUserOrderEmail(name: string, productName: string, quantity: string | number, phone?: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px;">
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Hello ${name},</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Thank you for choosing Eco-Brickster!</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Your order request has been successfully received.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #2d5016; font-size: 18px; font-weight: bold; margin: 0 0 15px 0;">🧱 Order Details</p>
          <p style="color: #333; font-size: 16px; line-height: 1.8; margin: 5px 0;">• Product: ${productName}</p>
          <p style="color: #333; font-size: 16px; line-height: 1.8; margin: 5px 0;">• Quantity: ${quantity}</p>
          ${phone ? `<p style="color: #333; font-size: 16px; line-height: 1.8; margin: 5px 0;">• Contact Number: ${phone}</p>` : ''}
        </div>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 20px 0;">Our team will reach out shortly with delivery updates and pricing details.</p>
        
        <p style="color: #2d5016; font-size: 16px; font-weight: bold; margin: 30px 0 15px 0;">🌱 Build a Better World</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Every brick you choose supports recycling and sustainable construction.</p>
        
        <div style="margin: 30px 0;">
          <p style="color: #2d5016; font-size: 16px; font-weight: bold; margin: 0 0 15px 0;">📣 Stay Connected</p>
          <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 5px 0;">• Follow us on Instagram</p>
          <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 5px 0;">• If you have doubts, email us at: <a href="mailto:ecobrickster@gmail.com" style="color: #2d5016; text-decoration: none;">ecobrickster@gmail.com</a></p>
        </div>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 10px 0;">Warm regards,</p>
        <p style="color: #2d5016; font-size: 16px; font-weight: bold; margin: 5px 0;">Eco-Brickster Website Team</p>
      </div>
    </body>
    </html>
  `;
}

// Helper function to create user confirmation email for Subscribe
function createUserSubscribeEmail(name?: string): string {
  const displayName = name && name !== "Subscriber" ? name : "Subscriber";
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px;">
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Hello ${displayName},</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Thank you for subscribing!</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">You will now receive updates about new products, discounts, and sustainability news.</p>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 10px 0;">Eco-Brickster Website Team</p>
      </div>
    </body>
    </html>
  `;
}

// Helper function to create user confirmation email for Eco-Drive / Change Maker
function createUserEcoDriveEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px;">
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Hello ${name},</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Thank you for joining the Eco-Drive movement!</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Your registration has been recorded, and our team will connect with you soon.</p>
        
        <p style="color: #2d5016; font-size: 16px; font-weight: bold; margin: 30px 0 15px 0;">🌱 Together we can clean our community and build a greener future.</p>
        
        <div style="margin: 30px 0;">
          <p style="color: #2d5016; font-size: 16px; font-weight: bold; margin: 0 0 15px 0;">📣 Stay Connected</p>
          <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 5px 0;">• Follow us on Instagram</p>
          <p style="color: #333; font-size: 15px; line-height: 1.8; margin: 5px 0;">• For any doubts: <a href="mailto:ecobrickster@gmail.com" style="color: #2d5016; text-decoration: none;">ecobrickster@gmail.com</a></p>
        </div>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 30px 0 10px 0;">Eco-Brickster Website Team</p>
      </div>
    </body>
    </html>
  `;
}

// Send admin notification and user confirmation
export async function sendFormSubmissionEmails(
  formType: string,
  userData: { name?: string; email?: string; phone?: string; [key: string]: any },
  productName?: string,
  quantity?: string | number
): Promise<{ success: boolean; error?: string }> {
  try {
    // Prepare all user data for admin email
    const adminData = {
      ...userData,
      name: userData.name || userData.fullName || "",
      productName: productName || userData.product || userData.productName || "",
      quantity: quantity || userData.quantity || "",
    };

    // Send admin notification
    const adminHtml = createAdminNotificationEmail(formType, adminData);
    const adminResult = await sendEmail({
      to: EMAIL_CONFIG.ADMIN,
      subject: "New Form Submission – Website",
      html: adminHtml,
      fromName: "Website",
    });

    if (!adminResult.success) {
      console.error("Failed to send admin notification:", adminResult.error);
    }

    // Send user confirmation if email is provided
    if (userData.email) {
      let userHtml = "";
      
      let userSubject = "Thank You for Reaching Eco-Brickster";
      
      if (formType === "Order" && productName) {
        userSubject = "Your Eco-Brickster Order Request is Received";
        userHtml = createUserOrderEmail(
          userData.name || userData.fullName || "Valued Customer",
          productName,
          quantity || userData.quantity || 1,
          userData.phone
        );
      } else if (formType === "Subscribe") {
        userSubject = "You're Now Subscribed to Eco-Brickster";
        userHtml = createUserSubscribeEmail(userData.name);
      } else if (formType === "Eco-Drive" || formType === "Change Maker") {
        userSubject = "Eco-Drive Registration Successful";
        userHtml = createUserEcoDriveEmail(userData.name || userData.fullName || "Valued Customer");
      } else {
        // Default: Contact form
        userSubject = "We Received Your Message – Eco-Brickster";
        userHtml = createUserContactEmail(userData.name || userData.fullName || "Valued Customer");
      }

      const userResult = await sendEmail({
        to: userData.email,
        subject: userSubject,
        html: userHtml,
        fromName: "Eco-Brickster Website",
      });

      if (!userResult.success) {
        console.error("Failed to send user confirmation:", userResult.error);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending form submission emails:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Legacy functions for backward compatibility
export async function sendContactNotification(data: {
  name: string;
  email?: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  return sendFormSubmissionEmails("Contact", data);
}

export async function sendOrderNotification(data: {
  name: string;
  email?: string;
  phone?: string;
  product: string;
  quantity?: number;
  location?: string;
  payment?: string;
  message?: string;
}): Promise<{ success: boolean; error?: string }> {
  return sendFormSubmissionEmails("Order", data, data.product, data.quantity);
}

export async function sendSubscriptionConfirmation(email: string): Promise<{ success: boolean; error?: string }> {
  return sendFormSubmissionEmails("Subscribe", { name: "Subscriber", email });
}

export async function sendEcoDriveNotification(data: {
  name: string;
  email: string;
  phone: string;
  age?: string;
  location?: string;
  participation?: string;
  types?: string[];
  amount?: string;
  datetime?: string;
  pickup?: string;
  why?: string;
  guidance?: string;
  message?: string;
  [key: string]: any;
}): Promise<{ success: boolean; error?: string }> {
  return sendFormSubmissionEmails("Eco-Drive", data);
}

export async function sendCollectionNotification(data: {
  name: string;
  email: string;
  phone: string;
  age?: string;
  location?: string;
  driveType?: string;
  role?: string;
  message?: string;
  [key: string]: any;
}): Promise<{ success: boolean; error?: string }> {
  return sendFormSubmissionEmails("Eco-Drive", data);
}

export async function sendChangeMakerNotification(data: {
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
}): Promise<{ success: boolean; error?: string }> {
  return sendFormSubmissionEmails("Change Maker", data);
}

// Email helper function
export function getEmailConfig() {
  return EMAIL_CONFIG;
}
