export interface Game {
  id: string;
  title: string;
  remarks?: string;
  price?: string;
  custom_fields?: Record<string, any>;
}

export interface GameFormData {
  title: string;
  remarks: string;
  price: string;
  customFields?: Record<string, string>;
}
