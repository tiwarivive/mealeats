import type { ReactNode } from "react";

interface DifferenceCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function DifferenceCard({
  title,
  description,
  children,
}: DifferenceCardProps) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-border-light bg-[#F8F8F8]">
      <div className="p-4 sm:p-5">
        <h3 className="!text-[28px] font-primary font-medium !leading-[30px] text-dark tracking-[-4%] max-[768px]:!text-[20px] max-[768px]:!leading-[30px]">
          {title}
        </h3>

        <p className="!mt-6 min-h-[42px] text-body font-normal leading-[22px] text-[#7E7E7E] max-[768px]:text-[14px] max-[768px]:leading-[20px] max-[768px]:!mt-2">
          {description}
        </p>
      </div>

      <div className="flex min-h-[175px] items-center justify-center px-5 pb-5 pt-2">
        {children}
      </div>
    </article>
  );
}