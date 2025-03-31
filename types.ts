export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    runtime: number;
    budget: number;
    revenue: number;
    genres: Genre[];
    production_companies: ProductionCompany[];
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
  }
  
  export interface CastMember {
    id: number;
    name: string;
    profile_path: string | null;
  }
  
  export interface WatchProvider {
    provider_id: number;
    provider_name: string;
    logo_path: string;
  }