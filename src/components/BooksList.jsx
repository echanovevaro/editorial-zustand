// import { useEffect } from "react";
import { useUserBooks } from "../store/userBooks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Col } from "react-bootstrap"
import { useEffect } from "react"
import { motion } from "framer-motion"

let listsLengths

useUserBooks.subscribe((state, prevState) => {
  listsLengths = state.lists.map((val, idx) => ({
    curr: val.books.length,
    prev: prevState.lists[idx].books.length,
  }))
})

export default function BooksList({ onShowDetails, visibleDashboard }) {
  const { setBookById, lists } = useUserBooks((state) => ({
    setBookById: state.setBookById,
    lists: state.lists,
  }))

  useEffect(() => {
    if (listsLengths && listsLengths.some((val) => val.curr && !val.prev)) {
      window.scrollTo(0, window.document.body.scrollHeight)
    }
  })

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Col xs={10}>
        <ul className="mb-5">
          {/* <h1 className="display-6 mt-2 pt-5 text-white">YOUR LISTS</h1> */}
          {lists &&
            lists?.map(
              (list) =>
                list.books.length > 0 && (
                  <li key={list.id}>
                    <div className="d-flex justify-content-start align-items-center g-1 mb-0 mt-3">
                      <h6 className="display-6">{list.title}&nbsp;</h6>
                      <motion.h6
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 500 }}
                        className={`pointer ${
                          visibleDashboard ? "d-none" : "d-inline"
                        }`}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          variant="link"
                        />
                      </motion.h6>
                    </div>
                    <ul className="container-dash">
                      {list.books?.map((b) => (
                        <motion.li
                          whileHover={{ scale: 1.2, zIndex: 10 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          key={b.ISBN}
                          className="selected-book border border-warning"
                          onClick={() => {
                            setBookById(b.ISBN)
                            onShowDetails()
                          }}
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
                  </li>
                )
            )}
        </ul>
        <div className="text-dark display-6 pt-5">
          <span>
            <FontAwesomeIcon icon={faInstagram} />
          </span>
          {` `}
          <span>
            <FontAwesomeIcon icon={faXTwitter} />
          </span>
          {` `}
          <span>
            <FontAwesomeIcon icon={faLinkedin} />
          </span>
        </div>
      </Col>
    </div>
  )
}
