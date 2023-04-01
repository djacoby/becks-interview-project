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

const getSeedApiResponse = (type) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, `./becks-api/${type}.json`)));
};

const runSeed = async () => {
  // Run migrations

  // Run seed.sql

  // Seed tech type data from becks API

  // Seed product data from becks API 
  const corn = getSeedApiResponse('corn');
  const soybeans = getSeedApiResponse('soybeans');
  const wheat = getSeedApiResponse('wheat');

  const techTypeMap = new Map();

  const seeds = [...corn, ...soybeans, ...wheat];

  const products = [];

  for (seed of seeds) {
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
      }
    }

    products.push(product);
    const techType = seed.techType;

    if (!techTypeMap.get(techType)) {
      techTypeMap.set(techType, techType);
    }
  }

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
  `
  await client.connect();

  const techTypeRes = await client.query(insertTechTypesQuery);
  
  // console.log(techTypeRes.rows);

  const techTypeIdMap = techTypeRes.rows.reduce(
    (acc, curr) => {
      return { ...acc, [curr.name]: curr.id };
    },
    {}
  );

  const insertProductQuery = `
    INSERT INTO product
      ("buyerId", "familyId", "techTypeId", "name", "maturity", "tagline", "yearReleased", "strengths", "bullets")
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ;
  `

  let insertProms = [];

  for (const product of products) {
    const { buyerId, familyId, techTypeId, name, maturity, tagline, yearReleased, strengths, bullets} = product;
  
    await client.query(insertProductQuery, [buyerId, familyId, techTypeIdMap[techTypeId], name, maturity, tagline, yearReleased, strengths, bullets]);
  }

  await client.end();
};

runSeed();

