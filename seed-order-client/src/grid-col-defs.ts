import {
  type GridColDef,
  type GridValueSetterParams,
  type GridValueGetterParams,
} from '@mui/x-data-grid';

import { FAMILY_TYPE, TECH_TYPE } from './constants';

const familyValueGetter = (params: any) => {
  const familyId = params.row.familyId;

  return FAMILY_TYPE[+familyId];
};

// value getter for the tech type column
const techTypeValueGetter = (params: any) => {
  const techType = params.row.techTypeId;

  return TECH_TYPE[+techType];
};

/**
 * Column defintions for seed order grid
 */
export const columns: GridColDef[] = [
  {
    field: 'qty',
    headerName: 'Quantity',
    width: 100,
    editable: true,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.quantity;
    },
    valueSetter: (params: GridValueSetterParams) => {
      return { ...params.row, quantity: +params.value };
    },
  },
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'familyId',
    headerName: 'Family',
    width: 150,
    valueGetter: familyValueGetter,
  },
  { field: 'maturity', headerName: 'Maturity', width: 125 },
  {
    field: 'techTypeId',
    headerName: 'Tech Type',
    width: 125,
    valueGetter: techTypeValueGetter,
  },
  { field: 'yearReleased', headerName: 'Release Date', width: 150 },
  { field: 'tagline', headerName: 'Tagline', width: 300 },
  { field: 'stock', headerName: 'Stock', width: 100 },
];
