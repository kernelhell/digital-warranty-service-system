# Digital Warranty & Service Record System

A mini project that lets a business register **customers**, register **products** they
bought (with automatically-calculated warranty expiry), and log **service records**
against each product — with a live "Under Warranty / Expired" status.

## Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Backend    | Node.js + Express.js                 |
| ORM        | Sequelize                            |
| Database   | MySQL 8                              |
| Frontend   | EJS templates + plain CSS            |
| Container  | Docker & Docker Compose              |

## Features

- Add/view/delete **customers**
- Register **products** under a customer with purchase date & warranty period (auto-calculates expiry date)
- Log **service records** (issue, resolution, technician, cost, status) per product
- Warranty status badge (Under Warranty / Expired) computed automatically
- Dashboard with quick counts and quick actions

## Project Structure

```
digital-warranty-service-system/
├── Dockerfile
├── docker-compose.yml
├── .env
├── package.json
├── server.js
├── config/
│   └── db.js
├── models/
│   ├── Customer.js
│   ├── Product.js
│   └── ServiceRecord.js
├── controllers/
│   ├── customerController.js
│   ├── productController.js
│   └── serviceController.js
├── routes/
│   ├── customerRoutes.js
│   ├── productRoutes.js
│   └── serviceRoutes.js
├── views/            (EJS templates)
└── public/css/style.css
```

---

## Option A — Run with Docker (recommended, easiest)

This spins up **both** the Node app and a MySQL database automatically. You only need
Docker Desktop installed — not Node or MySQL locally.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and make sure it's running.
2. Open a terminal (cmd, PowerShell, or VS Code's integrated terminal) in the project folder:
   ```bash
   cd digital-warranty-service-system
   ```
3. Build and start the containers:
   ```bash
   docker compose up --build
   ```
   (older Docker versions: `docker-compose up --build`)
4. Wait until you see:
   ```
   Digital Warranty & Service Record System running at http://localhost:3000
   ```
5. Open your browser at **http://localhost:3000**

To stop:
```bash
docker compose down
```
To stop AND wipe the database data:
```bash
docker compose down -v
```

**Useful Docker commands**
```bash
docker compose ps                 # see running containers
docker compose logs -f app        # view app logs live
docker exec -it warranty_db mysql -u warranty_user -p warranty_db   # open MySQL shell (password: warranty_pass)
```

---

## Option B — Run locally without Docker (cmd / VS Code)

Use this if you want to run the Node app directly and just use Docker for the database only,
or if you have MySQL installed locally.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later) — installs `npm` too
- MySQL Server running locally **OR** run only the DB in Docker (see step 2b)
- VS Code (optional, any editor/terminal works)

### 2a. Use local MySQL
- Create a database named `warranty_db` in your local MySQL.
- Edit `.env` and set:
  ```
  DB_HOST=localhost
  DB_PORT=3306
  DB_NAME=warranty_db
  DB_USER=<your_mysql_user>
  DB_PASS=<your_mysql_password>
  ```

### 2b. OR run only MySQL via Docker (app runs locally)
```bash
docker run --name warranty_db -e MYSQL_ROOT_PASSWORD=root_pass -e MYSQL_DATABASE=warranty_db -e MYSQL_USER=warranty_user -e MYSQL_PASSWORD=warranty_pass -p 3306:3306 -d mysql:8.0
```
Then in `.env` set `DB_HOST=localhost`.

### 3. Install dependencies
```bash
cd digital-warranty-service-system
npm install
```

### 4. Run the app
```bash
npm start
```
or, for auto-restart during development:
```bash
npm run dev
```

### 5. Open the app
Go to **http://localhost:3000** in your browser.

### Running/Debugging in VS Code
1. Open the project folder in VS Code (`File > Open Folder`).
2. Open the integrated terminal (`` Ctrl+` ``) and run `npm install` then `npm start`.
3. (Optional) Install the **ESLint** and **Docker** VS Code extensions for a smoother experience.
4. To debug: set breakpoints in any `.js` file, then use VS Code's **Run and Debug** panel
   with a Node.js configuration pointing to `server.js`.

---

## How Warranty Expiry Works

`warrantyExpiry` is a virtual (computed) field:

```
warrantyExpiry = purchaseDate + warrantyPeriodMonths
```

The system compares this date to today's date to display **Under Warranty** or **Expired**.

## API Route Summary

| Method | Route                | Description                     |
|--------|----------------------|----------------------------------|
| GET    | `/`                   | Dashboard                       |
| GET    | `/customers`          | List customers                  |
| POST   | `/customers`          | Add a customer                  |
| GET    | `/customers/:id`      | Customer detail + their products|
| DELETE | `/customers/:id`      | Delete a customer                |
| GET    | `/products`           | List products                   |
| GET    | `/products/new`       | Add-product form                |
| POST   | `/products`           | Register a product              |
| GET    | `/products/:id`       | Product detail + service history|
| DELETE | `/products/:id`       | Delete a product                 |
| GET    | `/services`           | List service records            |
| GET    | `/services/new`       | Log-service form                |
| POST   | `/services`           | Save a service record           |
| DELETE | `/services/:id`       | Delete a service record          |

## Possible Extensions (for viva / report)

- Login/authentication for staff
- Upload invoice/photo as proof of purchase
- Email/SMS reminders before warranty expiry
- Export service history as PDF
- Search & filter customers/products
- REST API + separate React/Angular frontend

---
Made as a mini project demonstrating full-stack CRUD, relational data modeling, and containerization with Docker.
