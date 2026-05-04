import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import { ZodError, z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Contact Form Schema
  const ContactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(5),
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form received:", req.body);
      const { name, email, subject, message } = ContactSchema.parse(req.body);
      console.log("Validation passed for:", { name, email, subject });

      const apiKey = process.env.RESEND_API_KEY;
      
      if (!apiKey) {
        console.warn("RESEND_API_KEY is not set. Using fallback logic for demonstration.");
        // In a real scenario, we'd throw an error or return 500 if the key is required.
        // For AI Studio preview without a key, we'll simulate success.
        return res.json({ 
          success: true, 
          message: "Message received! (Simulation mode - please add RESEND_API_KEY in settings for real email delivery)" 
        });
      }

      const resend = new Resend(apiKey);

      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "satyamkumarbgp8@gmail.com",
        subject: `New Message: ${subject}`,
        html: `
          <h3>New Message from Portfolio</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        return res.status(400).json({ success: false, error });
      }

      res.json({ success: true, data });
    } catch (err) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError;
        const errorMessages = zodErr.issues?.map((issue) => issue.message).filter(Boolean) || ["Invalid contact form data"];
        console.error("Validation error:", errorMessages);
        return res.status(400).json({ success: false, error: errorMessages });
      }
      console.error("Server error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
