import CorporateLayout from "@/templates/corporate/CorporateLayout";
import ModernLayout from "@/templates/modern/ModernLayout";
import LuxuryLayout from "@/templates/luxury/LuxuryLayout";
import DoctorLayout from "@/templates/DoctorsLayout/DoctorLayout";
import StartupLayout from "@/templates/startup/StartupLayout";
import PortfolioLayout from "@/templates/portfolio/PortfolioLayout";
import ExecutiveLayout from "@/templates/executive/ExecutiveLayout";

import { CardData } from "@/types/card";

const templates: Record<
  string,
  React.ComponentType<{ card: CardData }>
> = {
  corporate: CorporateLayout,
  modern: ModernLayout,
  luxury: LuxuryLayout,
  doctor: DoctorLayout,
  startup: StartupLayout,
  portfolio: PortfolioLayout,
  executive: ExecutiveLayout,
};

interface Props {
  template?: string;
  cardData: CardData;
}

export default function TemplateRenderer({
  template,
  cardData,
}: Props) {
  const selectedTemplate =
    template?.toLowerCase() || "corporate";

  const Component =
    templates[selectedTemplate] ||
    templates.corporate;

  return <Component card={cardData} />;
}
