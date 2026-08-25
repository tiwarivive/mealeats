import type { LucideIcon } from "lucide-react";

interface CareCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function CareCard({
  icon: Icon,
  title,
  description,
}: CareCardProps) {
  return (
    <article className="rounded-[8px] border border-[#E5E5E5] bg-white p-4 sm:p-5">
      <div className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-[#DADADA]">
        <Icon size={14} strokeWidth={1.5} />
      </div>

      <h3 className="mt-5 text-[10px] font-medium text-[#242424]">
        {title}
      </h3>

      <p className="mt-2 text-[8px] leading-[1.55] text-[#777]">
        {description}
      </p>
    </article>
  );
}