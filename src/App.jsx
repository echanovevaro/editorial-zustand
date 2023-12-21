import "./index.css"
import BooksDashboard from "./components/BooksDashboard"
import BookDetail from "./components/BookDetail"
import BooksList from "./components/BooksList"
import { useUserBooks } from "./store/userBooks"
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "react-bootstrap/Modal"

function App() {
  const { book, clearBook } = useUserBooks((state) => ({
    book: state.book,
    clearBook: state.clearBook,
  }))

  return (
    <>
      <Modal
        size="lg"
        centered
        show={!!book?.title}
        onHide={() => clearBook()}
      >
        <Modal.Header closeButton></Modal.Header>
        <BookDetail />
      </Modal>
      <Container
        fluid
        className="p-0 m-0"
      >
        <Row>
          <Col
            xs={12}
            className="p-5 pt-0 grid-container"
          >
            <BooksDashboard book={book} />
          </Col>
          {/* <Col
          xs={12}
          md={4}
          className="details-container d-flex justify-content-start flex-column ps-0 pt-5"
        >
          <Row className="mt-5">{book.title && <BookDetail />}</Row>
        </Col> */}
        </Row>
        <Row className="b-0">
          <Col
            xs={12}
            className="p-5 lists-container"
          >
            <BooksList />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
