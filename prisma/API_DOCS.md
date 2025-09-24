# API Documentation

## tRPC Endpoints

### `hello`
- **Method:** GET
- **Input:** `{ name?: string }`
- **Output:** `{ greeting: string }`
- **Description:** Returns a greeting message.


### `post` (CRUD operations)

#### `post.list`
- **Method:** GET
- **Input:** none
- **Output:** `Post[]` (with author relation)
- **Description:** List all posts, newest first.

#### `post.get`
- **Method:** GET
- **Input:** `{ id: string }` (cuid)
- **Output:** `Post` (with author relation)
- **Description:** Get a post by ID. Throws if not found.

#### `post.create`
- **Method:** POST
- **Input:** `{ title: string, body: string, authorId?: string }`
- **Output:** `Post`
- **Description:** Create a new post. Validates input. Optionally links to author.

#### `post.update`
- **Method:** PATCH
- **Input:** `{ id: string, title?: string, body?: string }`
- **Output:** `Post`
- **Description:** Update a post by ID. Validates input. Throws if not found.

#### `post.delete`
- **Method:** DELETE
- **Input:** `{ id: string }`
- **Output:** `Post`
- **Description:** Delete a post by ID. Throws if not found.

---

## Post Model
| Field     | Type    | Description         |
|-----------|---------|---------------------|
| id        | String  | Unique identifier   |
| title     | String  | Post title          |
| body      | String  | Post content/body   |
| createdAt | Date    | Creation timestamp  |
| updatedAt | Date    | Last update         |
| authorId  | String? | User ID (optional)  |
| author    | User?   | Author relation     |

---

## Planned tRPC Procedures for Post
- `post.list` — List all posts
- `post.get` — Get a post by ID
- `post.create` — Create a new post
- `post.update` — Update a post
- `post.delete` — Delete a post

## Authentication
- NextAuth.js with GitHub/Google providers
- Session info available via `useSession()` in React

---

## Notes
- All endpoints are type-safe via tRPC.
- Add more details as you expand the API.
