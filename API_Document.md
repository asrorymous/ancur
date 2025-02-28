# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### 1. Get All Users

**Endpoint:** `/users`
**Method:** GET
**Description:** Mengambil daftar semua user
**Response:**

```json
[
  {
    "_id": "ObjectId",
    "username": "Player1",
    "level": 1,
    "energy": 100,
    "gold": 500,
    "cards": []
  }
]
```

### 2. Get User by ID

**Endpoint:** `/users/:id`
**Method:** GET
**Description:** Mengambil detail user berdasarkan ID

### 3. Create User

**Endpoint:** `/users`
**Method:** POST
**Description:** Membuat user baru
**Request Body:**

```json
{
  "username": "Player1"
}
```

### 4. Update User

**Endpoint:** `/users/:id`
**Method:** PUT
**Description:** Memperbarui data user

### 5. Delete User

**Endpoint:** `/users/:id`
**Method:** DELETE
**Description:** Menghapus user

---

Silakan tambahkan API lain sesuai kebutuhan!
