import React from "react";
import { DETAILS_OF_LISTS } from "../constants/globals";
import { useUserBooks } from "../store/userBooks";
import { Col, Row, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function BookDetail() {
  const { book, listIdFromBookId, toggleBook } = useUserBooks((state) => ({
    book: state.book,
    listIdFromBookId: state.listIdFromBookId,
    toggleBook: state.toggleBook,
  }));
  const { cover, title, ISBN, author, synopsis, genre, pages, year } = book;
  const listId = listIdFromBookId(book.ISBN);

  return (
    <>
      <div className="pt-5 mt-0 mb-5 detail-card">
        <Row className="pt-5 mt-0 d-flex justify-content-center align-items-center">
          <Col
            xs={10}
            md={7}
            className="details pt-4 ps-4 pe-4 border border-warning border-bottom-0"
          >
            <LazyLoadImage
              src={cover}
              alt={title}
              loading="lazy"
              // effect='blur'
              style={{ borderRadius: "2px" }}
            />
            <a className="stretched-link" />
            <div className="overlay d-none text-secondary p-4 ms-4 me-4">
              <h2>{title}</h2>
              <p className="mb-1">ISBN: {ISBN}</p>
              <p className="mb-1">Author: {author?.name}</p>
              <p className="mb-1">Genre: {genre}</p>
              <p className="mb-1">Pages: {pages}</p>
              <p className="mb-1">Year: {year}</p>
              <p className="mb-1">{synopsis}</p>
            </div>
          </Col>
          <Col
            xs={10}
            md={7}
            className="details text-white pb-4 ps-4 pe-4 border border-warning border-top-0"
          >
            <div className="mt-2 d-flex flex-column gap-1">
              {DETAILS_OF_LISTS.map((list) => {
                return (
                  <Button
                    key={list.id}
                    size="lg"
                    onClick={() => {
                      toggleBook(list.id);
                    }}
                    variant={listId == list.id ? "warning" : "outline-warning"}
                  >
                    {listId == list.id ? (
                      <span>
                        <FontAwesomeIcon icon={faXmark} />{" "}
                        {` books ${list.title}`}
                      </span>
                    ) : (
                      <span>
                        <FontAwesomeIcon icon={faPlus} />{" "}
                        {` books ${list.title}`}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
