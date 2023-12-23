import "./index.css"
import BooksDashboard from "./components/BooksDashboard"
import BookDetail from "./components/BookDetail"
import BooksList from "./components/BooksList"
import { useUserBooks } from "./store/userBooks"
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Modal from "./UI/Modal"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"

function App() {
  const refDashboard = useRef(null)
  const refLists = useRef(null)
  const [visibleLists, setVisibleLists] = useState(false)
  const [visibleDashboard, setVisibleDashboard] = useState(false)

  const { setShowDetails, showDetails } = useUserBooks((state) => ({
    setShowDetails: state.setShowDetails,
    showDetails: state.showDetails,
  }))

  const handleShowDetail = () => {
    setShowDetails(true)
  }

  useEffect(() => {
    const observerDashboard = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        console.log(entry)
        setVisibleDashboard(entry.isIntersecting)
      },
      { root: null, rootMargin: "0px", threshold: 0.9 }
    )
    if (refDashboard.current) observerDashboard.observe(refDashboard.current)

    const observerLists = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setVisibleLists(entry.isIntersecting)
      },
      { root: null, rootMargin: "0px", threshold: 0.9 }
    )
    if (refLists.current) observerLists.observe(refLists.current)
  }, [visibleLists, visibleDashboard])

  return (
    <>
      <AnimatePresence>
        {showDetails && (
          <Modal onClose={() => setShowDetails(false)}>
            <BookDetail />
          </Modal>
        )}
      </AnimatePresence>
      <Container
        fluid
        className="p-0 m-0"
      >
        <Row>
          <Col
            xs={12}
            className="p-5 pt-0 grid-container"
            ref={refDashboard}
          >
            <BooksDashboard
              onShowDetails={handleShowDetail}
              visibleLists={visibleLists}
            />
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
            ref={refLists}
          >
            <BooksList
              onShowDetails={handleShowDetail}
              visibleDashboard={visibleDashboard}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
