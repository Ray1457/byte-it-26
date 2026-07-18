import React from "react";

const DeliveryBoxIcon = () => (
  <svg viewBox="0 0 100 100" className="w-48 h-48 sm:w-56 sm:h-56">
    <path
      d="M 20 40 L 35 20 L 65 20 L 80 40 L 80 80 A 8 8 0 0 1 72 88 L 28 88 A 8 8 0 0 1 20 80 Z"
      fill="#a10d0d"
    />
    <rect x="30" y="45" width="40" height="43" fill="#000000" />
    <rect x="40" y="60" width="20" height="7" rx="2" fill="#a10d0d" />
  </svg>
);

const TrackingArrowIcon = () => (
  <svg viewBox="0 0 100 100" className="w-56 h-56 sm:w-64 sm:h-64">
    <path d="M 10 80 L 95 10 L 60 95 L 45 55 Z" fill="#990303" />
  </svg>
);

const RedMapPlaceholder = () => (
  <div className="w-full h-full bg-[#6a0808] relative overflow-hidden">
    <svg
      className="absolute inset-0 w-full h-full opacity-70"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
    >
      <path d="M -50 50 Q 100 10 200 80 T 450 150" stroke="#4a0505" strokeWidth="24" fill="none" />
      <path d="M -50 150 Q 150 200 250 100 T 450 50" stroke="#3d0303" strokeWidth="32" fill="none" />
      <path d="M 100 -50 Q 120 100 80 250" stroke="#520505" strokeWidth="16" fill="none" />
      <path d="M 300 -50 Q 280 150 320 250" stroke="#3d0303" strokeWidth="28" fill="none" />
      
      <rect x="250" y="30" width="70" height="60" fill="#4a0505" transform="rotate(20 250 30)" />
      <rect x="90" y="130" width="100" height="40" fill="#520505" transform="rotate(-12 90 130)" />
      
      {/* Central red lines highlight */}
      <path d="M 170 120 L 250 80 L 320 130" stroke="#d61515" strokeWidth="4" fill="none" />
      <path d="M 250 80 L 270 110" stroke="#d61515" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

export default function NexusExpressPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12 pb-32 flex flex-col gap-24 max-w-6xl mr-auto ml-8 md:ml-20 mt-12 md:mt-20 font-sans pt-10">
      {/* Delivery Section */}
      <section>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Delivery</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14">
          {/* Left Box */}
          <div className="border border-white/5 rounded-2xl aspect-[3/4] flex items-center justify-center p-8 bg-black relative">
            <DeliveryBoxIcon />
          </div>

          {/* Right Box */}
          <div className="flex flex-col justify-center gap-8">
            {/* Options Row */}
            <div className="flex flex-wrap gap-3">
              {/* Standard */}
              <div className="bg-white text-black px-4 py-2 rounded-full flex flex-col items-center flex-1 text-center min-w-[130px]">
                <span className="font-bold text-sm tracking-tight leading-tight mt-0.5">Standard</span>
                <span className="text-[9px] font-medium leading-tight text-zinc-800">2-4 Hour@49</span>
              </div>
              {/* Priority */}
              <div className="bg-white text-black px-4 py-2 rounded-full flex flex-col items-center flex-1 text-center min-w-[130px]">
                <span className="font-bold text-sm tracking-tight leading-tight mt-0.5">Priority</span>
                <span className="text-[9px] font-medium leading-tight text-zinc-800">60-90Mins@99</span>
              </div>
              {/* Express */}
              <div className="bg-white text-black px-4 py-2 rounded-full flex flex-col items-center flex-1 text-center min-w-[130px]">
                <span className="font-bold text-sm tracking-tight leading-tight mt-0.5">Express</span>
                <span className="text-[9px] font-medium leading-tight text-zinc-800">Under 30 Mins@199</span>
              </div>
            </div>

            {/* Times */}
            <div className="flex flex-col gap-5 max-w-[380px]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs md:text-[13px] font-medium text-zinc-200">Estimated time of arrival</span>
                <div className="bg-white text-black px-6 py-1.5 rounded-full text-xs font-bold min-w-[130px] text-center">
                  7:27 pm
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs md:text-[13px] font-medium text-zinc-200">Time of departure</span>
                <div className="bg-white text-black px-6 py-1.5 rounded-full text-xs font-bold min-w-[130px] text-center">
                  12:25 am
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-44 w-full mt-2 rounded-xl overflow-hidden border-[1px] border-[#0099ff] shadow-[0_0_24px_rgba(0,153,255,0.4)]">
              <RedMapPlaceholder />
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Tracking</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14">
          {/* Left Box */}
          <div className="border border-white/5 rounded-2xl aspect-[3/4] flex items-center justify-center relative p-8 bg-black">
            <div className="absolute top-6 right-6 text-right text-[9px] text-zinc-400 font-medium leading-tight">
              Train ID: V3282G<br />
              Poly/rmc 9pm<br />
              Contact 937675187
            </div>
            <TrackingArrowIcon />
          </div>

          {/* Right Box */}
          <div className="flex flex-col justify-center gap-8">
            {/* Status Box */}
            <div>
              <div className="bg-white text-black w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center">
                <span className="font-bold text-[17px] tracking-tight leading-[1.1] -mb-[2px]">Status</span>
                <span className="text-[10px] font-medium leading-none mt-1">Active</span>
              </div>
            </div>

            {/* Times Re-routed */}
            <div className="flex items-center justify-between gap-4 max-w-[380px]">
              <span className="text-xs md:text-[13px] font-medium text-zinc-200">Times re-routed</span>
              <div className="bg-white text-black px-6 py-1.5 rounded-full text-xs font-bold min-w-[130px] text-center">
                5
              </div>
            </div>

            {/* From / To */}
            <div className="flex items-center gap-4 max-w-[440px]">
              <span className="text-xs md:text-[13px] font-medium text-zinc-200 w-9">From</span>
              <div className="bg-white text-black px-6 py-1.5 rounded-full text-xs font-bold flex-1 text-center min-w-[120px]">
                Byte 2026
              </div>
              <span className="text-xs md:text-[13px] font-medium text-zinc-200 ml-1 w-5">To</span>
              <div className="bg-white text-black px-6 py-1.5 rounded-full text-xs font-bold flex-1 text-center min-w-[120px]">
                Xino 2026
              </div>
            </div>

            {/* Map */}
            <div className="h-44 w-full mt-2 rounded-xl overflow-hidden border border-transparent">
              <RedMapPlaceholder />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
