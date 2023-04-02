CREATE TABLE department (
  "id" SERIAL,
  "name" VARCHAR(32) NOT NULL,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "deleted" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT deptartment_pkey PRIMARY KEY(id)
);

CREATE TABLE employee (
  "id" SERIAL,
  "departmentId" SMALLINT REFERENCES department(id) ON DELETE CASCADE NOT NULL,
  "name" VARCHAR(128) NOT NULL,
  "email" VARCHAR(128) UNIQUE NOT NULL,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "deleted" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT employee_pkey PRIMARY KEY(id)
);
CREATE INDEX "employee_departmentId_fkey" ON employee ("departmentId");

CREATE TABLE family (
  "id" SERIAL,
  "name" VARCHAR(128) UNIQUE NOT NULL,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "deleted" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT family_pkey PRIMARY KEY(id)
);

CREATE TABLE tech_type (
  "id" SERIAL,
  "name" VARCHAR(128) UNIQUE NOT NULL,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "deleted" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT tech_type_pkey PRIMARY KEY(id)
);


CREATE TABLE product (
  "id" SERIAL,
  "buyerId" SMALLINT REFERENCES employee(id) ON DELETE CASCADE NOT NULL,
  "familyId" SMALLINT REFERENCES family(id) ON DELETE CASCADE NOT NULL,
  "techTypeId" SMALLINT REFERENCES tech_type(id) ON DELETE CASCADE NOT NULL,
  "name" VARCHAR(128) NOT NULL,
  "maturity" VARCHAR(32),
  "tagline" VARCHAR(128),
  "yearReleased" VARCHAR(32),
  "strengths" TEXT NOT NULL,
  "bullets" JSONB NOT NULL,
  "stock" SMALLINT NOT NULL,
  "minimumStock" SMALLINT NOT NULL DEFAULT 100,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "deleted" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT product_pkey PRIMARY KEY(id)
);
CREATE INDEX "product_buyerId_fkey" ON product ("buyerId");
CREATE INDEX "product_familyId_fkey" ON product ("familyId");
CREATE INDEX "product_techTypeId_fkey" ON product ("techTypeId");

CREATE TABLE customer (
  "id" SERIAL,
  "name" VARCHAR(128) NOT NULL,
  "organization" VARCHAR(128) NOT NULL,
  "email" VARCHAR(128) UNIQUE NOT NULL,
  "addressLine" VARCHAR(128) NOT NULL,
  "city" VARCHAR(64) NOT NULL,
  "state" VARCHAR(2) NOT NULL,
  "zip" VARCHAR(5) NOT NULL,
  "country" VARCHAR(64) NOT NULL,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "deleted" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT customer_pkey PRIMARY KEY(id)
);

CREATE TABLE seed_order (
  "id" SERIAL,
  "customerId" SMALLINT REFERENCES customer(id) ON DELETE CASCADE NOT NULL,
  "completed" BOOLEAN NOT NULL DEFAULT FALSE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "deleted" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT order_pkey PRIMARY KEY(id)
);
CREATE INDEX "order_customerId_fkey" ON seed_order ("customerId");

CREATE TABLE order_details (
  "id" SERIAL,
  "orderId" SMALLINT REFERENCES seed_order(id) ON DELETE CASCADE NOT NULL,
  "productId" SMALLINT REFERENCES product(id) ON DELETE CASCADE NOT NULL,
  "quantity" SMALLINT NOT NULL,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "deleted" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT order_details_pkey PRIMARY KEY(id)
);
CREATE INDEX "order_details_orderId_fkey" ON order_details ("orderId");
CREATE INDEX "order_details_productId_fkey" ON order_details ("productId");
