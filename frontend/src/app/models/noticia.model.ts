export interface Block {
  type: string;
  text?: string;
  tag?: string;
  style?: {
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
  url?: string;
  alt?: string;
  caption?: string;
  captionHtml?: string;
  href?: string;
  textLink?: string;
  items?: string[];
  ordered?: boolean;
  quote?: string;
  authorQuote?: string;
}

export interface Noticia {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  authorName?: string;
  categories: string[];
  tags?: string[];
  meta?: {
    description?: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
  content: Block[];
}
