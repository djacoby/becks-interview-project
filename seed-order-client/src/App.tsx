import { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValueSetterParams,
  GridRowSelectionModel,
  GridValueGetterParams,
  GridRowModel,
  GridValidRowModel,
} from '@mui/x-data-grid';

import { type Customer } from '@becks-interview-project/sdk';

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
  {
    field: 'qty',
    headerName: 'Quantity',
    width: 150,
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
  { field: 'maturity', headerName: 'Maturity', width: 150 },
  {
    field: 'techTypeId',
    headerName: 'Tech Type',
    width: 150,
    valueGetter: techTypeValueGetter,
  },
  { field: 'yearReleased', headerName: 'Release Date', width: 150 },
  { field: 'tagline', headerName: 'Tagline', width: 400 },
  { field: 'stock', headerName: 'Stock', width: 100 },
];

function App() {
  const [products, updateProducts] = useState<GridValidRowModel[]>([]);
  const [user, updateUser] = useState<Customer>();

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    // fetch products from the server
    const fetchProducts = async () => {
      const data = await (await fetch('http://localhost:8000/product')).json();

      // set state when the data received
      const products = data.map((product: any) => {
        return {
          ...product,
          quantity: 0,
        };
      });

      updateProducts(products);
    };

    // fetch products from the server
    const fetchUser = async (id: number) => {
      const data = await (
        await fetch(`http://localhost:8000/customer/1`)
      ).json();

      // set state when the data received
      updateUser(data);
    };

    fetchProducts();

    if (!user) {
      fetchUser(1);
    }
  }, []);

  const handleCreateOrder = () => {
    const selectedProducts = products.reduce(
      (acc: GridValidRowModel[], curr: GridRowModel) => {
        if (rowSelectionModel.includes(curr.id) && curr.quantity > 0) {
          const { id, quantity } = curr;

          return [...acc, { productId: id, quantity }];
        }

        return acc;
      },
      [],
    );

    const order = {
      customerId: user?.id,
      products: selectedProducts,
    };

    console.log(order);

    fetch('http://localhost:8000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    }).then((res) => console.log(res));
  };

  const handleUpdateRow = (newRow: GridRowModel) => {
    updateProducts((prevProducts) => {
      return prevProducts.map((product) => {
        return product.id === newRow.id ? { ...newRow } : product;
      });
    });

    return newRow;
  };

  return (
    <div className="parent">
      <h1 className="center">Seed Order Portal</h1>
      <Button
        variant="contained"
        onClick={handleCreateOrder}
      >
        Create Order
      </Button>
      {
        // only render the data grid when the products are loaded
        products && (
          <DataGrid
            className="table"
            rows={products}
            columns={columns}
            disableRowSelectionOnClick
            checkboxSelection
            processRowUpdate={handleUpdateRow}
            onRowSelectionModelChange={(id) => {
              setRowSelectionModel(id);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        )
      }
    </div>
  );
}

export default App;
