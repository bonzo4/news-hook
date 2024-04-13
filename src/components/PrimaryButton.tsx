import { cn } from "@/lib/utils";

export function PrimaryButton({
  children,
  ...props
}: Readonly<{ children: React.ReactNode }> &
  React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "px-[10px] py-1  text-white bg-primary rounded-xs border-[0.5px] border-white border-opacity-75 hover:bg-opacity-75 hover:bg-secondary-bg hover:border-opacity-100 transition-colors duration-200 ease-in-out",
        props.className
      )}
    >
      {children}
    </button>
  );
}
