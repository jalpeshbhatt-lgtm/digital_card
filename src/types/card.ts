export interface ServiceItem {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  icon?: string;
}

export interface ProductItem {
  name?: string;
  description?: string;
  price?: string;
  discountPrice?: string;
  image?: string;
  category?: string;
}

export interface SocialLink {
  platform?: string;
  url?: string;
}

export interface PaymentLink {
  title?: string;
  url?: string;
}

export interface Testimonial {
  name?: string;
  review?: string;
}

export interface DocumentItem {
  title?: string;
  file?: string;
}

export interface CardData {
  id?: string;
  slug?: string;

  name: string;

  designation?: string;
  company?: string;

  mobile?: string;
  whatsapp?: string;

  email?: string;
  website?: string;

  address?: string;

  bio?: string;
  about?: string;
  aboutUs?: string;

  profileImage?: string;

  coverImage?: string;

  primaryColor?: string;
  fontFamily?: string;

  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  telegram?: string;

  directionUrl?: string;

  galleryImages?: string[];

  services?: ServiceItem[];

  products?: ProductItem[];

  socialLinks?: SocialLink[];

  paymentLinks?: PaymentLink[];

  testimonials?: Testimonial[];

  documents?: DocumentItem[];

  youtubeVideo?: string;

  showQrSection?: boolean;
  showServices?: boolean;
  showProducts?: boolean;
}