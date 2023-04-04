import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import {
  DataGrid,
  GridRowSelectionModel,
  GridRowModel,
  GridValidRowModel,
} from '@mui/x-data-grid';

import { type Customer } from '@becks-interview-project/sdk';

import { columns } from './grid-col-defs';

import './App.css';

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
    fetchUser(1);
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

    fetch('http://localhost:8000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
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
