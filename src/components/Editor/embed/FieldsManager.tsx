import { EmbedData } from "@/lib/data/EmbedData";
import { FieldData } from "@/lib/data/FieldData";
import { SetStateAction, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosClose,
  IoIosCopy,
} from "react-icons/io";
import { PrimaryButton } from "../../PrimaryButton";
import Input from "../../Input";
import TextAreaInput from "../../TextAreatInput";

type FieldsManagerProps = {
  embed: EmbedData;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function FieldsManager({
  embed,
  setEmbeds,
}: FieldsManagerProps) {
  const [expanded, setExpanded] = useState(false);

  const addField = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = [...prevEmbeds];
      if (!newEmbeds[embedIndex].fields) {
        newEmbeds[embedIndex].fields = [
          {
            name: "Field",
            value: "Value",
            inline: false,
          },
        ];
        return newEmbeds;
      } else {
        newEmbeds[embedIndex].fields?.push({
          name: "Field",
          value: "Value",
          inline: false,
        });
        return newEmbeds;
      }
    });
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row w-full space-x-3 items-center justify-start">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center bg-primary-bg text-white rounded-md"
        >
          {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </button>
        <span className="">Fields</span>
      </div>
      {expanded && (
        <div className="flex flex-col w-full space-y-3 items-start justify-center pl-5">
          {embed.fields &&
            embed.fields.map((field, index) => (
              <FieldManager
                embedId={embed.id}
                key={index}
                field={field}
                setEmbeds={setEmbeds}
                index={index}
              />
            ))}
          <PrimaryButton onClick={addField}>Add Field</PrimaryButton>
        </div>
      )}
    </div>
  );
}

type FiledMangerProps = {
  embedId: number;
  field: FieldData;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
  index: number;
};

function FieldManager({ field, setEmbeds, index, embedId }: FiledMangerProps) {
  const [expanded, setExpanded] = useState(false);

  const moveField = (direction: "up" | "down") => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embedId);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = [...prevEmbeds];
      const field = newEmbeds[embedIndex].fields?.splice(index, 1)[0];
      if (!field) return prevEmbeds;
      if (direction === "up") {
        newEmbeds[embedIndex].fields?.splice(index - 1, 0, field);
      } else {
        newEmbeds[embedIndex].fields?.splice(index + 1, 0, field);
      }
      return newEmbeds;
    });
  };

  const duplicateField = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embedId);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = [...prevEmbeds];
      const field = newEmbeds[embedIndex].fields?.[index];
      if (!field) return prevEmbeds;
      newEmbeds[embedIndex].fields?.splice(index, 0, field);
      return newEmbeds;
    });
  };

  const handleFieldDelete = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embedId);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = [...prevEmbeds];
      newEmbeds[embedIndex].fields?.splice(index, 1);
      return newEmbeds;
    });
  };

  const handleFieldNameChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embedId);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = [...prevEmbeds];
      newEmbeds[embedIndex].fields?.splice(index, 1, {
        ...field,
        name: value,
      });
      return newEmbeds;
    });
  };

  const handleFieldValueChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embedId);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = [...prevEmbeds];
      newEmbeds[embedIndex].fields?.splice(index, 1, {
        ...field,
        value: value,
      });
      return newEmbeds;
    });
  };

  const handleFieldInlineChange = (value: boolean) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embedId);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = [...prevEmbeds];
      newEmbeds[embedIndex].fields?.splice(index, 1, {
        ...field,
        inline: value,
      });
      return newEmbeds;
    });
  };

  return (
    <div className="flex flex-col w-full space-y-3 items-start justify-center">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row space-x-2 items-center justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center bg-primary-bg text-white rounded-md"
          >
            {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          <span className="">
            Field {index + 1} - {field.name}
          </span>
        </div>
        <div className="flex flex-row space-x-2 items-center justify-center">
          <button
            onClick={() => moveField("up")}
            className="flex items-center justify-center"
          >
            <IoIosArrowDown />
          </button>
          <button
            onClick={() => moveField("down")}
            className="flex items-center justify-center"
          >
            <IoIosArrowDown />
          </button>
          <button
            onClick={duplicateField}
            className="flex items-center justify-center"
          >
            <IoIosCopy />
          </button>
          <button
            onClick={handleFieldDelete}
            className="flex items-center justify-center"
          >
            <IoIosClose size={30} />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col w-full items-center justify-start space-y-1">
          <div className="flex flex-row w-full items-center justify-center space-x-3">
            <Input
              label="Field Name"
              className="w-full"
              limit={256}
              onChange={(event) => handleFieldNameChange(event.target.value)}
              value={field.name}
            />
            <div className="flex flex-row items-center justify-center mt-5 space-x-1">
              <label>Inline</label>
              <input
                type="checkbox"
                checked={field.inline}
                onChange={(event) =>
                  handleFieldInlineChange(event.target.checked)
                }
              />
            </div>
          </div>
          <TextAreaInput
            label="Field Value"
            className="w-full"
            onChange={(event) => handleFieldValueChange(event.target.value)}
            value={field.value}
          />
        </div>
      )}
    </div>
  );
}
