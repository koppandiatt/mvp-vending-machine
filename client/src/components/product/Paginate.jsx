import { Col, Pagination, Row } from "react-bootstrap";

const Paginate = ({ currentPage, totalPages, choosePage, ...props }) => {
  const disableFirst = currentPage === 1;
  const disableLast = currentPage === totalPages;

  return (
    <Row className="mt-3">
      <Col>
        <Pagination {...props}>
          <Pagination.Prev
            onClick={() => choosePage(currentPage - 1)}
            disabled={disableFirst}
          />

          <Pagination.Item
            onClick={() => choosePage(1)}
            active={currentPage === 1}
          >
            {1}
          </Pagination.Item>

          {totalPages > 4 && currentPage > 3 && (
            <Pagination.Ellipsis disabled />
          )}

          {totalPages > 3 && currentPage > 3 && (
            <Pagination.Item onClick={() => choosePage(currentPage - 2)}>
              {currentPage - 2}
            </Pagination.Item>
          )}

          {currentPage > 2 && (
            <Pagination.Item onClick={() => choosePage(currentPage - 1)}>
              {currentPage - 1}
            </Pagination.Item>
          )}

          {currentPage > 1 && currentPage < totalPages && (
            <Pagination.Item
              active={currentPage > 1}
              onClick={() => choosePage(currentPage)}
            >
              {currentPage}
            </Pagination.Item>
          )}

          {currentPage < totalPages - 1 && (
            <Pagination.Item onClick={() => choosePage(currentPage + 1)}>
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
            onClick={() => choosePage(totalPages)}
            active={currentPage === totalPages}
          >
            {totalPages}
          </Pagination.Item>

          <Pagination.Next
            onClick={() => choosePage(currentPage + 1)}
            disabled={disableLast}
          />
        </Pagination>
      </Col>
    </Row>
  );
};

export default Paginate;
