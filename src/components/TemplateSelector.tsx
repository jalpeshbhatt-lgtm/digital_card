"use client";

interface Template {
  id: string;
  name: string;
  category: string;
  slug: string;
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
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {templates.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() =>
            onSelect(template.id)
          }
          className={`
            rounded-3xl
            overflow-hidden
            border
            transition
            text-left
            ${
              selected === template.id
                ? "border-violet-500 bg-violet-500/10"
                : "border-white/10 bg-[#071132]"
            }
          `}
        >
          {/* IMAGE */}

          <div
            className="
              h-56
              bg-[#020617]
              flex
              items-center
              justify-center
            "
          >
            {template.previewImage ? (
              <img
                src={
                  template.previewImage
                }
                alt={template.name}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            ) : (
              <div className="text-gray-500">
                No Preview
              </div>
            )}
          </div>

          {/* CONTENT */}

          <div className="p-5">
            <h3 className="text-2xl font-bold">
              {template.name}
            </h3>

            <p className="text-gray-400 mt-2 capitalize">
              {template.category}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}