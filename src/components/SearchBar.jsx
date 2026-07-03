import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

// Controlled inputs receive their value and change handler from a parent.
function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      label="Search patients"
      placeholder="Search by name, disease, doctor, or status"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
