import { getDb } from './entities/execute-query';
import { getAllProducts } from './entities/product/product.service';

async function run() {
  const db = getDb();

  console.log(db);

  const res = await getAllProducts();

  console.log(res);
}

run();
