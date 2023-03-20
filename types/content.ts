export interface Section {
  title: string;
  index: number;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  last_edited_time: string;
  title: string; // chapter 이름
  index: number;
  section_title: string;
  section_index: number;
}

export interface MenuBase {
  title: string;
}

export interface InnerMenu extends MenuBase {
  type: "INNER";
  id: string;
}

export interface ExtenralMenu extends MenuBase {
  type: "EXTERNAL";
  url: string;
}

export type Menu = InnerMenu | ExtenralMenu;
