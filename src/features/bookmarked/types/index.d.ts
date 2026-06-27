export type BookmarkedItemStatus = 'want_to_read' | 'reading' | 'finished';
export type BookmarkedItemType = 'book' | 'link';

export type BookmarkedItem = {
  id: string;
  createdBy: string;
  type: BookmarkedItemType;
  title: string;
  url?: string;
  author?: string;
  notes?: string;
  tags: string[];
  status: BookmarkedItemStatus;
  createdAt: string;
  updatedAt: string;
};

export type BookmarkedItemFormState = {
  type: BookmarkedItemType;
  title: string;
  url: string;
  author: string;
  notes: string;
  tags: string;
  status: BookmarkedItemStatus;
};
