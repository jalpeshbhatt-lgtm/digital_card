export interface Service {
  title: string;
  description: string;
  price: string;
}

export interface Product {
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  stock?: string;
}

export interface CardData {
  id?: string;
  slug?: string;
  name: string;
  designation?: string;
  company?: string;

  profileImage?: string;

  mobile?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  address?: string;

bio?: string;
aboutUs?: string;

directionUrl?: string;

  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  telegram?: string;

  services?: Service[];

  products?: Product[];

  galleryImages?: string[];

  upiId?: string;
  paymentQrCode?: string;
  showQrSection?: boolean;
  qualification?: string;
  specialization?: string;
  clinicTiming?: string;
  appointmentUrl?: string;
  showServices?: boolean;
  template?: string;
  showProducts?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  buttonStyle?: string;
}