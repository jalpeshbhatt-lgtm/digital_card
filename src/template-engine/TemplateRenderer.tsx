import { templates } from "./registry";

export default function TemplateRenderer({
  template,
  cardData,
}: {
  template: string;
  cardData: any;
}) {
  const Component =
    templates[template?.toLowerCase()] || templates.corporate;

  return <Component card={cardData} />;
}