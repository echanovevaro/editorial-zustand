import { LazyLoadImage } from "react-lazy-load-image-component";
import { NotFound } from "../components/NotFound";
import { useUserBooks } from "../store/userBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import Searcher from "./Header";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { BOOKS, DEFAULT_GENRE, MAX_PAGES } from "../constants/globals";
import { removeAccents } from "../utils/utilFunctions";
import Pagination from "react-bootstrap/Pagination";

const ITEMS_PER_PAGE = 16;

export default function BooksDashboard() {
  // const [itemsPerRow, setItemsPerRow] = useState(0)
  const { setBookById } = useUserBooks((state) => ({
    setBookById: state.setBookById,
  }));
  const [genre, setGenre] = useState(DEFAULT_GENRE);
  const [pages, setPages] = useState(MAX_PAGES);
  const [searchInput, setSearchInput] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(BOOKS);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(filteredBooks.length / itemsPerPage)
  );
  const [booksPerPage, setBooksPerPage] = useState([]);

  const handleGenreSelect = (e) => {
    try {
      setGenre(e.target.value);
    } catch (error) {
      console.error("Error selecting genre:", error);
    }
  };

  const handlePageChange = (e) => {
    try {
      setPages(e.target.value);
    } catch (error) {
      console.error("Error changing pages:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    try {
      setSearchInput(e.target.value);
    } catch (error) {
      console.error("Error changing search input:", error);
    }
  };

  useLayoutEffect(() => {
    function updatePerPage() {
      const element = document.getElementById("grid");
      if (element) {
        const gridComputedStyle = window.getComputedStyle(element);
        const gridColumnCount = gridComputedStyle
          .getPropertyValue("grid-template-columns")
          .split(" ").length;
        setItemsPerPage(gridColumnCount);
        // console.log(gridColumnCount);
        // setItemsPerRow(gridColumnCount);
      }
    }
    window.addEventListener("resize", updatePerPage);
    updatePerPage();
    return () => window.removeEventListener("resize", updatePerPage);
    // window.addEventListener("resize", updatePerRow);
    // updatePerRow();
    // return () => window.removeEventListener("resize", updatePerRow);
  }, [itemsPerPage]);

  const handleClick = (ISBN) => {
    setBookById(ISBN);
  };

  useEffect(() => {
    const filterBooks = () => {
      const filtered = BOOKS.filter((b) => {
        if (
          (genre === DEFAULT_GENRE ||
            b.genre.toLowerCase().includes(genre.toLowerCase())) &&
          b.pages <= pages &&
          (searchInput < 3 ||
            removeAccents(b.title)
              .toLowerCase()
              .includes(removeAccents(searchInput).toLowerCase()))
        ) {
          return b;
        }
      });
      setFilteredBooks(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setActivePage(1);
      setBooksPerPage(filtered.slice(0, itemsPerPage));
    };
    filterBooks();
  }, [genre, pages, searchInput, itemsPerPage]);

  useEffect(() => {
    setBooksPerPage(
      filteredBooks.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
      )
    );
  }, [activePage, filteredBooks, itemsPerPage]);

  return (
    <main className="d-flex justify-content-center align-items-center text-white mt-5">
      <Col xs={10} className="mt-5 pt-2">
        <div className="d-flex justify-content-between align-items-center mt-5">
          <div className="mb-3">
            <h1 className="display-4 text-warning">Books AR</h1>
          </div>
          <div className="mb-3">
            <h1
              className="display-4 text-warning pointer"
              onClick={() =>
                window.scrollTo(0, window.document.body.scrollHeight)
              }
            >
              <FontAwesomeIcon icon={faList} />
            </h1>
          </div>
        </div>
        <Searcher
          filters={{ genre, pages, searchInput }}
          handlers={{
            handleGenreSelect,
            handlePageChange,
            handleSearchInputChange,
          }}
        />
        <ul className="container-dash" id="grid">
          {!filteredBooks?.length ? (
            <NotFound />
          ) : (
            booksPerPage?.map((b) => (
              <li
                key={b.ISBN}
                className={`selected-book border border-warning`}
                onClick={() => handleClick(b.ISBN)}
                // style={{
                // 	marginLeft: `${
                // 		((i + 1) % itemsPerRow !== 0 &&
                // 			Math.floor((i + 1) / itemsPerRow) % 2 !== 0) ||
                // 		((i + 1) % itemsPerRow === 0 &&
                // 			Math.floor((i + 1) / itemsPerRow) % 2 === 0)
                // 			? '20%'
                // 			: '0px'
                // 	}`,
                // 	marginRight: `${
                // 		((i + 1) % itemsPerRow !== 0 &&
                // 			Math.floor((i + 1) / itemsPerRow) % 2 !== 0) ||
                // 		((i + 1) % itemsPerRow === 0 &&
                // 			Math.floor((i + 1) / itemsPerRow) % 2 === 0)
                // 			? '-20%'
                // 			: '0px'
                // 	}`,
                // }}
              >
                <LazyLoadImage
                  src={b.cover}
                  alt={b.title}
                  loading="lazy"
                  // effect='blur'
                />
              </li>
            ))
          )}
        </ul>
        <Pagination className="mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === activePage}
              onClick={() => setActivePage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Col>
    </main>
  );
}
