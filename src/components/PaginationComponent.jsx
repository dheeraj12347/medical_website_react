import { Box, Pagination, Typography } from '@mui/material';

// This wrapper keeps pagination styling and range text consistent.
function PaginationComponent({ count, page, rowsPerPage, totalItems, onChange }) {
  const startItem = totalItems === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endItem = Math.min(page * rowsPerPage, totalItems);

  return (
    <Box
      sx={{
        alignItems: { xs: 'stretch', sm: 'center' },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        justifyContent: 'space-between',
        py: 2,
      }}
    >
      <Typography color="text.secondary" variant="body2">
        Showing {startItem}-{endItem} of {totalItems} patients
      </Typography>
      <Pagination
        color="primary"
        count={count}
        page={page}
        onChange={(_, nextPage) => onChange(nextPage)}
      />
    </Box>
  );
}

export default PaginationComponent;
