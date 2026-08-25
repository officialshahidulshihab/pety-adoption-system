export type PetStatus = "Available" | "In Review" | "Adopted";
export type PetSize = "XS" | "S" | "M" | "L" | "XL";
export type PetSpecies = "Dog" | "Cat" | "Rabbit" | "Bird" | "Other";
export type EnergyLevel = "Low" | "Medium" | "High";

export interface Shelter {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  verified: boolean;
}

export interface BehaviorMetrics {
  friendlinessWithKids: number; // 1–5
  friendlinessWithPets: number;
  energyLevel: EnergyLevel;
  trainability: number; // 1–5
  independence: number; // 1–5
}

export interface MedicalHistory {
  vaccinated: boolean;
  neutered: boolean;
  microchipped: boolean;
  conditions: string[];
  lastCheckup: string; // ISO date
}

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  ageYears: number;
  size: PetSize;
  status: PetStatus;
  imageUrl: string;
  matchScore?: number;
  aiBio: string;
  story: string;
  behavior: BehaviorMetrics;
  medical: MedicalHistory;
  shelter: Shelter;
  tags: string[];
  listedAt: string;
}