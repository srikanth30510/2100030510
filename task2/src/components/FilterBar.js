
import React from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const FilterBar = ({ filters, setFilters, onApply }) => (
    <div>
        <TextField
            label="Category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            select
        >
         
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem>
       
        </TextField>
        <TextField
            label="Company"
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
            select
        >
            <MenuItem value="AMZ">Amazon</MenuItem>
            <MenuItem value="FLP">Flipkart</MenuItem>
           
        </TextField>
        <TextField
            label="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            type="number"
        />
        <TextField
            label="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            type="number"
        />
        <Button variant="contained" onClick={onApply}>Apply Filters</Button>
    </div>
);

export default FilterBar;
