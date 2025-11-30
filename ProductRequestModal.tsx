"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { validateName, validateEmail, validatePhone, validateQuantity, formatPhoneInput } from "@/lib/validation";

interface ProductRequestModalProps {
  product: {
    name: string;
    img: any;
    desc?: string;
  } | null;
  onClose: () => void;
}

export default function ProductRequestModal({ product, onClose }: ProductRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    const nameValidation = validateName(formData.name);
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.error || "Invalid name";
    }
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      newErrors.email = emailValidation.error || "Invalid email";
    }
    
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.valid) {
      newErrors.phone = phoneValidation.error || "Invalid phone";
    }
    
    const quantityValidation = validateQuantity(formData.quantity);
    if (!quantityValidation.valid) {
      newErrors.quantity = quantityValidation.error || "Invalid quantity";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    if (!product) return;

    setLoading(true);
    try {
      const response = await fetch("/api/product-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: product.name,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          quantity: Number(formData.quantity),
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Show success message inline
        setSuccessMessage("Your request has been submitted successfully. Please check your email for confirmation.");
        // Clear form immediately so user can order again
        setFormData({ name: "", email: "", phone: "", quantity: "" });
        setErrors({});
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        setErrors({ submit: data.error || "Failed to send request. Please try again." });
      }
    } catch (error) {
      setErrors({ submit: "Network error. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 grid place-items-center p-4 z-50"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 p-6 md:p-8 border border-emerald/30 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Product Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold mb-2">{product.name}</h2>
            {product.desc && (
              <p className="text-slate-600 dark:text-slate-400">{product.desc}</p>
            )}
          </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* Request Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`w-full rounded-md border ${
                        errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald`}
                      placeholder="Your full name"
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      className={`w-full rounded-md border ${
                        errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald`}
                      placeholder="your.email@example.com"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const formatted = formatPhoneInput(e.target.value);
                        setFormData({ ...formData, phone: formatted });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      className={`w-full rounded-md border ${
                        errors.phone ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald`}
                      placeholder="10-15 digits"
                      required
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => {
                        setFormData({ ...formData, quantity: e.target.value });
                        if (errors.quantity) setErrors({ ...errors, quantity: "" });
                      }}
                      className={`w-full rounded-md border ${
                        errors.quantity ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald`}
                      placeholder="Number of bricks"
                      required
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>
                    )}
                  </div>

                  {successMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-md bg-emerald/10 border border-emerald/30"
                    >
                      <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                        {successMessage}
                      </p>
                    </motion.div>
                  )}

                  {errors.submit && (
                    <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-3 rounded-md bg-emerald text-white hover:bg-emerald/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Request Order"}
                    </button>
                  </div>
                </form>
              </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

