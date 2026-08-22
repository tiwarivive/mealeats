type SectionBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionBadge({
  children,
  className = "",
}: SectionBadgeProps) {
  return (
    <div
      className={`
        inline-flex
        h-[33px]
        min-w-[138px]
        items-center
        justify-center
        rounded-[37px]
        border
        border-[#eeeeee]
        bg-white
        px-[22px]
        text-[13px]
        font-medium
        leading-[28px]
        tracking-[-3%]
        text-[#16805b]
        box-shadow: 1px 1px 4px 0px #CCCCCC12;

        sm:h-[44px]
        sm:min-w-[140px]
        sm:text-[15px]

        lg:h-[43px]
        lg:min-w-[139px]
        max-[768px]:text-[10px]
        max-[768px]:leading-[28px]
        max-[768px]:h-[28px]

        ${className}
      `}
    >
      {children}
    </div>
  );
}