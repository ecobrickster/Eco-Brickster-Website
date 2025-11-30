"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const EcoLogo = "/assets/images/Logo Eco-Brickster.png";

export default function Navbar() {
  const [otherOpen, setOtherOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-dark/60 border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="font-bold text-lg flex items-center gap-2">
            <Image src={EcoLogo} alt="Eco-Brickster" width={28} height={28} className="rounded-sm" />
            <span>Eco-Brickster</span>
          </Link>
        </motion.div>
        <nav className="hidden md:flex gap-6 text-sm items-center">
          <Link href="/products" className={`transition ${isActive('/products')? 'text-emerald font-semibold underline underline-offset-4' : 'hover:text-emerald'}`}>Products</Link>
          <Link href="/about" className={`transition ${isActive('/about')? 'text-emerald font-semibold underline underline-offset-4' : 'hover:text-emerald'}`}>About</Link>
          <Link href="/impact" className={`transition ${isActive('/impact')? 'text-emerald font-semibold underline underline-offset-4' : 'hover:text-emerald'}`}>Impact</Link>
          <Link href="/press" className={`transition ${isActive('/press')? 'text-emerald font-semibold underline underline-offset-4' : 'hover:text-emerald'}`}>Recognition & Press</Link>
          <Link href="/collection" className={`transition ${isActive('/collection')? 'text-emerald font-semibold underline underline-offset-4' : 'hover:text-emerald'}`}>Collection Drive</Link>
          <div className="relative">
            <button aria-label="Other links" onClick={() => setOtherOpen((v)=>!v)} className="p-2 rounded-full hover:bg-emerald hover:text-white transition">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {otherOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark shadow-lg py-2 z-50"
                >
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/change-maker" className="block px-4 py-2 text-sm hover:bg-emerald/10">Be a Change Maker</Link>
                  </motion.div>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link href="/faqs" className="block px-4 py-2 text-sm hover:bg-emerald/10">FAQs</Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Link href="/contact" className="px-4 py-2 rounded-full bg-emerald text-white shadow-soft hover:opacity-90 transition-transform hover:scale-105">Contact</Link>
        </motion.div>
      </div>
    </header>
  );
}
