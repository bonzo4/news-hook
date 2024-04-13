import { cn } from "@/lib/utils";

export function SecondaryButton({
  children,
  ...props
}: Readonly<{ children: React.ReactNode }> &
  React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "px-[10px] py-1 text-white bg-secondary-bg rounded-sm border-2 border-white border-opacity-25 hover:bg-opacity-25 hover:bg-secondary-bg hover:border-opacity-50 transition-colors duration-200 ease-in-out",
        props.className
      )}
    >
      {children}
    </button>
  );
}
