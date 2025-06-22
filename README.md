<div align="center">

# 📚 Library Management API

</div>

A robust RESTful API for managing books and borrowings in a library, built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**. It includes advanced features such as aggregation pipelines, schema validation, filtering, sorting, and more.

---

## Features

- **Book Management** (CRUD)
- **Borrow System** with availability validation
-  **Filtering & Sorting** of books
-  **Borrow Summary** using MongoDB aggregation
-  **Schema validations & error handling**
-  **Instance method** for `Book` model (`decreaseCopies`)
-  **Mongoose Middleware** usage
-  **Environment-based configuration** (`.env`)
-  Modular structure following best practices

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Dev Tools**: Nodemon, ts-node-dev, dotenv

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file at the root with the following:

```env
PORT=5000
DB_USERNAME=yourMongoUsername
DB_PASSWORD=yourMongoPassword
DB_NAME=yourDatabaseName
```

### 4. Run the Server

```bash
npm run dev
```

---

## 📌 API Endpoints

### 🔹 1. Create Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

---

### 🔹 2. Get All Books (Filter, Sort, Limit)

**GET** `/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`


---

### 🔹 3. Get Book by ID

**GET** `/api/books/:bookId`

```json
{
    "success": true,
    "message": "Book retrieved successfuly",
    "data": {
        "_id": "6857c3dffef2fa6891354835",
        "title": "Fahim",
        "author": "Yuval Noah Harari",
        "genre": "NON_FICTION",
        "isbn": "9780062316110",
        "description": "Explores the history and impact of Homo sapiens.",
        "copies": 10,
        "available": true,
        "createdAt": "2025-06-22T08:50:39.015Z",
        "updatedAt": "2025-06-22T09:08:00.695Z"
    }
}
```

---

### 🔹 4. Update Book

**PUT** `/api/books/:bookId`

#### Input Data

```json
{ "copies": 50 }
```

#### Output Response

```json
{
    "success": true,
    "message": "Book updated successfuly",
    "data": {
        "_id": "6857c3dffef2fa6891354835",
        "title": "Fahim",
        "author": "Yuval Noah Harari",
        "genre": "NON_FICTION",
        "isbn": "9780062316110",
        "description": "Explores the history and impact of Homo sapiens.",
        "copies": 6,
        "available": true,
        "createdAt": "2025-06-22T08:50:39.015Z",
        "updatedAt": "2025-06-22T09:08:00.695Z"
    }
}
```

---

### 🔹 5. Delete Book

**DELETE** `/api/books/:bookId`

---

### 🔹 6. Borrow Book

**POST** `/api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### Output Response

```json
{
    "success": true,
    "message": "Book borrowed successfully",
    "data": {
        "book": "64ab3f9e2a4b5c6d7e8f9012",
        "quantity": 1,
        "dueDate": "2025-07-18T00:00:00.000Z",
        "_id": "68580bb68df2449e0728bafd",
        "createdAt": "2025-06-22T13:57:10.709Z",
        "updatedAt": "2025-06-22T13:57:10.709Z"
    }
}
```
---

### 🔹 7. Borrow Summary (Aggregation)

**GET** `/api/borrow`

#### Output Response

```json
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "totalQuantity": 1,
            "book": {
                "title": "The Theory of Everything",
                "isbn": "9780553380163"
            }
        },
        {
            "totalQuantity": 8,
            "book": {
                "title": "Fahim",
                "isbn": "9780062316110"
            }
        }
    ]
}
```

Returns total quantity borrowed per book with title & ISBN.

---

## 🧠 Business Logic Highlights

* ✅ Validates available copies before borrowing
* 🧠 Automatically deducts borrowed quantity from stock
* 🚫 Marks book unavailable when copies reach 0
* 🔎 Aggregates borrow data to show summary
* 🧼 Global error handler with custom response format

---

## 🔍 Sample Error Response

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

## 📁 Folder Structure

```
root/
    ├── dist/
    ├── node_modules/
    ├── src/
        ├── app/
            ├── controllers/
            ├── interfaces/
            ├── middlewares/
            ├── models/
        ├── app.ts
        ├── server.ts
    ├── .vercel/
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── vercel.json
```

---

## 📽️ Demo & Submission

* 🔗 **GitHub Repository**: [Link Here](#)
* 🌐 **Live API Deployment**: [https://ph-level2-b5-assignment-3-cxgy.vercel.app/k](https://ph-level2-b5-assignment-3-cxgy.vercel.app/)

---

## ✅ Author

**Name :** Md Irfan Chowdhury <br>
**Email** irfanchowdhury80@gmail.com.com <br>
**LinkedIn** : https://linkedin.com/in/your-profile <br>

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

