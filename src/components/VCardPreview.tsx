import TemplateRenderer from "@/template-engine/renderer";

interface Props {
  template: string;
  card: any;
}

export default function VCardPreview({
  template,
  card,
}: Props) {
  return (
    <TemplateRenderer
      template={template}
      cardData={card}
    />
  );
}
