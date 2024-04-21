import { FieldData } from "@/lib/data/FieldData";
import { Markdown } from "./Markdown";

type FieldsPreviewProps = {
  fields: FieldData[];
};

export default function FieldsPreview({ fields }: FieldsPreviewProps) {
  const sortInlineFields = fields.reduce((acc, field) => {
    if (field.inline) {
      const lastField = acc.at(-1);
      if (!lastField) {
        acc.push([field]);
        return acc;
      }
      if (lastField[0].inline) {
        if (lastField.length === 3) {
          acc.push([field]);
        } else {
          lastField.push(field);
        }
      } else {
        acc.push([field]);
      }
    } else {
      acc.push([field]);
    }
    return acc;
  }, [] as FieldData[][]);

  return (
    <div className="flex flex-col items-start justify-center space-y-2 text-sm">
      {sortInlineFields.map((fields, index) => (
        <div
          key={index}
          className="flex flex-row items-start justify-center space-x-2"
        >
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center"
            >
              {field.name && (
                <Markdown
                  content={field.name}
                  type="embed-content"
                  className="font-bold"
                />
              )}
              {field.value && (
                <Markdown content={field.value} type="embed-content" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
