export interface CardData {
  id?: string;

  name: string;
  designation: string;
  company: string;

  phone?: string;
  mobile?: string;

  email: string;
  website: string;
  whatsapp?: string;

  address?: string;
  directionUrl?: string;

  slug: string;

  profileImage?: string;
  coverImage?: string;

  aboutUs?: string;
  bio?: string;

  skills?: string[];
  
  upiId?: string;
  paymentQrCode?: string;

  primaryColor?: string;
  fontFamily?: string;
  showQrSection?: boolean;
  
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  telegram?: string;

  socialLinks?: {
    platform: string;
    url: string;
  }[];services?: {
  icon?: string;
  title: string;
  description?: string;
}[];

products?: {
  image?: string;
  name: string;
  price?: string;
  description?: string;
}[];

showServices?: boolean;
showProducts?: boolean;


  // Doctor fields
  qualification?: string;
  specialization?: string;
  clinicTiming?: string;
  appointmentUrl?: string;
}