import { cn } from "@/lib/utils";

type InputProps = {
  label?: string;
  charLimit?: number;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col w-full">
      {props.label && (
        <div className="flex flex-row items-center justify-start space-x-1">
          <span className="text-white">{props.label}</span>
          {props.charLimit && typeof props.value === "string" && (
            <span className="text-white text-opacity-50">
              {props.value.length || 0}/{props.charLimit}
            </span>
          )}
        </div>
      )}
      <input
        {...props}
        className={cn(
          "border-2",
          "border-primary-bg",
          "text-white",
          "bg-secondary-bg",
          "rounded-md",
          "p-1",
          props.className
        )}
      />
    </div>
  );
}
