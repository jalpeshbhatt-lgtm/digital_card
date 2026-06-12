"use client";

interface Template {
  id: string;
  name: string;
}

interface Props {
  templates: Template[];
  selectedTemplateId: string;
  onSelect: (id: string) => void;
}

export default function TemplateSelector({
  templates,
  selectedTemplateId,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {templates.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() => {
  console.log("Selected Template:", template.id);
  onSelect(template.id);
}}
          className={`border rounded-lg p-4 text-left ${
            selectedTemplateId === template.id
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300"
          }`}
        >
          {template.name}
        </button>
      ))}
    </div>
  );
}