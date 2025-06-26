import { Block } from './block.model';

export interface Noticia {
  _id?: string;
  title: string;
  slug?: string;
  summary?: string;
  originalUrl?: string;
  author?: string;
  authorName?: string;
  categories: string[];
  tags?: string[];
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
  content: Block[]; // <-- ¡Aquí está el cambio importante!
  meta?: {
    description?: string;
    image?: string;
    category?: string;    // ← aquí lo agregas
  };
  createdAt?: string;
  updatedAt?: string;
}
