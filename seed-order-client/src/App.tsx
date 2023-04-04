import { useState, useEffect } from 'react';

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridColumnHeaderParams,
} from '@mui/x-data-grid';

import { FAMILY_TYPE, TECH_TYPE } from './constants';

import './App.css';

// value getter for the family column
const familyValueGetter = (params: any) => {
  const familyId = params.row.familyId;

  return FAMILY_TYPE[+familyId];
};

// value getter for the tech type column
const techTypeValueGetter = (params: any) => {
  const techType = params.row.techTypeId;

  return TECH_TYPE[+techType];
};

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'familyId',
    headerName: 'Family',
    width: 150,
    valueGetter: familyValueGetter,
  },
  { field: 'maturity', headerName: 'Maturity', width: 150 },
  {
    field: 'techTypeId',
    headerName: 'Tech Type',
    width: 150,
    valueGetter: techTypeValueGetter,
  },
  { field: 'yearReleased', headerName: 'Release Date', width: 150 },
  { field: 'tagline', headerName: 'Tagline', width: 250 },
  { field: 'stock', headerName: 'Stock', width: 50 },
];

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

function App() {
  const [products, updateProducts] = useState<GridRowsProp>();

  useEffect(() => {
    // fetch products from the server
    const fetchProducts = async () => {
      const data = await (await fetch('http://localhost:8000/product')).json();

      // set state when the data received
      updateProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="parent">
      <h1>Seed Order Portal</h1>
      {
        // only render the data grid when the products are loaded
        products && (
          <DataGrid
            rows={products}
            columns={columns}
          />
        )
      }
    </div>
  );
}

export default App;
