Everything in this document is work well in Ubuntu 23.04 (my local desktop) and Ubuntu 22.04 (my server run in AWS).

The live demo version: https://yentraquan.shop/

### I. Install Make and Docker

-   1. Install make (for run Makefile with predefined commands)

    -   Linux

    ```js
        sudo apt install make
    ```

    -   Mac OS

    ```js
        brew install make
    ```

-   Window

    -   Install Chocolatey first (if it's not already installed)

    ```
        Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    ```

    -   Install Make

    ```js
        choco install make
    ```

-   2. Install Docker
       Download at: https://www.docker.com/

### II. Run with Docker Compose

<b style="color:purple">You have the option to run without Docker below.</b>

#### Step 1: Setup the User Acceptance Testing Environment

-   While you have the option to use other environments, for convenient testing, it is recommended to use this environment. It <a style="color:red">requires only a single command</a> to bring everything up.

-   This environment is designed for running user acceptance testing. The hosts for Postgres and MongoDB are specified by the container's name (not the IP address). The configuration file is located at <a style="color:red">env/uat.env</a>.

```js
APP_PORT=8080

MG_DB_HOST=mongo-db
MG_DB_PORT=27017
MG_DB_NAME=tealicious_db
MG_DB_USER=tealicious_shop
MG_DB_PASSWORD=tealicious_shop

PG_DB_HOST=postgres
PG_DB_PORT="5432"
PG_DB_NAME="tealicious_db"
PG_DB_USER="postgres"
PG_DB_PASSWORD="0000"
PG_DATABASE_URL="postgresql://${PG_DB_USER}:${PG_DB_PASSWORD}@${PG_DB_HOST}:${PG_DB_PORT}/${PG_DB_NAME}?schema=public"


API_URL=https://yentraquan.shop

VNP_TMN_CODE=
VNP_HASH_SECRET=
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_API=https://sandbox.vnpayment.vn/merchant_webapi/api/transaction
VNP_RETURN_URL=http://localhost:8080/api/payment/vnpay_return
```

#### Step 2: Run Docker Compose with one command

-   Ensure no Docker containers are running on ports `8080`, `80`, `5432` and `27017`.
-   Ensure no Docker containers named `postgres`, `mongo-db` and `tealicious-shop` are running.
-   With just a single command, everything will be ready to use. Note that during the initial run, it may take some time to download all the dependencies and images.

```
    make uat_up
```

I discovered that <a style="color:red">Windows users</a> (only Windows) can pass environment variables through the command line as Linux and MacOS. Therefore, you can execute the following command in `PowerShell` in case you use <a style="color:red">Windows</a> to run the application:

```
    $env:MODE='uat'; docker compose -f docker-compose-uat.yml up -d
```

After the application is running, you can access it at: <a style="color:red">http://localhost</a> (run in port 80)

To remove the application and images, run:

```
    make uat_down
```

### III. Run without Docker (not suggested)

#### Step 1: Install packages and dependencies

-   1. Install package

```js
    npm install
```

-   2. Install dotenv-cli

```js
    npm install -g dotenv-cli
```

#### Step 2: Start Database in Docker by using Make

This command will start Postgres and MongoDB in Docker automatically.

```
    make init_db
```

If you want to remove it just run

```
    make rm_db
```

#### Step 3: Step local environment variables

**Local Environment Configuration:**

The `local.env` file, located in the `env` folder, has already been created. This file contains all the necessary environment variables required to run the application.

```js
APP_PORT=8080

MG_DB_HOST=localhost
MG_DB_PORT=27017
MG_DB_NAME=tealicious_db
MG_DB_USER=tealicious_shop
MG_DB_PASSWORD=tealicious_shop

PG_DB_HOST=localhost
PG_DB_PORT="5432"
PG_DB_NAME="tealicious_db"
PG_DB_USER="postgres"
PG_DB_PASSWORD="0000"
PG_DATABASE_URL="postgresql://${PG_DB_USER}:${PG_DB_PASSWORD}@${PG_DB_HOST}:${PG_DB_PORT}/${PG_DB_NAME}?schema=public"

API_URL=https://yentraquan.shop

VNP_TMN_CODE=
VNP_HASH_SECRET=
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_API=https://sandbox.vnpayment.vn/merchant_webapi/api/transaction
VNP_RETURN_URL=http://localhost:8080/api/payment/vnpay_return
```

**<b style="color:red">I also have a file named `prod.env` containing the same structure, but it is connected to my server informaton, so I have already removed it already.</b>**

#### Step 4: Migrating and Seeding Database

When the database is ready, run the following command to migrate the database:

-   1. Migrate the database

    ```js
        make db_migrate env=local
    ```

    You can run it with `env=prod` or `env=uat` if you want to migrate the production or user acceptance testing database.

-   2. Seed the database
    ```js
        make db_seed env=local
    ```

#### Step 5: Build and Run the Application

-   1. Build the application
    ```js
        npm run build
    ```
-   2.  Run the application:

    -   2.1. Run in production mode

    ```js
        make start env=local
    ```

    -   2.2. Run in debug mode (you dont need to build at step 5.1)
        ```js
            make run env=local
        ```

You can run it with `env=prod` or `env=uat` if you want to run the production or user acceptance testing application.

After the application is running, you can access it at: <a style="color:red">http://localhost:8080</a> (run in port 8080)
