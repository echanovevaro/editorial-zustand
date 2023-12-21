import { useUserBooks } from "../store/userBooks"
import { Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button"
import { DETAILS_OF_LISTS } from "../constants/globals"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function BookDetail() {
  const { book, toggleBook, listIdFromBookId } = useUserBooks((state) => ({
    book: state.book,
    toggleBook: state.toggleBook,
    listIdFromBookId: state.listIdFromBookId,
  }))
  const { cover, title, ISBN, author, synopsis, genre, pages, year } = book

  const listId = listIdFromBookId(book.ISBN)
  return (
    <>
      <Row className="m-0 p-2">
        <Col
          xs={5}
          className="p-0"
        >
          <LazyLoadImage
            src={cover}
            alt={title}
            loading="lazy"
            // effect='blur'
            style={{
              borderRadius: "2px",
              width: "100%",
              objectFit: "cover",
              height: "100%",
              aspectRatio: "1/1.5",
            }}
          />
        </Col>
        <Col
          xs={7}
          className="p-4 pt-0 text-secondary"
        >
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
              <Button
                key={list.id}
                size="lg"
                onClick={() => {
                  toggleBook(list.id)
                  window.scrollTo(0, window.document.body.scrollHeight)
                }}
                variant={listId == list.id ? "warning" : "outline-warning"}
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
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </>
  )
}
