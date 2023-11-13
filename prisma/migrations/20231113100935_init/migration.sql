-- CreateEnum

CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateEnum

CREATE TYPE "ProductStatus" AS ENUM ('instock', 'outofstock');

-- CreateEnum

CREATE TYPE
    "OrderStatus" AS ENUM (
        'pending',
        'processing',
        'delivering',
        'completed',
        'cancelled'
    );

-- CreateEnum

CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'success', 'failed');

-- CreateEnum

CREATE TYPE
    "PaymentMethod" AS ENUM (
        'cod',
        'credit_card',
        'momo',
        'vnpay'
    );

-- CreateTable

CREATE TABLE
    "users" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "role" "UserRole" NOT NULL DEFAULT 'user',
        "address" TEXT,
        "imageId" TEXT,
        "status" TEXT NOT NULL DEFAULT 'active',
        "deleted" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),

CONSTRAINT "users_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "products" (
        "id" TEXT NOT NULL,
        "categoryId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "price" INTEGER NOT NULL,
        "description" TEXT NOT NULL,
        "condition" TEXT NOT NULL,
        "quantity" INTEGER NOT NULL,
        "status" "ProductStatus" NOT NULL DEFAULT 'instock',
        "deleted" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),
        "userId" TEXT,

CONSTRAINT "products_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "carts" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "productId" TEXT NOT NULL,
        "quantity" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),

CONSTRAINT "carts_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "product_ratings" (
        "id" TEXT NOT NULL,
        "productId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "rating" INTEGER NOT NULL,
        "comment" TEXT,
        "deleted" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),

CONSTRAINT "product_ratings_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "categories" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "deleted" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),

CONSTRAINT "categories_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "orders" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "status" "OrderStatus" NOT NULL DEFAULT 'pending',
        "deleted" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),
        "discountId" TEXT,

CONSTRAINT "orders_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "order_details" (
        "id" TEXT NOT NULL,
        "orderId" TEXT NOT NULL,
        "product_origin" JSONB NOT NULL,
        "deleted" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),

CONSTRAINT "order_details_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "payments" (
        "id" TEXT NOT NULL,
        "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'cod',
        "amount" INTEGER NOT NULL,
        "userId" TEXT NOT NULL,
        "orderId" TEXT NOT NULL,
        "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
        "deleted" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),

CONSTRAINT "payments_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "images" (
        "id" TEXT NOT NULL,
        "url" TEXT NOT NULL,
        "width" INTEGER NOT NULL,
        "height" INTEGER NOT NULL,
        "status" TEXT NOT NULL,
        "deleted" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3),
        "productId" TEXT,

CONSTRAINT "images_pkey" PRIMARY KEY ("id") );

-- CreateTable

CREATE TABLE
    "discounts" (
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

CONSTRAINT "discounts_pkey" PRIMARY KEY ("id") );

-- CreateIndex

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex

CREATE INDEX "users_id_email_idx" ON "users"("id", "email");

-- CreateIndex

CREATE INDEX "products_id_name_idx" ON "products"("id", "name");

-- CreateIndex

CREATE INDEX
    "carts_id_userId_productId_idx" ON "carts"("id", "userId", "productId");

-- CreateIndex

CREATE INDEX
    "product_ratings_id_productId_userId_idx" ON "product_ratings"("id", "productId", "userId");

-- CreateIndex

CREATE INDEX "categories_id_name_idx" ON "categories"("id", "name");

-- CreateIndex

CREATE INDEX "orders_id_userId_idx" ON "orders"("id", "userId");

-- CreateIndex

CREATE INDEX
    "order_details_id_orderId_idx" ON "order_details"("id", "orderId");

-- CreateIndex

CREATE UNIQUE INDEX "payments_userId_key" ON "payments"("userId");

-- CreateIndex

CREATE UNIQUE INDEX "payments_orderId_key" ON "payments"("orderId");

-- CreateIndex

CREATE INDEX
    "payments_id_userId_orderId_idx" ON "payments"("id", "userId", "orderId");

-- CreateIndex

CREATE INDEX "images_id_url_idx" ON "images"("id", "url");

-- CreateIndex

CREATE INDEX "discounts_id_code_idx" ON "discounts"("id", "code");

-- AddForeignKey

ALTER TABLE "users"
ADD
    CONSTRAINT "users_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE
SET NULL ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "products"
ADD
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "products"
ADD
    CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
SET NULL ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "carts"
ADD
    CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "carts"
ADD
    CONSTRAINT "carts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "product_ratings"
ADD
    CONSTRAINT "product_ratings_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "product_ratings"
ADD
    CONSTRAINT "product_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "orders"
ADD
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "orders"
ADD
    CONSTRAINT "orders_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "discounts"("id") ON DELETE
SET NULL ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "order_details"
ADD
    CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "payments"
ADD
    CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "payments"
ADD
    CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "images"
ADD
    CONSTRAINT "images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE
SET NULL ON UPDATE CASCADE;