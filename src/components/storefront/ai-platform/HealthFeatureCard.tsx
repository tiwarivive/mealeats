import type { LucideIcon } from "lucide-react";

interface HealthFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function HealthFeatureCard({
  icon: Icon,
  title,
  description,
}: HealthFeatureCardProps) {
  return (
    <div className="min-h-[145px] rounded-[10px] border border-[#E6E6E6] bg-white p-4 shadow-[0_4px_18px_rgba(0,0,0,0.025)]">
      <div className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-[#DADADA]">
        <Icon size={14} strokeWidth={1.5} className="text-[#3F3F3F]" />
      </div>

      <h3 className="mt-4 text-[11px] font-medium text-[#292929]">
        {title}
      </h3>

      <p className="mt-2 text-[8px] leading-[1.55] text-[#777]">
        {description}
      </p>
    </div>
  );
}