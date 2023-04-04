-- Temporarily disable triggers to allow for foreign key insertion before they're created during transaction
BEGIN;
ALTER TABLE employee DISABLE TRIGGER ALL;

INSERT INTO department
 ("name")
VALUES
 ('procurement')
 ,('sales')
 ,('marketing')
 ,('human resources')
;

INSERT INTO employee
 ("departmentId", "name", "email")
VALUES
 (1, 'David Jacoby', 'djacoby@bulkseedsuplier.com')
 ,(2, 'Harold Hankins', 'hhankins@bulkseedsuplier.com')
 ,(3, 'Carol Evans', 'cevans@bulkseedsuplier.com')
 ,(4, 'John Beckley', 'jbeckley@bulkseedsuplier.com')
;

INSERT INTO family
 ("name")
VALUES
 ('Corn')
 ,('Soybeans')
 ,('Wheat')
;

INSERT INTO customer
  ("name", "organization", "email", "addressLine", "city", "state", "zip", "country")
VALUES
  ('John Ayers', 'Ayers Farms', 'john@ayersfarms.com', '14651 Citrus Rd', 'Malvern', 'OH', '44644', 'USA')
;
-- Re-enable triggers
ALTER TABLE employee ENABLE TRIGGER ALL;
COMMIT;