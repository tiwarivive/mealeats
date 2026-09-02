"use client";

export default function ChatSkeleton() {
  return (
    <div className="space-y-3 p-3 sm:p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="
            animate-pulse
            rounded-xl
            !bg-[#f3f5f8]
            p-4
          "
        >
          <div className="h-3 w-24 rounded bg-white/80" />

          <div className="mt-3 h-3 w-[85%] rounded bg-white/80" />

          <div className="mt-2 h-3 w-[60%] rounded bg-white/80" />
        </div>
      ))}
    </div>
  );
}