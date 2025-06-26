export interface Block {
  type: 'text' | 'image' | 'quote' | 'link' | 'list';
  text?: string;
  html?: string;
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
