import { MuiColorInput } from "mui-color-input";

type InputProps = {
  color?: string;
  label: string;
  onColorChange: (value: string) => void;
} & React.ComponentPropsWithoutRef<"input">;

export default function ColorInput({
  color,
  label,
  onColorChange,
}: InputProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-start space-x-1">
        <span className="text-white">{label}</span>
      </div>
      <div className="bg-white w-fit">
        <MuiColorInput format="hex" value={color} onChange={onColorChange} />
      </div>
    </div>
  );
}
