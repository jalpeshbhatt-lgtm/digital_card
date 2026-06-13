
"use client";

interface Template {
  id: string;
  name: string;
  category: string;
  previewImage?: string;
}

interface Props {
  templates: Template[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function TemplateSelector({
  templates,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() =>
            onSelect(template.id)
          }
          className={`
            cursor-pointer
            overflow-hidden
            rounded-2xl
            border
            transition-all
            duration-300
            hover:scale-[1.02]
            ${
              selected === template.id
                ? "border-purple-500 ring-2 ring-purple-500"
                : "border-gray-700"
            }
          `}
        >
          <div className="aspect-[9/16] bg-gray-900 overflow-hidden">
            {template.previewImage ? (
              <img
                src={template.previewImage}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Preview
              </div>
            )}
          </div>

          <div className="p-4 bg-[#081028]">
            <h3 className="text-xl font-bold text-white">
              {template.name}
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              {template.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
