const fs = require('fs');
const path = require('path');

const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

const client = new Client(config);

function readSeedApiResponse(type) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, `./becks-api/${type}.json`)));
};

// Run sql migration file
const runMigration = async () => {
  const query = fs.readFileSync(path.join(__dirname, '../migrations/v0.1.sql')).toString();

  await client.query(query);
}

// Seed db with seed.sql
const runSeed = async () => {
  const query = fs.readFileSync(path.join(__dirname, './seed.sql')).toString();

  await client.query(query);
}

// Seed db with API product data
const seedApiData = async () => {
  const corn = readSeedApiResponse('corn');
  const soybeans = readSeedApiResponse('soybeans');
  const wheat = readSeedApiResponse('wheat');

  const techTypeMap = new Map();

  const seeds = [...corn, ...soybeans, ...wheat];

  const products = [];

  for (seed of seeds) {
    const stock = Math.floor(Math.random() * 1000) + 100;

    const product = {
      buyerId: 1,
      familyId: seed.family.ID,
      techTypeId: seed.techType,
      name: seed.brand,
      maturity: seed.info.maturity,
      tagline: seed.info.tagline,
      yearReleased: seed.info.yearReleased,
      strengths: seed.info.strengths,
      bullets: {
        first: seed.info.bullet1,
        second: seed.info.bullet2,
        third: seed.info.bullet3,
      },
      stock,
    }

    products.push(product);

    const techType = seed.techType;

    if (!techTypeMap.get(techType)) {
      techTypeMap.set(techType, techType);
    }
  }

  // Generate values for tech type insertion query
  const techTypeValues = Array.from(techTypeMap.values()).reduce(
    (acc, curr, i) => {
      if (i === 0) {
        return acc += `('${curr}')`;
      }

      return acc += `\n,('${curr}')`;
    },
    ''
  );

  const insertTechTypesQuery = `
  INSERT INTO tech_type
    ("name")
  VALUES
    ${techTypeValues}
  RETURNING id, name
  ;
  `;

  const techTypeRes = await client.query(insertTechTypesQuery);

  const techTypeIdMap = techTypeRes.rows.reduce(
    (acc, curr) => {
      return { ...acc, [curr.name]: curr.id };
    },
    {}
  );

  const insertProductQuery = `
    INSERT INTO product
      ("buyerId", "familyId", "techTypeId", "name", "maturity", "tagline", "yearReleased", "strengths", "bullets", "stock")
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ;
  `

  for (const product of products) {
    const { buyerId, familyId, techTypeId, name, maturity, tagline, yearReleased, strengths, bullets, stock} = product;
  
    await client.query(insertProductQuery, [buyerId, familyId, techTypeIdMap[techTypeId], name, maturity, tagline, yearReleased, strengths, bullets, stock]);
  }

}

const migrateAndSeed = async () => {
  await client.connect();
  
  // Run migrations
  await runMigration();
  
  // Run seed.sql
  await runSeed();

  // Seed product data from becks API 
  await seedApiData();

  await client.end();
};

migrateAndSeed();

