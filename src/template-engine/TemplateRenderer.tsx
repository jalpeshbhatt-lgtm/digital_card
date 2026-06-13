import CorporateLayout from "@/templates/corporate/CorporateLayout";
import ModernLayout from "@/templates/modern/ModernLayout";
import LuxuryLayout from "@/templates/luxury/LuxuryLayout";
import DoctorwLuxury from "@/templates/DoctorsLayout/DoctorLayout";


const templates: Record<string, any> = {
  corporate: CorporateLayout,
  modern: ModernLayout,
  luxury: LuxuryLayout,
};

interface Props {
  template: string;
  cardData: any;
}

export default function TemplateRenderer({
  template,
  cardData,
}: Props) {
  const Component =
    templates[
      template?.toLowerCase()
    ] || templates.corporate;

  return (
    <Component cardData={cardData} />
  );
}