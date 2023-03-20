export interface ContentPage {
  id: string;
  last_edited_time: string;
  section: {
    index: number;
    title: string;
  };
  chapter: {
    index: number;
    title: string;
  };
}

export interface CodeBlock {
  block: {
    properties: {
      title: string[][];
      language: string[][];
      caption: string[][];
    };
  };
}
