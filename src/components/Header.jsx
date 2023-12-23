import { Form, InputGroup } from "react-bootstrap"
import { DEFAULT_GENRE, GENRES, MAX_PAGES } from "../constants/globals"
import "bootstrap/dist/css/bootstrap.min.css"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function Searcher({ filters, handlers }) {
  const { genre, pages, searchInput } = filters
  const { handleGenreSelect, handlePageChange, handleSearchInputChange } =
    handlers

  return (
    <>
      <header className="header-container mt-4">
        <form
          action="#"
          className="header-form"
        >
          <ul>
            <li
              id="search"
              className="search-books"
            >
              <div className="searcher mb-0 pb-0">
                <InputGroup>
                  <Form.Control
                    size="lg"
                    type="search"
                    required
                    minLength="4"
                    placeholder="Search title..."
                    onChange={(e) => handleSearchInputChange(e)}
                    value={searchInput}
                    name="search"
                  />
                  <InputGroup.Text className="text-warning pe-0">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="search-icon"
                    />
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </li>

            <li>
              <div className="select">
                <Form.Select
                  value={genre}
                  onChange={(e) => handleGenreSelect(e)}
                  name="genre"
                >
                  <option
                    className="customValue"
                    value={DEFAULT_GENRE}
                  >
                    {DEFAULT_GENRE}
                  </option>
                  {GENRES?.map((g) => {
                    return (
                      <option
                        className="customValue"
                        key={g}
                        value={g}
                      >
                        {g}
                      </option>
                    )
                  })}
                </Form.Select>
              </div>
            </li>
            <li>
              <div className="flex flex-row justify-stretch align-center">
                <span className="range-value">Pages {pages}</span>
                <Form.Range
                  className="input-range"
                  onChange={(e) => handlePageChange(e)}
                  value={pages}
                  min="0"
                  max={MAX_PAGES}
                  step="1"
                />
              </div>
            </li>
          </ul>
        </form>
      </header>
    </>
  )
}
