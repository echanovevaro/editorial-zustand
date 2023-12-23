import { createWithEqualityFn } from "zustand/traditional"
import { DETAILS_OF_LISTS, BOOKS_BY_ISBN } from "../constants/globals"
import { shallow } from "zustand/shallow"
import { persist } from "zustand/middleware"

export const useUserBooks = createWithEqualityFn(
  persist(
    (set, get) => ({
      showDetails: false,
      book: {},

      lists: DETAILS_OF_LISTS?.map((list) => ({
        id: list.id,
        title: list.title,
        books: [],
      })),

      clearBook: () => {
        set({ book: {} })
        window.scrollTo({ top: 0, behavior: "smooth" })
      },

      listIdFromBookId: (bookId) => {
        const { lists } = get()
        return lists.find((list) => list.books.some((b) => b.ISBN == bookId))
          ?.id
      },

      setBookById: (bookId) => {
        const newBook = BOOKS_BY_ISBN[bookId]
        set({ book: newBook })
      },

      setShowDetails: (show) => {
        set({ showDetails: show })
      },

      toggleBook: (listId) => {
        const { book, lists } = get()
        const listTarget = lists.find((list) => list.id == listId)
        const listOrigin = lists.find((list) =>
          list.books.some((b) => b.ISBN === book.ISBN)
        )

        if (!listTarget) return

        //Remove book
        if (listOrigin?.id == listId) {
          const newLists = lists.map((list) => {
            if (list.id == listId) {
              return {
                ...list,
                books: list.books.filter((b) => b.ISBN != book.ISBN),
              }
            }
            return { ...list }
          })

          set({ lists: newLists })
        } else {
          // If the book is in other list, remove from it
          const listsUpdated = lists.map((list) => {
            if (listOrigin?.id == list.id) {
              return {
                ...list,
                books: list.books.filter((b) => b.ISBN !== book.ISBN),
              }
            }
            // Take it to the new list
            return list.id == listId
              ? {
                  ...list,
                  books: [...list.books, book],
                }
              : list
          })

          set({ lists: listsUpdated })
        }
      },
    }),
    {
      name: "etitorial-storage",
    }
  ),
  shallow
)
