"use client";
import { useEffect, useState } from "react";
// Map features temporarily disabled
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface Project {
  id: number;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  beneficiary?: string;
}

// Map features temporarily disabled per requirements
export default function ProjectsMap() {
  // Map component temporarily disabled - no errors will occur
  return (
    <div className="w-full h-[500px] rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-emerald/30">
      <p className="text-slate-600 dark:text-slate-400">Map feature temporarily disabled</p>
    </div>
  );
}

