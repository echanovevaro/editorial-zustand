import { Form } from "react-bootstrap";
import { DEFAULT_GENRE, GENRES, MAX_PAGES } from "../constants/globals";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Searcher({ filters, handlers }) {
  const { genre, pages, searchInput } = filters;
  const { handleGenreSelect, handlePageChange, handleSearchInputChange } =
    handlers;

  return (
    <>
      <header className="header-container mt-4">
        <form action="#" className="header-form">
          <ul>
            <li id="search" className="search-books">
              <div className="searcher mb-0 pb-0">
                <input
                  type="search"
                  required
                  minLength="4"
                  placeholder="Search..."
                  onChange={(e) => handleSearchInputChange(e)}
                  value={searchInput}
                  name="search"
                />
              </div>
            </li>

            <li>
              <div className="select">
                <Form.Select
                  value={genre}
                  onChange={(e) => handleGenreSelect(e)}
                  name="genre"
                >
                  <option className="customValue" value={DEFAULT_GENRE}>
                    {DEFAULT_GENRE}
                  </option>
                  {GENRES?.map((g) => {
                    return (
                      <option className="customValue" key={g} value={g}>
                        {g}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </li>
            <li>
              <div className="range-slider">
                <input
                  className="input-range"
                  type="range"
                  onChange={(e) => handlePageChange(e)}
                  value={pages}
                  min="0"
                  max={MAX_PAGES}
                  step="1"
                />
                <span className="range-value">PAGES {pages}</span>
              </div>
            </li>
          </ul>
        </form>
      </header>
    </>
  );
}
