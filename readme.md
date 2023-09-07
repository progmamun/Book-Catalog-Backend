## Book Catalog Backend

---

**User Sign Up**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/auth/signup (POST)

**User Login**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/auth/signin (POST)

**Get All Users → Only Allowed For Admin**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/users (GET)

**Get a Single User → Only Allowed For Admin**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/users/:id (GET)

**Update a Single User → Only Allowed For Admin**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/users/:id (PATCH)

**Delete a User → Only Allowed For Admin**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/users/:id ( DELETE)

#### Implement Create, Read, Update, and Delete Operations for Category Listing

**Create Category → Only Allowed For Admin**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/categories/create-category (POST)

**Get All Categories**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/categories (GET)

**Get a Single Category**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/categories/:id (GET)

**Update a Category → Only Allowed For Admin**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/categories/:id (PATCH)

**Delete a Category → Only Allowed For Admin**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/categories/:id ( DELETE)

#### Implement Create, Read, Update, and Delete Operations for Book listings.

**Create a New Book → Only Allowed For Admin**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/books/create-book (POST)

**Get All Books**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/books (GET)

**Get Books By CategoryId**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/books/:categoryId/category (GET)

**Get a Single Book**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/books/:id (GET)

**Update a Single Book → Only Allowed For Admin**

- Route: https://book-catalog-prisma-roan.vercel.app/api/v1/books/:id (PATCH)
