import CorporateTemplate from "@/templates/CorporateTemplate";
import ModernTemplate from "@/templates/ModernTemplate";
//import PremiumTemplate from "@/templates/PremiumTemplate";
import LuxuryTemplate from "@/templates/LuxuryTemplate";
//import StarrtupTemplate  from "@/templates/StartupTemplate";
import DoctorLayout from "@/templates/DoctorLayout";
import ExecutiveLayout from "@/templates/executive/ExecutiveLayout";



const templates: Record<string, React.ComponentType<any>> = {
  corporate: CorporateTemplate,
  modern: ModernTemplate,
  luxury: LuxuryTemplate,
  doctor: DoctorLayout,
  executive: ExecutiveLayout,
};

export default function TemplateRenderer({
  template,
  cardData,
}: {
  template: string;
  cardData: any;
}) {
  const Component =
    templates[template] || CorporateTemplate;

  return <Component cardData={cardData} />;
}