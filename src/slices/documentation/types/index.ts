
export interface DocSection {
  id: string;
  title: string;
  icon: string;
  subsections: DocSectionItem[];
}

export interface DocSectionItem {
  id: string;
  title: string;
}

export interface DocCodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export interface DocContentSectionProps {
  inView: boolean;
}
