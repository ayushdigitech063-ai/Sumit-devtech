"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  Search, 
  TrendingUp, 
  Globe, 
  ArrowUp, 
  ShoppingBag, 
  Zap, 
  FolderKanban, 
  Wifi, 
  Battery, 
  Star, 
  Lock, 
  Laptop
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroVisualProps {
  activeIndex: number;
  onSelectScene?: (index: number) => void;
}

export default function HeroVisualInteractive({ activeIndex }: HeroVisualProps) {
  const sceneIdx = activeIndex % 4;
  const [viewMode, setViewMode] = useState<"laptop" | "mobile">("laptop");

  return (
    <div className="relative mx-auto w-full max-w-[620px] select-none py-1">
      {/* 3D Glow loops behind devices */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-500/25 via-amber-400/20 to-blue-500/20 opacity-80 blur-3xl pointer-events-none" />

      {/* ========================================================
          DEVICE TOGGLE SWITCH (Switch between Laptop & Mobile View)
         ======================================================== */}
      <div className="mb-3 flex items-center justify-between px-2">
        {/* Left: Active Service Badge */}
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#161926]/90 px-3 py-1 text-xs backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-ping" />
          <span className="font-semibold text-white">
            {sceneIdx === 0 && "Web & E-Commerce"}
            {sceneIdx === 1 && "iOS & Android Apps"}
            {sceneIdx === 2 && "Google SEO Rank #1"}
            {sceneIdx === 3 && "Performance Marketing"}
          </span>
        </div>

        {/* Right: Device View Mode Switch */}
        <div className="flex items-center gap-1 rounded-full border border-white/20 bg-[#161926]/90 p-1 backdrop-blur-md shadow-lg">
          <button
            type="button"
            onClick={() => setViewMode("laptop")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300",
              viewMode === "laptop"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30"
                : "text-white/60 hover:text-white"
            )}
          >
            <Laptop size={14} />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("mobile")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300",
              viewMode === "mobile"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30"
                : "text-white/60 hover:text-white"
            )}
          >
            <Smartphone size={14} />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          FIXED-HEIGHT WRAPPER (Exact 330px so Hero Banner NEVER jumps/resizes!)
         ======================================================== */}
      <div className="relative h-[330px] w-full flex items-center justify-center overflow-visible">
        <AnimatePresence mode="wait">
          {/* STAGE 1: DESKTOP MACBOOK VIEW */}
          {viewMode === "laptop" && (
            <motion.div
              key="laptop-display"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-[530px] sm:max-w-[550px] scale-[0.88] xs:scale-[0.94] sm:scale-100 origin-center"
            >
              {/* Lid */}
              <div className="relative rounded-t-[20px] border-[8px] border-[#1c1e28] bg-[#1c1e28] p-0 shadow-[0_25px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                <div className="relative flex items-center justify-center py-1 bg-[#1c1e28]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0a0c12] ring-1 ring-[#3a3f52]" />
                </div>

                {/* Retina Screen: Exact 255px Height */}
                <div className="relative h-[255px] w-full overflow-hidden bg-[#fafbfc] text-slate-800 font-sans shadow-inner flex flex-col">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 bg-[#edf0f6] px-3 py-1.5 gap-2 shrink-0">
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex items-center gap-1 font-bold text-xs pl-1">
                        <span className="rounded bg-orange-500 px-1 py-0.5 text-[9px] text-white font-black leading-none">SUMIT</span>
                        <span className="text-[9px] font-black text-slate-700 tracking-tight">DEVTECH</span>
                      </div>
                    </div>

                    <div className="flex-1 max-w-[220px] flex items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] text-slate-600 font-medium shadow-2xs truncate">
                      <Lock size={9} className="text-emerald-600 shrink-0" />
                      <span className="truncate">sumitdevtech.com</span>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 shrink-0 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Live</span>
                    </div>
                  </div>

                  {/* Dashboard Body */}
                  <div className="p-3 flex-1 flex flex-col justify-between overflow-hidden">
                    <AnimatePresence mode="wait">
                      {sceneIdx === 0 && (
                        <motion.div
                          key="web-dash"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="grid grid-cols-4 gap-2">
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Total Revenue</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">₹4,85,200</div>
                              <div className="text-[8.5px] text-emerald-600 font-bold mt-0.5">▲ +18%</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Active Projects</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">24</div>
                              <div className="text-[8.5px] text-blue-600 font-bold mt-0.5">▲ +12%</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Happy Clients</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">500+</div>
                              <div className="text-[8.5px] text-emerald-600 font-bold mt-0.5">★ 100%</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Avg. Rating</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">4.9 ★</div>
                              <div className="text-[8.5px] text-amber-500 font-bold mt-0.5">Top Rated</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-[1.5fr_1fr] gap-2.5 my-auto">
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="flex justify-between items-center text-[9.5px] mb-1 font-bold text-slate-800">
                                <span>Project Growth</span>
                                <span className="text-[8.5px] text-slate-400 font-normal">This Year</span>
                              </div>
                              <div className="flex items-end justify-between h-12 px-1 gap-1">
                                {[35, 55, 40, 70, 60, 85, 95, 75, 100, 80, 90, 85].map((val, idx) => (
                                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                                    <div 
                                      className="w-full rounded-t-sm bg-gradient-to-t from-orange-500 to-amber-400"
                                      style={{ height: `${val}%` }}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs flex flex-col justify-between">
                              <div className="text-[9.5px] font-bold text-slate-800">Client Sources</div>
                              <div className="flex items-center justify-between text-[8.5px] text-slate-600">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />Direct 48%</div>
                                  <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Referral 25%</div>
                                  <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-orange-500" />Organic 27%</div>
                                </div>
                                <div className="h-9 w-9 rounded-full border-[4px] border-orange-500 border-t-blue-500 border-r-emerald-500" />
                              </div>
                            </div>
                          </div>

                          <div className="rounded-xl border border-slate-100 bg-white px-3 py-1 flex items-center justify-between text-[9.5px]">
                            <div className="flex items-center gap-2">
                              <span className="flex h-4 w-4 items-center justify-center rounded-md bg-blue-50 text-blue-600 font-bold">
                                <FolderKanban size={10} />
                              </span>
                              <span className="font-bold text-slate-900">Real Estate Next.js Portal</span>
                              <span className="text-slate-400">• Web Development</span>
                            </div>
                            <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.2 text-[8.5px] font-bold">
                              ● Live
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {sceneIdx === 1 && (
                        <motion.div
                          key="app-dash"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="grid grid-cols-4 gap-2">
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">App Installs</div>
                              <div className="text-xs sm:text-sm font-extrabold text-blue-600 mt-0.5">85,420</div>
                              <div className="text-[8.5px] text-emerald-600 font-bold mt-0.5">▲ +32% MoM</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Crash Free</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">99.98%</div>
                              <div className="text-[8.5px] text-emerald-600 font-bold mt-0.5">Rock Solid</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Active Devices</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">14.2K</div>
                              <div className="text-[8.5px] text-blue-500 font-bold mt-0.5">iOS + Android</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Store Rating</div>
                              <div className="text-xs sm:text-sm font-extrabold text-amber-500 mt-0.5">5.0 ★</div>
                              <div className="text-[8.5px] text-slate-500 font-bold mt-0.5">12K Reviews</div>
                            </div>
                          </div>

                          <div className="space-y-1.5 my-auto">
                            <div className="rounded-xl border border-slate-100 bg-white p-2 flex items-center justify-between text-[9.5px]">
                              <div>
                                <div className="font-bold text-slate-900">Flutter & React Native SDK Build #4.2</div>
                                <div className="text-slate-500 text-[8.5px]">Push Notifications • Biometric FaceID • Razorpay SDK</div>
                              </div>
                              <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 font-bold text-[8.5px]">60 FPS</span>
                            </div>

                            <div className="rounded-xl border border-slate-100 bg-white p-2 flex items-center justify-between text-[9.5px]">
                              <div>
                                <div className="font-bold text-slate-900">Real-time Cloud SQLite & Firebase Sync</div>
                                <div className="text-slate-500 text-[8.5px]">Offline caching enabled • Zero latency transactions</div>
                              </div>
                              <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 font-bold text-[8.5px]">Synced</span>
                            </div>
                          </div>

                          <div className="rounded-xl border border-slate-100 bg-white px-3 py-1 flex items-center justify-between text-[9.5px]">
                            <span className="font-bold text-slate-800">Production Build Live on Apple & Google Stores</span>
                            <span className="text-emerald-600 font-bold">100% Passed</span>
                          </div>
                        </motion.div>
                      )}

                      {sceneIdx === 2 && (
                        <motion.div
                          key="seo-dash"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="grid grid-cols-4 gap-2">
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Organic Clicks</div>
                              <div className="text-xs sm:text-sm font-extrabold text-emerald-600 mt-0.5">+340%</div>
                              <div className="text-[8.5px] text-emerald-600 font-bold mt-0.5">▲ High Growth</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Rank Positions</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">Top 3</div>
                              <div className="text-[8.5px] text-blue-600 font-bold mt-0.5">#1 on Google</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Keyword Volume</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">180K+</div>
                              <div className="text-[8.5px] text-slate-500 font-bold mt-0.5">Targeted</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Monthly Cost</div>
                              <div className="text-xs sm:text-sm font-extrabold text-orange-500 mt-0.5">₹0 Ad Cost</div>
                              <div className="text-[8.5px] text-emerald-600 font-bold mt-0.5">100% Free</div>
                            </div>
                          </div>

                          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-2.5 my-auto">
                            <div className="text-[9.5px] text-emerald-700 font-bold">Google SERP Verification • Position #1</div>
                            <div className="text-xs font-bold text-slate-900 mt-0.5">Best IT, Web & App Development Company</div>
                            <div className="text-[9.5px] text-slate-600 mt-1 leading-relaxed">
                              Outranking industry competitors organically with core technical SEO and instant speed.
                            </div>
                          </div>

                          <div className="rounded-xl border border-slate-100 bg-white px-3 py-1 flex items-center justify-between text-[9.5px]">
                            <span className="font-bold text-slate-800">Core Web Vitals Pass Rate</span>
                            <span className="text-emerald-600 font-bold">100% Green Score (LCP 0.4s)</span>
                          </div>
                        </motion.div>
                      )}

                      {sceneIdx === 3 && (
                        <motion.div
                          key="marketing-dash"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <div className="grid grid-cols-4 gap-2">
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">ROAS Multiplier</div>
                              <div className="text-xs sm:text-sm font-extrabold text-purple-600 mt-0.5">4.8x</div>
                              <div className="text-[8.5px] text-emerald-600 font-bold mt-0.5">Profitable</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">GMV Scale</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">₹12.4L+</div>
                              <div className="text-[8.5px] text-purple-600 font-bold mt-0.5">▲ +185% MoM</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Orders Delivered</div>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">10.8K+</div>
                              <div className="text-[8.5px] text-slate-500 font-bold mt-0.5">Automated</div>
                            </div>
                            <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                              <div className="text-[9px] text-slate-400 font-medium">Conversion Rate</div>
                              <div className="text-xs sm:text-sm font-extrabold text-emerald-600 mt-0.5">4.2%</div>
                              <div className="text-[8.5px] text-emerald-600 font-bold mt-0.5">High Funnel</div>
                            </div>
                          </div>

                          <div className="rounded-xl border border-slate-100 bg-white p-2.5 my-auto space-y-1.5">
                            <div className="flex justify-between text-[10px] text-slate-800 font-bold">
                              <span>Campaign Funnel Revenue Pipeline</span>
                              <span className="text-purple-600">+185% MoM Growth</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-orange-500 to-purple-600" />
                            </div>
                            <div className="flex justify-between text-[9px] text-slate-500">
                              <span>Ad Spend: ₹50,000</span>
                              <span className="text-emerald-600 font-bold">Gross Revenue: ₹2,40,000</span>
                            </div>
                          </div>

                          <div className="rounded-xl border border-slate-100 bg-white px-3 py-1 flex items-center justify-between text-[9.5px]">
                            <span className="font-bold text-slate-800">Meta & Google Performance Funnels</span>
                            <span className="text-purple-600 font-bold">Optimized</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Base */}
              <div className="relative mx-auto h-3.5 w-full rounded-b-xl bg-gradient-to-b from-[#b5bac9] via-[#8c92a6] to-[#6d7285] shadow-xl border-t border-[#d8dce8]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 h-1 w-14 rounded-b bg-[#2d303d]" />
              </div>
            </motion.div>
          )}

          {/* STAGE 2: FULL-SIZE SMARTPHONE VIEW (Authentic, well-proportioned modern iPhone, fixed height within 330px container) */}
          {viewMode === "mobile" && (
            <motion.div
              key="mobile-display"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-[180px] max-w-full scale-[0.92] sm:scale-100 origin-center"
            >
              {/* iPhone Realistic Outer Body */}
              <div className="relative rounded-[32px] border-[3px] border-[#383d4e] bg-[#12141c] p-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-white/20">
                {/* Volume & Power buttons */}
                <span className="absolute -left-[5px] top-12 h-6 w-[2px] rounded-l bg-slate-600" />
                <span className="absolute -left-[5px] top-20 h-6 w-[2px] rounded-l bg-slate-600" />
                <span className="absolute -right-[5px] top-16 h-8 w-[2px] rounded-r bg-slate-600" />

                {/* iPhone Screen (Authentic 19.5:9 proportion, 305px height) */}
                <div className="relative h-[305px] w-full rounded-[26px] bg-white overflow-hidden flex flex-col justify-between font-sans text-slate-800 shadow-inner">
                  {/* Top Notch / Dynamic Island Bar */}
                  <div className="pt-2 px-3 pb-1 bg-white flex items-center justify-between shrink-0">
                    <span className="text-[9px] font-bold text-slate-900 tracking-tight">9:41</span>
                    
                    {/* Sleek Dynamic Island */}
                    <div className="h-3 w-14 rounded-full bg-black flex items-center justify-between px-1.5 shadow-xs">
                      <span className="h-1 w-1 rounded-full bg-[#182a4d]" />
                      <span className="h-0.5 w-0.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="flex items-center gap-1 text-slate-800">
                      <Wifi size={8} />
                      <Battery size={10} className="fill-slate-800" />
                    </div>
                  </div>

                  {/* Mobile App Header */}
                  <div className="px-3 py-1 border-b border-slate-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      <span className="text-[10px] font-bold text-slate-900">Sumit DevTech</span>
                    </div>
                    <span className="text-[8px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100">
                      ● Active
                    </span>
                  </div>

                  {/* App Screen Content depending on active scene */}
                  <div className="px-3 py-1.5 flex-1 flex flex-col justify-between overflow-hidden">
                    {/* Hero Mini Banner inside App */}
                    <div className="rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 p-2 text-white shadow-xs">
                      <div className="text-[8px] font-medium text-orange-100 uppercase tracking-wider">
                        {sceneIdx === 0 && "Web & Store"}
                        {sceneIdx === 1 && "Native Mobile App"}
                        {sceneIdx === 2 && "SEO Growth Engine"}
                        {sceneIdx === 3 && "Performance Funnel"}
                      </div>
                      <div className="text-[11px] font-extrabold mt-0.5 leading-tight">
                        {sceneIdx === 0 && "Custom E-Commerce"}
                        {sceneIdx === 1 && "iOS + Android App"}
                        {sceneIdx === 2 && "Rank #1 on Google"}
                        {sceneIdx === 3 && "Scale to 10k+ Orders"}
                      </div>
                    </div>

                    {/* Quick Metric Cards */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-1.5">
                        <div className="text-[7.5px] text-slate-400 font-medium">Monthly Active</div>
                        <div className="text-[10px] font-bold text-slate-900 mt-0.5">
                          {sceneIdx === 0 && "50,000+"}
                          {sceneIdx === 1 && "85,420"}
                          {sceneIdx === 2 && "+340% Traffic"}
                          {sceneIdx === 3 && "₹12.4 Lakh"}
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-1.5">
                        <div className="text-[7.5px] text-slate-400 font-medium">Customer Rating</div>
                        <div className="text-[10px] font-bold text-amber-500 mt-0.5 flex items-center gap-0.5">
                          <span>4.9 ★</span>
                          <span className="text-[7px] text-slate-400">(Top)</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Card */}
                    <div className="rounded-lg border border-orange-100 bg-orange-50/60 p-1.5">
                      <div className="flex items-center justify-between text-[8px] font-bold text-slate-800">
                        <span>Speed & Core UX</span>
                        <span className="text-emerald-600 font-bold">100% Ultra Fast</span>
                      </div>
                      <div className="mt-1 h-1 w-full rounded-full bg-orange-200 overflow-hidden">
                        <div className="h-full w-4/5 rounded-full bg-orange-500" />
                      </div>
                    </div>

                    {/* CTA Button inside phone */}
                    <button className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white py-1.5 text-[8.5px] font-bold flex items-center justify-center gap-1 shadow-xs">
                      <span>Explore Live Demo</span>
                      <span>→</span>
                    </button>
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="pb-1 pt-0.5 flex justify-center shrink-0">
                    <span className="h-1 w-14 rounded-full bg-slate-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
