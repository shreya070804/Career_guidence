import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export type BookmarkType = "career" | "resource" | "guide";

export interface BookmarkItem {
  id: string;
  type: BookmarkType;
  title: string;
  description: string;
  path?: string;
  category?: string;
}

interface BookmarkContextType {
  bookmarks: BookmarkItem[];
  addBookmark: (item: BookmarkItem) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  // Load bookmarks from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("career_compass_bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
  }, []);

  // Save bookmarks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("career_compass_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (item: BookmarkItem) => {
    if (bookmarks.some((b) => b.id === item.id)) {
      toast.info("Item already bookmarked");
      return;
    }
    setBookmarks((prev) => [...prev, item]);
    toast.success(`"${item.title}" saved to your profile!`);
  };

  const removeBookmark = (id: string) => {
    const itemToRemove = bookmarks.find(b => b.id === id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    if (itemToRemove) {
      toast.info(`"${itemToRemove.title}" removed from bookmarks.`);
    }
  };

  const isBookmarked = (id: string) => bookmarks.some((b) => b.id === id);

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
