"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Counter from "@/components/Counter";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { GradientButton } from "@/components/ui/gradient-button";

// Asset paths - all images in public/assets/images/
const Hero1 = "/assets/images/Hero home 1.png";
const Hero2 = "/assets/images/Hero home 2.png";
const Hero3 = "/assets/images/Hero img homw3.png";
const Hero4 = "/assets/images/Hero home 4.png";
const Hero5 = "/assets/images/Bricks with workers home hero img.png";
const Hero6 = "/assets/images/Bricks in bulk.jpg";
const Hero7 = "/assets/images/Sitting area pilot project.jpg";
const BrickImg = "/assets/images/Standard Brick - product.png";
const AppHome = "/assets/images/home  app.png";
const AppCommunity = "/assets/images/community app.png";
const AppMaterials = "/assets/images/materials app.png";
const AppWorkers = "/assets/images/workers page.png";
const AppWithPerson = "/assets/images/App with person.png";
const IconPlastic = "/assets/images/Icon plastic saved.jpeg";
const IconPeople = "/assets/images/people impacted icon.png";
const IconCO2 = "/assets/images/co2 icon.png";
const MissionImg = "/assets/images/Mission img.png";
const VisionImg = "/assets/images/vision img.png";
const ImgBathroom = "/assets/images/Bathroomfor free to a poor family pilot project.jpg";
const ImgSitting = "/assets/images/Sitting area pilot project.jpg";
const ImgGarden = "/assets/images/Bricks in garden edging.jpg";
const StandardBrickProduct = "/assets/images/Standard Brick - product.png";
const InterlockBrickProduct = "/assets/images/Interlocking brick -product.png";
const TileBrickProduct = "/assets/images/Eco- Buildings.png";

export default function HomePage() {
  const heroes = useMemo(() => [Hero1, Hero2, Hero3, Hero4, Hero5, Hero6, Hero7], []);
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=>{
      setHeroIdx((i)=> (i + 1) % heroes.length);
    }, 10000);
    return ()=> clearInterval(id);
  }, [heroes.length]);
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Scroll 1 — Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] grid place-items-center">
        {/* Background image (no theme overlays) */}
        <div className="absolute inset-0">
          <Image src={heroes[heroIdx]} alt="Eco-Brickster hero" fill priority className="object-cover" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-4xl md:text-6xl font-extrabold text-white"
          >
            Building Tomorrow from Today’s Waste
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.1 }}
            className="mt-4 text-base md:text-lg text-slate-200"
          >
            At Eco-Brickster, we transform discarded plastic into powerful building blocks — creating homes, schools, and hope across communities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <GradientButton asChild>
              <Link href="/products">🌱 Explore Our Bricks</Link>
            </GradientButton>
            <GradientButton asChild>
              <Link href="/contact">💬 Join the Movement</Link>
            </GradientButton>
          </motion.div>
        </div>
        {/* Scroll-down arrow */}
        <div className="absolute bottom-6 left-0 right-0 grid place-items-center">
          <div className="w-10 h-10 rounded-full border border-white/50 text-white grid place-items-center animate-bounce">↓</div>
        </div>
      </section>


      {/* Scroll 3 — Live Impact Stats */}
      <section className="relative bg-gradient-to-b from-white to-sky/10 dark:from-dark dark:to-emerald/5">
        {/* Brick stacking animation placeholder */}
        <div className="absolute inset-0 opacity-10 grid grid-rows-6">
          {[...Array(6)].map((_, r) => (
            <div key={r} className="grid grid-cols-12">
              {[...Array(12)].map((_, c) => (
                <div key={c} className="border border-slate-300/20" />
              ))}
            </div>
          ))}
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative text-2xl md:text-3xl font-bold text-center pt-16"
        >
          Live Impact Stats
        </motion.h2>
        <div className="relative mx-auto max-w-7xl px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Plastic Saved', value: <Counter from={0} to={120000} suffix="+" duration={4500} />, icon: IconPlastic },
            { label: 'People Impacted', value: <Counter from={0} to={1000} suffix="+" duration={4500} />, icon: IconPeople },
            { label: 'Pilot Projects', value: <Counter from={0} to={10} suffix="+" duration={4500} />, icon: BrickImg },
            { label: 'CO₂ Reduced', value: <Counter from={0} to={8200} suffix=" kg" duration={4500} />, icon: IconCO2 },
          ].map((s, i) => (
            <motion.div 
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20 shadow-sm text-center"
            >
              <div className="mx-auto relative w-8 h-8 mb-2">
                <Image src={s.icon} alt={s.label} fill className="object-contain" />
              </div>
              <div className="text-sm uppercase tracking-widest text-slate-600 dark:text-slate-400">{s.label}</div>
              <div className="mt-2 text-3xl font-extrabold text-emerald">{s.value}</div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative text-center pb-12"
        >
          <p className="text-slate-600 dark:text-slate-400">Every number here is a story — of what we've reclaimed, rebuilt, and restored.</p>
        </motion.div>
      </section>

      {/* Scroll 4 — Call To Action */}
      <section className="relative overflow-hidden">
        {/* Background video loop placeholder */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-slate-900/60" />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            The planet doesn't need more talk — it needs builders of change.
          </motion.h3>
          <div className="mt-8 flex gap-4 justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/products" className="px-6 py-3 rounded-full bg-emerald text-white shadow-lg transition font-semibold">🛒 Shop Eco-Bricks Now</Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/about" className="px-6 py-3 rounded-full border border-emerald text-white hover:bg-emerald/20 transition font-semibold">📰 Read Our Story</Link>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-slate-200"
          >
            Eco-Brickster — A Dream Built from Discarded Dreams.
          </motion.div>
        </div>
      </section>

      {/* Scroll 5 — Featured 3D Brick */}
      <section className="mx-auto max-w-7xl px-4 py-24 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/5] w-full max-w-lg md:max-w-xl md:max-h-[450px] rounded-2xl overflow-hidden ring-4 ring-emerald/60 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-emerald/10 dark:from-white/10 dark:to-emerald/10 pointer-events-none" />
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
          <Image src={BrickImg} alt="Eco‑Brick" fill className="object-contain p-4 md:p-5 animate-[spin_36s_linear_infinite]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold"
          >
            Featured Brick in Live 3D
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-sm text-slate-600 dark:text-slate-400"
          >
            Side Specification Table:
          </motion.div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {[
              ["Size","230mm x 110mm x 75mm"],
              ["Material","Fully recycled plastic"],
              ["Weight","1.5–2.2 kg (varies by type)"],
              ["Water Absorption","<1%"],
              ["Compression Strength", "> 12 MPa"],
              ["Finish","Smooth, modern look"],
            ].map(([k,v], i)=> (
              <motion.div 
                key={k} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: "rgb(16, 185, 129)" }}
                className="p-3 rounded-xl border-2 border-emerald/60 bg-emerald/10 shadow-md transition-all"
              >
                <div className="text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400">{k}</div>
                <div className="font-medium">{v}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            {["Easy & Quick to Build","Weather Resistant","Reusable + Long Lasting","Smooth Finish & Modern Look","Earth-friendly Solution for Smart Cities"].map((t, i)=> (
              <motion.div 
                key={t} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: "rgb(16, 185, 129)" }}
                className="p-3 rounded-xl border-2 border-emerald/60 bg-emerald/10 shadow-md transition-all"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Scroll 6 — Advantages */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="rounded-[2rem] bg-slate-900 text-white p-8 md:p-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center"
          >
            Why Eco-Bricks?
          </motion.h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {["Easy & Quick to Build","Weather Resistant","Reusable + Long Lasting","Smooth Finish & Modern Look","Earth-friendly Solution for Smart Cities"].map((t, i) => (
              <motion.div 
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center font-medium"
              >
                {t}
              </motion.div>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 text-white/80"
          >
            "Designed with people in mind, made with the planet in mind."
          </motion.p>
        </div>
      </section>

      {/* Product Gallery removed per request */}

      {/* Scroll 8 — Trusted Quality (dark highlight) */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="rounded-[2rem] bg-slate-900 text-white p-8 md:p-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center"
          >
            Trusted Quality
          </motion.h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Load Bearing Verified","Water Resistant","Safe for Sun & Heat","Engineer Approved"].map((t, i) => (
              <motion.div 
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll 9 — App Showcase */}
      <section className="mx-auto max-w-7xl px-4 py-24 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
            {[AppHome, AppCommunity, AppMaterials, AppWorkers, AppWithPerson].map((img, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 12 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="snap-center min-w-[220px] md:min-w-[260px] aspect-[9/18] rounded-xl overflow-hidden border-2 border-emerald/60 shadow-lg relative bg-white/70 dark:bg-white/5"
              >
                <Image src={img} alt={`App screen ${i+1}`} fill className="object-contain p-2" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold"
          >
            Eco-Brickster App
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-slate-700 dark:text-slate-300 font-medium"
          >
            Plan, customize, order, and build — eco-friendly, smarter, faster.
          </motion.p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            {["Order Eco-Bricks","Customize bricks","Construction guide","Connect with builders","Live tracking","Digital receipts"].map((f, i) => (
              <motion.li 
                key={f} 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.2 + i * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: "rgb(16, 185, 129)" }}
                className="p-3 rounded-xl border-2 border-emerald/60 bg-emerald/10 font-medium"
              >
                {f}
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="px-5 py-3 rounded-full bg-emerald text-white font-semibold"
            >
              Android (Live)
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="px-5 py-3 rounded-full border border-emerald text-emerald font-semibold"
            >
              iOS (Coming Soon)
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex items-center gap-4"
          >
            <div className="w-24 h-24 rounded-md bg-slate-200 dark:bg-slate-800 grid place-items-center text-xs">QR</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Scan to Download</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">
              ⚠️ App is in progress - Coming Soon!
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Removed Behind the Build on Home (videos moved to Products page) */}

      {/* Scroll 10 — Products Grid */}
      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 rounded-3xl -z-10" />
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Our Products
        </motion.h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { name: "Standard Eco-Brick", price: "₹4.00" },
            { name: "Interlock Eco-Brick", price: "₹6.00" },
            { name: "Tile / Flat Eco-Brick", price: "₹5.00" },
          ].map((p, i) => (
            <motion.div 
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-white/5"
            >
              <div className="relative aspect-video rounded-md overflow-hidden bg-slate-200 dark:bg-slate-800">
                <Image 
                  src={p.name.includes('Interlock') ? InterlockBrickProduct : p.name.includes('Tile') ? TileBrickProduct : StandardBrickProduct} 
                  alt={p.name} 
                  fill 
                  className="object-contain p-2" 
                />
              </div>
              <div className="mt-4 font-semibold">{p.name}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{p.price} per brick</div>
              <div className="mt-4 flex gap-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-md bg-emerald text-white"
                >
                  Select
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-md border border-emerald text-emerald"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <motion.a
            href="/products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-emerald text-white font-semibold shadow-lg"
          >
            See Products
          </motion.a>
        </motion.div>
      </section>

      

      {/* Scroll 12 — Live Community Projects */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Live Community Projects
        </motion.h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[{
            title: "Sitting area — public place for villagers",
            img: ImgSitting,
            desc: "Community resting spot built with eco‑bricks"
          },{
            title: "Free bathroom for poor family by Eco‑Brickster",
            img: ImgBathroom,
            desc: "Safe & hygienic sanitation for a needy family"
          },{
            title: "Garden edging in a home",
            img: ImgGarden,
            desc: "Durable and neat edging using eco‑bricks"
          }].map((c, i) => (
            <motion.div 
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-white/5"
            >
              <div className="relative aspect-video rounded-md overflow-hidden bg-slate-200 dark:bg-slate-800">
                <Image src={c.img} alt={c.title} fill className="object-cover" />
              </div>
              <div className="mt-3 font-medium">{c.title}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{c.desc}</div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <motion.a
            href="/impact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-emerald text-white font-semibold shadow-lg"
          >
            See All Projects
          </motion.a>
        </motion.div>
      </section>


      {/* Scroll 14 — Final CTA (Be a Change Maker) dark highlight */}
      <section className="relative mx-auto max-w-7xl px-4 py-24">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-slate-900" />
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              Be a Change Maker
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-slate-200"
            >
              Join the movement to recycle plastic into homes, pavements, and public spaces.
            </motion.p>
            <div className="mt-6 flex gap-3">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/change-maker" className="px-5 py-3 rounded-full bg-emerald text-white font-semibold">Become a Change Maker</Link>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="px-5 py-3 rounded-full border border-emerald text-white font-semibold">Build With Us</Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800"
          >
            <Image src={Hero7} alt="Change Maker" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
