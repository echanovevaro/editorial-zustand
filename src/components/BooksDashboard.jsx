import { LazyLoadImage } from "react-lazy-load-image-component"
import { NotFound } from "../components/NotFound"
import { useUserBooks } from "../store/userBooks"
import "bootstrap/dist/css/bootstrap.min.css"
import Searcher from "./Header"
import { Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
  faList,
} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useLayoutEffect, useState } from "react"
import { BOOKS, DEFAULT_GENRE, MAX_PAGES } from "../constants/globals"
import { removeAccents } from "../utils/utilFunctions"
import Pagination from "react-bootstrap/Pagination"
import { motion } from "framer-motion"

const ITEMS_PER_PAGE = 16

export default function BooksDashboard({ onShowDetails, visibleLists }) {
  // const [itemsPerRow, setItemsPerRow] = useState(0)
  const { setBookById, lists } = useUserBooks((state) => ({
    setBookById: state.setBookById,
    lists: state.lists,
  }))
  const [genre, setGenre] = useState(DEFAULT_GENRE)
  const [pages, setPages] = useState(MAX_PAGES)
  const [searchInput, setSearchInput] = useState("")
  const [filteredBooks, setFilteredBooks] = useState(BOOKS)
  const [activePage, setActivePage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE)
  const [totalPages, setTotalPages] = useState(
    Math.ceil(filteredBooks.length / itemsPerPage)
  )
  const [booksPerPage, setBooksPerPage] = useState([])

  const slideLeft = () => {
    let slider = document.getElementById("slider")
    slider.scrollLeft -= 500
  }

  const slideRight = () => {
    let slider = document.getElementById("slider")
    slider.scrollLeft += 500
  }

  const handleGenreSelect = (e) => {
    try {
      setGenre(e.target.value)
    } catch (error) {
      console.error("Error selecting genre:", error)
    }
  }

  const handlePageChange = (e) => {
    try {
      setPages(e.target.value)
    } catch (error) {
      console.error("Error changing pages:", error)
    }
  }

  const handleSearchInputChange = (e) => {
    try {
      setSearchInput(e.target.value)
    } catch (error) {
      console.error("Error changing search input:", error)
    }
  }

  useLayoutEffect(() => {
    function updatePerPage() {
      const element = document.getElementById("grid")
      if (element) {
        const gridComputedStyle = window.getComputedStyle(element)
        const gridColumnCount = gridComputedStyle
          .getPropertyValue("grid-template-columns")
          .split(" ").length
        setItemsPerPage(gridColumnCount)
        // console.log(gridColumnCount);
        // setItemsPerRow(gridColumnCount);
      }
    }
    window.addEventListener("resize", updatePerPage)
    updatePerPage()
    return () => window.removeEventListener("resize", updatePerPage)
    // window.addEventListener("resize", updatePerRow);
    // updatePerRow();
    // return () => window.removeEventListener("resize", updatePerRow);
  }, [itemsPerPage])

  const handleClick = (ISBN) => {
    setBookById(ISBN)
    onShowDetails()
  }

  useEffect(() => {
    const filterBooks = () => {
      const filtered = BOOKS.filter((b) => {
        if (
          !lists.some((l) => l.books.some((book) => book.ISBN === b.ISBN)) &&
          (genre === DEFAULT_GENRE ||
            b.genre.toLowerCase().includes(genre.toLowerCase())) &&
          b.pages <= pages &&
          (searchInput < 3 ||
            removeAccents(b.title)
              .toLowerCase()
              .includes(removeAccents(searchInput).toLowerCase()))
        ) {
          return b
        }
      })
      setFilteredBooks(filtered)
      setTotalPages(Math.ceil(filtered.length / itemsPerPage))
      setActivePage(1)
      setBooksPerPage(filtered.slice(0, itemsPerPage))
    }
    filterBooks()
  }, [genre, pages, searchInput, itemsPerPage, lists])

  useEffect(() => {
    setBooksPerPage(
      filteredBooks.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
      )
    )
  }, [activePage, filteredBooks, itemsPerPage])

  return (
    <motion.main
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="d-flex justify-content-center align-items-center text-white mt-5"
    >
      <Col
        xs={10}
        className="mt-5 pt-2"
      >
        <div className="d-flex justify-content-between align-items-end mt-5">
          <div className="mb-3">
            <h1 className="display-4 text-warning">Books AR</h1>
          </div>
          <div className="mb-3">
            <motion.h1
              whileHover={{ scale: 1.5 }}
              transition={{ type: "spring", stiffness: 500 }}
              className={`display-4 text-warning pointer ${
                visibleLists ? "d-none" : "d-block"
              }`}
              onClick={() =>
                window.scrollTo(0, window.document.body.scrollHeight)
              }
            >
              <FontAwesomeIcon icon={faList} />
            </motion.h1>
            <h4
              className={`d-block d-lg-none text-warning font-light ${
                visibleLists ? "d-inline" : "d-none"
              }`}
            >
              Your book&apos;s lists
            </h4>
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
        {!filteredBooks?.length && <NotFound />}
        {filteredBooks?.length > 0 && (
          <>
            <ul
              className="container-dash d-none d-lg-grid"
              id="grid"
            >
              {booksPerPage?.map((b) => (
                <motion.li
                  whileHover={{ scale: 1.2, grayscale: 0, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 200 }}
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
                </motion.li>
              ))}
            </ul>
            <div className="relative flex items-center d-flex d-lg-none">
              <motion.div
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-warning cursor-pointer ms-1 opacity-50 hover:opacity-100 arrow-left"
                  onClick={slideLeft}
                />
              </motion.div>
              <div
                id="slider"
                className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth"
              >
                {filteredBooks?.map((b) => (
                  <div
                    key={b.ISBN}
                    className=" inline-block p-2"
                  >
                    <motion.div
                      className="border border-warning"
                      whileHover={{ scale: 1.05, grayscale: 0, zIndex: 10 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img
                        src={b.cover}
                        alt={b.title}
                        onClick={() => handleClick(b.ISBN)}
                        className="grayscale w-[100px] h-[150px] object-cover inline-block cursor-pointer hover:grayscale-0"
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="arrow-right text-warning cursor-pointer ms-1 opacity-50 hover:opacity-100"
                  onClick={slideRight}
                />
              </motion.div>
            </div>
            <Pagination className="d-none d-lg-flex mt-4">
              {[...Array(totalPages)].map((_, i) => (
                <motion.li
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  key={i}
                  className={`page-link ${i + 1 === activePage && `active`} `}
                  onClick={() => setActivePage(i + 1)}
                >
                  {i + 1}
                </motion.li>
              ))}
            </Pagination>
          </>
        )}
      </Col>
    </motion.main>
  )
}
