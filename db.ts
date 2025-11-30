import { promises as fs } from "fs";
import path from "path";

// Use /tmp on serverless environments or data/ directory locally
// Check multiple environment variables to detect serverless environment
const isServerless = 
  !!process.env.AWS_LAMBDA_FUNCTION_NAME ||
  (process.env.NODE_ENV === "production" && !process.env.DATA_DIR);

const DATA_DIR = isServerless 
  ? path.join("/tmp", "eco-brickster-data")
  : path.join(process.cwd(), "data");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
      // If mkdir fails (e.g., on serverless with /tmp), try to continue anyway
      // The directory might already exist or be created by another function
      console.warn("Could not create data directory:", error);
    }
  }
}

export interface ContactSubmission {
  id: string;
  type: "contact" | "subscribe" | "order" | "eco-drive" | "change-maker" | "collection";
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  data?: Record<string, any>;
  createdAt: string;
}

// Generic save function
export async function saveSubmission(submission: Omit<ContactSubmission, "id" | "createdAt">): Promise<ContactSubmission> {
  try {
    await ensureDataDir();
  } catch (error) {
    console.warn("Warning: Could not ensure data directory exists:", error);
    // Continue anyway - might work if directory already exists
  }
  
  const newSubmission: ContactSubmission = {
    ...submission,
    id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(DATA_DIR, `${submission.type}.json`);
  let submissions: ContactSubmission[] = [];

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    submissions = JSON.parse(fileContent);
    if (!Array.isArray(submissions)) {
      submissions = [];
    }
  } catch (error) {
    // File doesn't exist yet, start with empty array
    console.log(`Creating new submissions file for type: ${submission.type}`);
  }

  submissions.push(newSubmission);
  
  try {
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), "utf-8");
    console.log(`Successfully saved ${submission.type} submission: ${newSubmission.id}`);
  } catch (error) {
    console.error(`Error writing submission file for ${submission.type}:`, error);
    // Still return the submission even if file write fails
    // In production, you might want to log to an external service
  }

  return newSubmission;
}

// Get all submissions of a type
export async function getSubmissions(type: ContactSubmission["type"]): Promise<ContactSubmission[]> {
  await ensureDataDir();
  
  const filePath = path.join(DATA_DIR, `${type}.json`);
  
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

// Get all emails for newsletter
export async function getSubscribers(): Promise<string[]> {
  const subscriptions = await getSubmissions("subscribe");
  return subscriptions
    .map((s) => s.email)
    .filter((email): email is string => !!email && email.includes("@"));
}

