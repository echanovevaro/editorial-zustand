import React, { Suspense } from "react";
import "./index.css";
const BooksDashboard = React.lazy(() => import("./components/BooksDashboard"));
import BookDetail from "./components/BookDetail";
import BooksList from "./components/BooksList";
import Loader from "react-js-loader";
import { useUserBooks } from "./store/userBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const { book, lists } = useUserBooks((state) => ({
    book: state.book,
    lists: state.lists,
  }));

  return (
    <Container fluid className="ps-0">
      <Row>
        <Col xs={8} className="p-4 pt-0 grid-container">
          <Suspense
            fallback={
              <div className="center spinner">
                <Loader type="spinner-circle" className="spinner" />
              </div>
            }
          >
            <BooksDashboard book={book} />
          </Suspense>
        </Col>
        <Col
          xs={4}
          className="details-container d-flex justify-content-start flex-column ps-0 pt-5"
        >
          <Row className="mt-5">{book.title && <BookDetail />}</Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="pt-0 lists-container">
          <BooksList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
