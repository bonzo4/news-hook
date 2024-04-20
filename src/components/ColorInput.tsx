import InputColor, { Color } from "react-input-color";

type InputProps = {
  color: string;
  label: string;
  onColorChange: (color: Color) => void;
} & React.ComponentPropsWithoutRef<"input">;

export default function ColorInput(props: InputProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-start space-x-1">
        <span className="text-white">{props.label}</span>
      </div>
      <div></div>
      <InputColor initialValue="#ffffff" onChange={props.onColorChange} />
    </div>
  );
}
