import React from "react";

import CorporateLayout from "@/templates/corporate/CorporateLayout";
import ModernLayout from "@/templates/modern/ModernLayout";
import LuxuryLayout from "@/templates/luxury/LuxuryLayout";
import DoctorsLayout from "@/templates/DoctorsLayout/DoctorLayout";

const templates: Record<
  string,
  React.ComponentType<any>
> = {
  corporate: CorporateLayout,
  modern: ModernLayout,
  luxury: LuxuryLayout,
  doctor: DoctorsLayout,
};

interface Props {
  template: string;
  cardData: any;
}

export default function Renderer({
  template,
  cardData,
}: Props) {
  const Component =
    templates[template] ||
    CorporateLayout;

  return (
    <Component cardData={cardData} />
  );
}