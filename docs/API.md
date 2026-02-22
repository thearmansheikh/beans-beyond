# Beans & Beyond — API Reference

Base URL: `http://localhost:5000/api`

All authenticated endpoints require: `Authorization: Bearer <token>`

---

## Auth

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/auth/register` | No | `{name, email, password}` | Register new user |
| POST | `/auth/login` | No | `{email, password}` | Login, returns JWT |
| GET | `/auth/me` | Yes | — | Get current user |

---

## Menu

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/menu` | No | All available items. Query: `?category=coffee&vegetarian=true&search=latte` |
| GET | `/menu/:id` | No | Single menu item |
| POST | `/menu` | Admin | Create item |
| PUT | `/menu/:id` | Admin | Update item |
| DELETE | `/menu/:id` | Admin | Delete item |

### Menu Item Shape
```json
{
  "_id": "string",
  "name": "Flat White",
  "description": "Two ristretto shots...",
  "category": "coffee",
  "price": 3.50,
  "imageUrl": "/images/menu/flat-white.jpg",
  "dietaryInfo": {
    "vegetarian": true,
    "vegan": false,
    "glutenFree": true,
    "allergens": ["dairy"]
  },
  "available": true,
  "popular": true
}
```

---

## Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/orders` | No (guest OK) | Create order |
| GET | `/orders` | Yes | My orders (admin sees all) |
| GET | `/orders/:id` | Yes | Single order |
| PUT | `/orders/:id/status` | Admin | Update order status |
| DELETE | `/orders/:id` | Yes | Cancel order |

### Order Statuses
`received` → `preparing` → `ready` → `delivered`
Can be set to `cancelled` at any point before `preparing`.

---

## Contact

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/contact` | No | `{name, email, subject, message}` | Submit contact form |

---

## Health Check

```
GET /api/health
→ { "status": "ok", "timestamp": "..." }
```
