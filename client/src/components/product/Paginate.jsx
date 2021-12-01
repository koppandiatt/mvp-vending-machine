import { Col, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_SIZE } from "../../constants/pageSize";
import {
  fetchProducts,
  productState,
  setCurrentPage,
} from "../../slices/product/productSlice";

const Paginate = (props) => {
  const dispatch = useDispatch();
  const product = useSelector(productState);

  const { currentPage, totalPages, choosePage } = product;

  const disableFirst = currentPage === 1;
  const disableLast = currentPage === totalPages;

  const changeCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(
      fetchProducts({
        page: page,
        limit: PAGE_SIZE,
        search: product.searchQuery,
      })
    );
  };

  return (
    <Row className="mt-3">
      <Col>
        <Pagination {...props}>
          <Pagination.Prev
            onClick={() => changeCurrentPage(currentPage - 1)}
            disabled={disableFirst}
          />

          <Pagination.Item
            onClick={() => changeCurrentPage(1)}
            active={currentPage === 1}
          >
            {1}
          </Pagination.Item>

          {totalPages > 4 && currentPage > 3 && (
            <Pagination.Ellipsis disabled />
          )}

          {totalPages > 3 && currentPage > 3 && (
            <Pagination.Item onClick={() => changeCurrentPage(currentPage - 2)}>
              {currentPage - 2}
            </Pagination.Item>
          )}

          {currentPage > 2 && (
            <Pagination.Item onClick={() => changeCurrentPage(currentPage - 1)}>
              {currentPage - 1}
            </Pagination.Item>
          )}

          {currentPage > 1 && currentPage < totalPages && (
            <Pagination.Item
              active={currentPage > 1}
              onClick={() => changeCurrentPage(currentPage)}
            >
              {currentPage}
            </Pagination.Item>
          )}

          {currentPage < totalPages - 1 && (
            <Pagination.Item onClick={() => changeCurrentPage(currentPage + 1)}>
              {currentPage + 1}
            </Pagination.Item>
          )}

          {totalPages > 3 && currentPage < totalPages - 2 && (
            <Pagination.Item onClick={() => choosePage(currentPage + 2)}>
              {currentPage + 2}
            </Pagination.Item>
          )}

          {currentPage < totalPages - 3 && <Pagination.Ellipsis disabled />}

          <Pagination.Item
            onClick={() => changeCurrentPage(totalPages)}
            active={currentPage === totalPages}
          >
            {totalPages}
          </Pagination.Item>

          <Pagination.Next
            onClick={() => changeCurrentPage(currentPage + 1)}
            disabled={disableLast}
          />
        </Pagination>
      </Col>
    </Row>
  );
};

export default Paginate;
