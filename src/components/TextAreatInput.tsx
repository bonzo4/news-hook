import { cn } from "@/lib/utils";

type TextAreaInputProps = {
  label?: string;
  limit?: number;
  required?: boolean;
} & React.ComponentPropsWithoutRef<"textarea">;

export default function TextAreaInput(props: TextAreaInputProps) {
  return (
    <div className="flex flex-col w-full">
      {props.label && (
        <div className="flex flex-row items-center justify-start space-x-1">
          <span className="text-white">{props.label}</span>
          {props.required && <span className="text-[#FF6666]">*</span>}
          {props.limit && typeof props.value === "string" && (
            <span className="text-white text-opacity-50">
              {props.value.length || 0}/{props.limit}
            </span>
          )}
        </div>
      )}
      <textarea
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
        style={{ borderColor: props.required && !props.value ? "#FF6666" : "" }}
      />
    </div>
  );
}
