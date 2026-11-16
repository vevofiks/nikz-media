export type ServiceItem = {
  name: string;
  summary: string;
};

export type ServiceGroup = {
  id: string;
  index: string;
  title: string;
  line: string;
  items: ServiceItem[];
};

export type SiteContent = {
  agency: {
    name: string;
    tagline: string;
    positioning: string;
    email: string;
    phoneDisplay: string;
    phoneTel: string;
    whatsapp: string;
    address: string;
    city: string;
    siteUrl: string;
  };
  aboutCopy: string;
  seo: {
    title: string;
    description: string;
  };
  serviceGroups: ServiceGroup[];
  industries: { name: string; support: string }[];
  values: { index: string; title: string; copy: string }[];
  approach: { index: string; title: string; copy: string }[];
  workSlots: { index: string; discipline: string; note: string }[];
};

export type Inquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  message: string;
};
