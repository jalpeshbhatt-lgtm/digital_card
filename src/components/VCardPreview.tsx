import TemplateRenderer from "@/template-engine/TemplateRenderer";

export default function VCardPreview({
  card,
  template,
}: any) {
  return (
    <TemplateRenderer
  template={template}
  cardData={card}
/>  );
}