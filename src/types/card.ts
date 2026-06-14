
export interface ServiceItem {
  title?: string | null;
  description?: string | null;
  price?: string | null;
  category?: string | null;
  icon?: string | null;
}

export interface ProductItem {
  name?: string | null;
  description?: string | null;
  price?: string | null;
  discountPrice?: string | null;
  image?: string | null;
  category?: string | null;
}

export interface SocialLink {
  platform?: string | null;
  url?: string | null;
}

export interface PaymentLink {
  title?: string | null;
  url?: string | null;
}

export interface Testimonial {
  name?: string | null;
  review?: string | null;
}

export interface DocumentItem {
  title?: string | null;
  file?: string | null;
}

export interface CardData {
  id?: string | null;
  slug?: string | null;

  name: string;

  designation?: string | null;
  company?: string | null;

  upiId?: string | null;
  paytmNumber?: string | null;
  phonepeNumber?:string | null;
  googlePayNumber?: string | null;
  bankName?: string | null;
  accountHolder?: string | null;
  accountNumber?: string | null;
  ifscCode?: string | null;
  mobile?: string | null;
  whatsapp?: string | null;
  qualification?: string | null; 
  specialization?: string | null; 
  experience?: string | null; 
  clinicName?: string | null; 
  consultationFee?: string | null; 
  workingHours?: string | null;
  email?: string | null;
  website?: string | null;
  appointmentUrl?: string | null;
  clinicTiming?: string | null;
  address?: string | null;
  bio?: string | null;
  about?: string | null;
  aboutUs?: string | null;
  profileImage?: string | null;
  coverImage?: string | null;
  primaryColor?: string | null;
  fontFamily?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  twitter?: string | null;
  telegram?: string | null;
  
  directionUrl?: string | null;

  galleryImages?: string[] | null;

  services?: ServiceItem[] | null;

  products?: ProductItem[] | null;

  socialLinks?: SocialLink[] | null;

  paymentLinks?: PaymentLink[] | null;

  testimonials?: Testimonial[] | null;

  documents?: DocumentItem[] | null;

  youtubeVideo?: string | null;
  
  secondaryColor?: string | null;

  
  showQrSection?: boolean | null;
  showServices?: boolean | null;
  showProducts?: boolean | null;
}
