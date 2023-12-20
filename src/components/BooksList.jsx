import { useEffect } from "react";
import { useUserBooks } from "../store/userBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col } from "react-bootstrap";

let listsLengths;

useUserBooks.subscribe((state, prevState) => {
  listsLengths = state.lists.map((val, idx) => ({
    curr: val.books.length,
    prev: prevState.lists[idx].books.length,
  }));
});

export default function BooksList() {
  const { setBookById, lists } = useUserBooks((state) => ({
    setBookById: state.setBookById,
    lists: state.lists,
  }));

  useEffect(() => {
    if (listsLengths && listsLengths.some((val) => val.curr && !val.prev)) {
      window.scrollTo(0, window.document.body.scrollHeight);
    }
  }, [listsLengths]);

  return (
    <div className="d-flex justify-content-center align-items-center text-white">
      <Col xs={11} className="ps-2 pe-2">
        <ul className="mb-5">
          <h1 className="display-6 mt-2 pt-5 text-white">YOUR LISTS</h1>
          {lists &&
            lists?.map(
              (list) =>
                list.books.length > 0 && (
                  <li key={list.id}>
                    <div className="d-flex justify-content-start align-items-center g-1 mb-0 mt-3 text-warning">
                      <h6 className="display-6">{list.title}&nbsp;</h6>

                      <FontAwesomeIcon
                        className="pointer"
                        icon={faArrowUp}
                        variant="link"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      />
                    </div>
                    <ul className="container-dash">
                      {list.books?.map((b) => (
                        <li
                          key={b.ISBN}
                          className="selected-book border border-warning"
                          onClick={() => {
                            setBookById(b.ISBN);
                          }}
                        >
                          <LazyLoadImage
                            src={b.cover}
                            alt={b.title}
                            loading="lazy"
                            // effect='blur'
                          />
                        </li>
                      ))}
                    </ul>
                  </li>
                )
            )}
        </ul>
      </Col>
    </div>
  );
}
