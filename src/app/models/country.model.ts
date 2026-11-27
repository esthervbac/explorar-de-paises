export interface Country {
  cca3: string; // <-- Adicione esta linha (sigla de 3 letras: BRA, ARG, etc.)
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  borders?: string[];
}
