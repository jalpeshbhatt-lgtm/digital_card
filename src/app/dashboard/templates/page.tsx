import TemplateCard from "@/components/TemplateCard";

export default function TemplatesPage() {
  const templates = [
    "Corporate",
    "Doctor",
    "Lawyer",
    "Real Estate",
    "Freelancer",
    "Salon",
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template}
          title={template}
        />
      ))}
    </div>
  );
}