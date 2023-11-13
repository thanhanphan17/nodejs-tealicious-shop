-- DROP DATABASE IF EXISTS tealicious_db;

-- CREATE DATABASE tealicious_db;

DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "products" CASCADE;
DROP TABLE IF EXISTS "product_ratings" CASCADE;
DROP TABLE IF EXISTS "categories" CASCADE;
DROP TABLE IF EXISTS "carts" CASCADE;
DROP TABLE IF EXISTS "orders" CASCADE;
DROP TABLE IF EXISTS "order_details" CASCADE;
DROP TABLE IF EXISTS "payments" CASCADE;
DROP TABLE IF EXISTS "images" CASCADE;
DROP TABLE IF EXISTS "discounts" CASCADE;


DROP TYPE IF EXISTS "UserRole";
DROP TYPE IF EXISTS "ProductStatus";
DROP TYPE IF EXISTS "OrderStatus";
DROP TYPE IF EXISTS "PaymentStatus";
DROP TYPE IF EXISTS "PaymentMethod";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('instock', 'outofstock');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'processing', 'delivering', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'success', 'failed');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cod', 'credit_card', 'momo', 'vnpay');


-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "address" TEXT,
    "avartarId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'instock',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_ratings" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "product_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "paymentId" TEXT,
    "discountId" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_details" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "product_origin" JSONB NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'cod',
    "amount" INTEGER NOT NULL,
    "userId" TEXT,
    "orderId" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "status" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "productId" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "max_uses" INTEGER NOT NULL DEFAULT 999,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "categoryId" TEXT,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_id_email_idx" ON "users"("id", "email");

-- CreateIndex
CREATE INDEX "products_id_name_idx" ON "products"("id", "name");

-- CreateIndex
CREATE INDEX "product_ratings_id_productId_userId_idx" ON "product_ratings"("id", "productId", "userId");

-- CreateIndex
CREATE INDEX "carts_id_userId_productId_idx" ON "carts"("id", "userId", "productId");

-- CreateIndex
CREATE INDEX "categories_id_name_idx" ON "categories"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "orders_paymentId_key" ON "orders"("paymentId");

-- CreateIndex
CREATE INDEX "orders_id_userId_idx" ON "orders"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "order_details_orderId_key" ON "order_details"("orderId");

-- CreateIndex
CREATE INDEX "order_details_id_orderId_idx" ON "order_details"("id", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_orderId_key" ON "payments"("orderId");

-- CreateIndex
CREATE INDEX "payments_id_userId_orderId_idx" ON "payments"("id", "userId", "orderId");

-- CreateIndex
CREATE INDEX "images_id_url_idx" ON "images"("id", "url");

-- CreateIndex
CREATE INDEX "discounts_id_code_idx" ON "discounts"("id", "code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avartarId_fkey" FOREIGN KEY ("avartarId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ratings" ADD CONSTRAINT "product_ratings_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ratings" ADD CONSTRAINT "product_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;


--
-- TOC entry 3446 (class 0 OID 16465)
-- Dependencies: 219
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, name, deleted, "createdAt", "updatedAt") VALUES ('729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4', 'Phong Vị Yên Trà', false, '2023-11-13 20:50:11.607', '2023-11-13 20:50:11.607') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, deleted, "createdAt", "updatedAt") VALUES ('8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7b7a', 'Hoa Cỏ Dưỡng Tâm', false, '2023-11-13 20:50:11.607', '2023-11-13 20:50:11.607') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, deleted, "createdAt", "updatedAt") VALUES ('8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bcb', 'Thảo Mộc Nhiệt Đới', false, '2023-11-13 20:50:11.607', '2023-11-13 20:50:11.607') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name, deleted, "createdAt", "updatedAt") VALUES ('8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb', 'Yên An Ngự Trà', false, '2023-11-13 20:50:11.607', '2023-11-13 20:50:11.607') ON CONFLICT DO NOTHING;


--
-- TOC entry 3443 (class 0 OID 16438)
-- Dependencies: 216
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (id, "categoryId", name, price, description, quantity, status, deleted, "createdAt", "updatedAt") VALUES ('c6dddee3-5b56-48d8-8648-a6770e02dd83', '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4', 'Liên Hoa Ngự Trà', 120000, 'Liên Hoa Ngự Trà', 10, 'instock', false, '2023-11-13 20:50:11.611', '2023-11-13 20:50:11.611') ON CONFLICT DO NOTHING;
INSERT INTO public.products (id, "categoryId", name, price, description, quantity, status, deleted, "createdAt", "updatedAt") VALUES ('75a47b13-3c3f-446e-910f-0f2de15a1f53', '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb', 'Gạo Lức Thất Tinh Hoa', 150000, 'Gạo Lức Thất Tinh Hoa', 10, 'instock', false, '2023-11-13 20:50:11.611', '2023-11-13 20:50:11.611') ON CONFLICT DO NOTHING;
INSERT INTO public.products (id, "categoryId", name, price, description, quantity, status, deleted, "createdAt", "updatedAt") VALUES ('328da900-e8e1-4fbb-a44c-b92e0b134c26', '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bcb', 'Hibiscus Cam Quế', 90000, 'Hibiscus Cam Quế', 10, 'instock', false, '2023-11-13 20:50:11.611', '2023-11-13 20:50:11.611') ON CONFLICT DO NOTHING;
INSERT INTO public.products (id, "categoryId", name, price, description, quantity, status, deleted, "createdAt", "updatedAt") VALUES ('83af4e16-ab06-4a77-9bd2-f63f78f6316e', '8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7b7a', 'Trà An Yên Ngủ Ngon', 200000, 'Trà An Yên Ngủ Ngon', 10, 'instock', false, '2023-11-13 20:50:11.611', '2023-11-13 20:50:11.611') ON CONFLICT DO NOTHING;


--
-- TOC entry 3450 (class 0 OID 16504)
-- Dependencies: 223
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.images (id, url, width, height, status, deleted, "createdAt", "updatedAt", "productId") VALUES ('729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4', 'https://i.imgur.com/7f6s1n4.png', 100, 100, NULL, false, '2023-11-13 20:50:11.594', '2023-11-13 20:50:11.594', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.images (id, url, width, height, status, deleted, "createdAt", "updatedAt", "productId") VALUES ('9ca710f0-4c11-411c-8aaf-78f545ed35af', 'https://i.imgur.com/7f6s1n4.png', 100, 100, NULL, false, '2023-11-13 20:50:11.594', '2023-11-13 20:50:11.594', NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 3442 (class 0 OID 16427)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, email, name, password, role, address, "avartarId", status, deleted, "createdAt", "updatedAt") VALUES ('729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4', 'ptan21@clc.fitus.edu.vn', 'ptan21', '$2a$10$FHaw3ck8yefN9Z.Gir5Om.a46BX9HGY4j5D2K3cauOQQvnjVqyqY2', 'admin', NULL, '729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4', 'active', false, '2023-11-13 20:50:11.601', '2023-11-13 20:50:11.601') ON CONFLICT DO NOTHING;
INSERT INTO public.users (id, email, name, password, role, address, "avartarId", status, deleted, "createdAt", "updatedAt") VALUES ('9ca710f0-4c11-411c-8aaf-78f545ed35af', 'phgb21@clc.fitus.edu.vn', 'phgb21', '$2a$10$FHaw3ck8yefN9Z.Gir5Om.a46BX9HGY4j5D2K3cauOQQvnjVqyqY2', 'admin', NULL, '9ca710f0-4c11-411c-8aaf-78f545ed35af', 'active', false, '2023-11-13 20:50:11.601', '2023-11-13 20:50:11.601') ON CONFLICT DO NOTHING;
INSERT INTO public.users (id, email, name, password, role, address, "avartarId", status, deleted, "createdAt", "updatedAt") VALUES ('0d3cd365-7cb6-4ead-a879-f71d919eb93d', 'user@example.com', 'user', '$2a$10$FHaw3ck8yefN9Z.Gir5Om.a46BX9HGY4j5D2K3cauOQQvnjVqyqY2', 'user', NULL, NULL, 'active', false, '2023-11-13 20:50:11.601', '2023-11-13 20:50:11.601') ON CONFLICT DO NOTHING;


--
-- TOC entry 3445 (class 0 OID 16457)
-- Dependencies: 218
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.carts (id, "userId", "productId", quantity, "createdAt", "updatedAt") VALUES ('28e78cd8-2134-496f-9001-810093ffd05d', '0d3cd365-7cb6-4ead-a879-f71d919eb93d', 'c6dddee3-5b56-48d8-8648-a6770e02dd83', 1, '2023-11-13 20:50:11.634', '2023-11-13 20:50:11.634') ON CONFLICT DO NOTHING;
INSERT INTO public.carts (id, "userId", "productId", quantity, "createdAt", "updatedAt") VALUES ('c73c4ab6-0975-48fb-bdd1-9de0db9432c1', '0d3cd365-7cb6-4ead-a879-f71d919eb93d', '75a47b13-3c3f-446e-910f-0f2de15a1f53', 1, '2023-11-13 20:50:11.634', '2023-11-13 20:50:11.634') ON CONFLICT DO NOTHING;
INSERT INTO public.carts (id, "userId", "productId", quantity, "createdAt", "updatedAt") VALUES ('c6864997-91dd-4628-b25c-5a3f1439dd20', '0d3cd365-7cb6-4ead-a879-f71d919eb93d', '83af4e16-ab06-4a77-9bd2-f63f78f6316e', 2, '2023-11-13 20:50:11.634', '2023-11-13 20:50:11.634') ON CONFLICT DO NOTHING;


--
-- TOC entry 3451 (class 0 OID 16513)
-- Dependencies: 224
-- Data for Name: discounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.discounts (id, code, percent, max_uses, start_at, end_at, deleted, "createdAt", "updatedAt", "categoryId") VALUES ('83af4e16-ab06-4a77-9bd2-f63f78f6316g', 'Discount 1', 10, 999, '2023-11-13 20:50:11.626', '2023-11-13 20:50:11.626', false, '2023-11-13 20:50:11.632', '2023-11-13 20:50:11.632', NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.discounts (id, code, percent, max_uses, start_at, end_at, deleted, "createdAt", "updatedAt", "categoryId") VALUES ('83af4e16-ab06-4a77-9bd2-f63f78f6316h', 'Discount 2', 20, 999, '2023-11-13 20:50:11.626', '2023-11-13 20:50:11.626', false, '2023-11-13 20:50:11.632', '2023-11-13 20:50:11.632', NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 3449 (class 0 OID 16493)
-- Dependencies: 222
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.payments (id, "paymentMethod", amount, "userId", "orderId", status, deleted, "createdAt", "updatedAt") VALUES ('83af4e16-ab06-4a77-9bd2-f63f78f631op', 'cod', 120000, '0d3cd365-7cb6-4ead-a879-f71d919eb93d', '83af4e16-ab06-4a77-9bd2-f63f78f6316g', 'pending', false, '2023-11-13 20:50:11.62', '2023-11-13 20:50:11.62') ON CONFLICT DO NOTHING;
INSERT INTO public.payments (id, "paymentMethod", amount, "userId", "orderId", status, deleted, "createdAt", "updatedAt") VALUES ('83af4e16-ab06-4a77-9bd2-f63f78f631fk', 'cod', 150000, '0d3cd365-7cb6-4ead-a879-f71d919eb93d', '83af4e16-ab06-4a77-9bd2-f63f78f6316h', 'pending', false, '2023-11-13 20:50:11.62', '2023-11-13 20:50:11.62') ON CONFLICT DO NOTHING;


--
-- TOC entry 3447 (class 0 OID 16474)
-- Dependencies: 220
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders (id, "userId", "shippingAddress", status, deleted, "createdAt", "updatedAt", "paymentId", "discountId") VALUES ('83af4e16-ab06-4a77-9bd2-f63f78f6316p', '0d3cd365-7cb6-4ead-a879-f71d919eb93d', '123/4/5', 'pending', false, '2023-11-13 20:50:11.617', '2023-11-13 20:50:11.617', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.orders (id, "userId", "shippingAddress", status, deleted, "createdAt", "updatedAt", "paymentId", "discountId") VALUES ('83af4e16-ab06-4a77-9bd2-f63f78f6316g', '0d3cd365-7cb6-4ead-a879-f71d919eb93d', '123/4/5', 'processing', false, '2023-11-13 20:50:11.617', '2023-11-13 20:50:11.617', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.orders (id, "userId", "shippingAddress", status, deleted, "createdAt", "updatedAt", "paymentId", "discountId") VALUES ('83af4e16-ab06-4a77-9bd2-f63f78f6316h', '0d3cd365-7cb6-4ead-a879-f71d919eb93d', '123/4/5', 'completed', false, '2023-11-13 20:50:11.617', '2023-11-13 20:50:11.617', NULL, NULL) ON CONFLICT DO NOTHING;
INSERT INTO public.orders (id, "userId", "shippingAddress", status, deleted, "createdAt", "updatedAt", "paymentId", "discountId") VALUES ('83af4e16-ab06-4a77-9bd2-f63f78f6316i', '0d3cd365-7cb6-4ead-a879-f71d919eb93d', '123/4/5', 'completed', false, '2023-11-13 20:50:11.617', '2023-11-13 20:50:11.617', NULL, NULL) ON CONFLICT DO NOTHING;


--
-- TOC entry 3448 (class 0 OID 16484)
-- Dependencies: 221
-- Data for Name: order_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.order_details (id, "orderId", product_origin, deleted, "createdAt", "updatedAt") VALUES ('1caa4c94-9d5e-4ed9-8ff4-287f84d97716', '83af4e16-ab06-4a77-9bd2-f63f78f6316p', '[{"price": 120000, "quantity": 1, "productId": "729e55ec-cdd5-40ba-8cbf-2452d5c8a5c4", "productName": "Product 1", "productImage": "https://i.imgur.com/7f6s1n4.png"}, {"price": 150000, "quantity": 1, "productId": "8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb", "productName": "Product 2", "productImage": "https://i.imgur.com/7f6s1n4.png"}, {"price": 90000, "quantity": 2, "productId": "8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bcb", "productName": "Product 3", "productImage": "https://i.imgur.com/7f6s1n4.png"}]', false, '2023-11-13 20:50:11.623', '2023-11-13 20:50:11.623') ON CONFLICT DO NOTHING;
INSERT INTO public.order_details (id, "orderId", product_origin, deleted, "createdAt", "updatedAt") VALUES ('47073666-7dce-4307-bde9-eb047cb1a7ec', '83af4e16-ab06-4a77-9bd2-f63f78f6316g', '[{"price": 90000, "quantity": 1, "productId": "8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bcb", "productName": "Product 1", "productImage": "https://i.imgur.com/7f6s1n4.png"}, {"price": 150000, "quantity": 1, "productId": "8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb", "productName": "Product 2", "productImage": "https://i.imgur.com/7f6s1n4.png"}]', false, '2023-11-13 20:50:11.623', '2023-11-13 20:50:11.623') ON CONFLICT DO NOTHING;
INSERT INTO public.order_details (id, "orderId", product_origin, deleted, "createdAt", "updatedAt") VALUES ('19820b40-f5ec-4414-b724-743eb39b78b4', '83af4e16-ab06-4a77-9bd2-f63f78f6316h', '[{"price": 150000, "quantity": 1, "productId": "8f6a8b9d-7b8c-4d7b-8b7b-7b7b7b7b7bdb", "productName": "Product 1", "productImage": "https://i.imgur.com/7f6s1n4.png"}]', false, '2023-11-13 20:50:11.623', '2023-11-13 20:50:11.623') ON CONFLICT DO NOTHING;


--
-- TOC entry 3444 (class 0 OID 16448)
-- Dependencies: 217
-- Data for Name: product_ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product_ratings (id, "productId", "userId", rating, comment, deleted, "createdAt", "updatedAt") VALUES ('c6dddee3-5b56-48d8-8648-a6770e02dd83', 'c6dddee3-5b56-48d8-8648-a6770e02dd83', '0d3cd365-7cb6-4ead-a879-f71d919eb93d', 5, 'Good', false, '2023-11-13 20:50:11.615', '2023-11-13 20:50:11.615') ON CONFLICT DO NOTHING;
INSERT INTO public.product_ratings (id, "productId", "userId", rating, comment, deleted, "createdAt", "updatedAt") VALUES ('75a47b13-3c3f-446e-910f-0f2de15a1f53', '75a47b13-3c3f-446e-910f-0f2de15a1f53', '0d3cd365-7cb6-4ead-a879-f71d919eb93d', 4, 'Good', false, '2023-11-13 20:50:11.615', '2023-11-13 20:50:11.615') ON CONFLICT DO NOTHING;

