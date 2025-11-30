"use client";
import { Instagram, Youtube, Facebook, Linkedin, MessageCircleMore, Mail } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { validateEmail } from "@/lib/validation";

const socials = [
  { href: "https://www.youtube.com/@Eco-Brickster", label: "YouTube", Icon: Youtube },
  { href: "https://www.instagram.com/eco_brickster/", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/eco-brickster", label: "Facebook", Icon: Facebook },
  { href: "https://www.linkedin.com/company/109119931", label: "LinkedIn", Icon: Linkedin },
  { href: "https://whatsapp.com/channel/0029Vb5iHLI5vKA5Zni9EB0D", label: "WhatsApp", Icon: MessageCircleMore },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "ok">(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    
    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setEmailError(emailValidation.error || "Invalid email");
      return;
    }
    
    setLoading(true);
    setStatus(null);
    try {
      const r = await fetch('/api/subscribe', { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }) 
      });
      if (r.ok) {
        const data = await r.json();
        if (data.success) {
          setEmail("");
          setEmailError("");
        }
      }
    } finally {
      setStatus("ok");
      setLoading(false);
    }
  };
  return (
    <footer className="mt-20 bg-[#053B21] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex justify-center gap-3">
          {socials.map(({ href, label, Icon }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-2 rounded-full hover:bg-white/10 transition"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-center"
        >
          <motion.a
            href="mailto:ecobrickster@gmail.com"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 text-sm hover:text-emerald transition"
          >
            <Mail className="w-4 h-4" /> ecobrickster@gmail.com
          </motion.a>
        </motion.div>
        <hr className="my-8 border-white/15" />
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="font-semibold">Quick Links</div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/80 sm:grid-cols-2">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Eco‑Drive", href: "/eco-drive" },
                { label: "Be a Change Maker", href: "/contact" },
                { label: "Impact", href: "/impact" },
                { label: "Press", href: "/press" },
                { label: "FAQs", href: "/faqs" },
                { label: "Collection", href: "/collection" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Testimonials", href: "/testimonials" },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.03 }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="font-semibold">Newsletter</div>
            <div className="mt-3 text-sm text-white/80">Stay updated. Join the mission!</div>
            <form className="mt-3 flex flex-col gap-2" onSubmit={onSubscribe}>
              <div className="flex gap-2">
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full rounded-md px-3 py-2 bg-white/10 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-emerald ${
                    emailError ? "ring-2 ring-red-400" : ""
                  }`}
                  aria-label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  whileFocus={{ scale: 1.02 }}
                  required
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-md bg-emerald text-white hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
                >
                  {loading ? "..." : "Subscribe"}
                </motion.button>
              </div>
              {emailError && (
                <p className="text-xs text-red-300">{emailError}</p>
              )}
            </form>
            <AnimatePresence>
              {status === "ok" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-xs text-emerald-300"
                >
                  Your request has been submitted successfully. Please check your email for confirmation.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="font-semibold">Legal</div>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Return & Cancellation Policy", href: "/returns" },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="font-semibold">Language</div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-3 text-sm text-white/80"
            >
              English
            </motion.div>
          </motion.div>
        </div>
        <hr className="my-8 border-white/15" />
        <div className="text-center text-xs text-white/80 font-semibold">
          <span className="font-bold">© 2025-2046 Eco-Brickster. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
