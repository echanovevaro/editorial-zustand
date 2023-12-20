import { library } from "../../books.json";
import { AddToListReaded, AddToListToRead } from "../components/Icons";

export const BOOKS = library.map((b) => ({
  ...b.book,
}));

export const BOOKS_BY_ISBN = BOOKS.reduce((acc, book) => {
  return { ...acc, [book.ISBN]: book };
}, {});

export const GENRES = [...new Set(BOOKS.map((b) => b.genre))];

export const DEFAULT_GENRE = "All books";

export const MAX_PAGES = Math.max(...BOOKS.map((b) => b.pages));

export const LISTS_IDS = {
  BOOKS_TO_READ: "BOOKS_TO_READ",
  BOOKS_READ: "BOOKS_READ",
};

export const DETAILS_OF_LISTS = [
  {
    id: "BOOKS_READ",
    title: "read",
    Icon: AddToListReaded,
  },
  {
    id: "BOOKS_TO_READ",
    title: "to read",
    Icon: AddToListToRead,
  },
];
