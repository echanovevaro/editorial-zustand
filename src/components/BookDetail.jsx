import { useUserBooks } from "../store/userBooks"
import "bootstrap/dist/css/bootstrap.min.css"
import { DETAILS_OF_LISTS } from "../constants/globals"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { motion } from "framer-motion"

export default function BookDetail() {
  const { book, toggleBook, listIdFromBookId, setShowDetails } = useUserBooks(
    (state) => ({
      book: state.book,
      toggleBook: state.toggleBook,
      listIdFromBookId: state.listIdFromBookId,
      setShowDetails: state.setShowDetails,
    })
  )
  const { cover, title, ISBN, author, synopsis, genre, pages, year } = book

  const listId = listIdFromBookId(book.ISBN)
  return (
    <>
      <div className="d-flex justify-content-center align-items-start">
        <div>
          <LazyLoadImage
            src={cover}
            alt={title}
            loading="lazy"
            // effect='blur'
          />
        </div>
        <div className="p-4 pt-0 text-secondary w-100">
          <div className="details mb-4">
            <h4 className="display-5">{title}</h4>
            <p className="mb-1">ISBN: {ISBN}</p>
            <p className="mb-1">Author: {author?.name}</p>
            <p className="mb-1">Genre: {genre}</p>
            <p className="mb-1">Pages: {pages}</p>
            <p className="mb-1">Year: {year}</p>
            <p className="mb-1">{synopsis}</p>
          </div>
          <div className="d-flex flex-column gap-2 justify-content-center align-items-stretch">
            {DETAILS_OF_LISTS.map((list) => (
              <motion.button
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 500 }}
                key={list.id}
                onClick={() => {
                  toggleBook(list.id)
                  setShowDetails(false)
                  window.scrollTo(0, window.document.body.scrollHeight)
                }}
                className={
                  listId == list.id
                    ? "btn btn-warning"
                    : "btn btn-outline-secondary"
                }
              >
                {listId == list.id ? (
                  <span>
                    <FontAwesomeIcon icon={faXmark} /> {` books ${list.title}`}
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faPlus} /> {` books ${list.title}`}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
