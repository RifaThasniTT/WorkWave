export interface listUsers {
    _id: string;
    name: string;
    email: string;
    isBlocked: boolean;
    createdAt: Date;
}

export interface listCompanies {
    _id: string;
    name: string;
    email: string;
    isBlocked: boolean;
    status: "pending" | "approved" | "rejected";
    kyc: string;
    createdAt: Date;
}

export interface CompanyProfileDto {
  _id: string;
  name: string;
  email: string;
  logoUrl?: string;
  website?: string;
  foundedIn?: Date;
  location?: string;
  about?: string;
  employees?: number;
  industry?: string;
  phone?: string;
}
