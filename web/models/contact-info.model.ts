export interface ContactInfo {
  companyName: string;
  companyPhrase: string;
  copyright: string;
  companyLogo: string;
  companyLogoUrl?: string;
  emails?: ContactInfoEmail[];
  socialMedias?: ContactInfoSocialMedia[];
  phones?: ContactInfoPhone[];
}

export interface ContactInfoEmail {
  id: number;
  email: string;
}

export interface ContactInfoSocialMedia {
  id: number;
  logo: string;
  name: string;
  url: string;
}

export interface ContactInfoPhone {
  id: number;
  number: string;
}
