# Learniee Parent Dashboard

A full-stack parent dashboard built as a take-home assignment for Learniee. The application allows parents to create an account, securely log in, explore courses, and find suitable courses for their child using search, filters, sorting, and pagination.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Application Architecture](#application-architecture)
- [Data Storage](#data-storage)
- [Course Search API](#course-search-api)
- [Authentication Flow](#authentication-flow)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [What I Would Improve](#what-i-would-improve)
- [Assignment Assumptions](#assignment-assumptions)

## Overview

Learniee Parent Dashboard is designed for parents who want to discover and compare learning courses for their children.

The application focuses on:

- A real authentication flow
- A polished and responsive parent dashboard
- Course discovery
- Combinable course filters
- Sorting
- Pagination
- Clean handling of loading, errors, and no-result states

## Features

### Authentication

- Parent sign-up
- Parent login
- Password hashing with bcrypt
- Auth.js credentials authentication
- Persistent authenticated sessions
- Protected `/dashboard` route
- Logout functionality
- Logged-in parent's name and email displayed on the dashboard

### Course Search

Parents can search courses by:

- Course name
- Subject

### Filters

Multiple filters can be combined:

- Grade
- Subject
- Minimum price
- Maximum price
- Minimum teacher rating

### Sorting

Courses can be sorted by:

- Newest
- Price: Low to High
- Price: High to Low
- Highest Rated

### Pagination

- 6 courses per page
- Previous/Next navigation
- Page number navigation
- Total result count
- Current page information

### User Experience

- Responsive layout
- Loading skeletons
- Error state with retry option
- Clean no-results state
- Clear filters functionality
- Responsive navigation
- Modern UI built with Tailwind CSS

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| React | Frontend UI |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling and responsive UI |
| Auth.js | Authentication and sessions |
| Prisma 7 | Database ORM |
| PostgreSQL | Persistent data storage |
| Neon | Hosted PostgreSQL database |
| bcryptjs | Password hashing |
| Vercel | Deployment |

## Application Architecture

```text
                         Learniee Parent Dashboard
                                    |
                              Next.js 16
                                    |
                 +------------------+------------------+
                 |                                     |
           Authentication                         Course Search
                 |                                     |
              Auth.js                              API Route
                 |                                     |
              Prisma                                Prisma
                 |                                     |
                 +------------------+------------------+
                                    |
                              PostgreSQL
                                 Neon
```

### Course Search Flow

```text
Parent
  |
  | Search / Filters / Sorting / Pagination
  v
GET /api/courses
  |
  v
Next.js API Route
  |
  v
Prisma Query
  |
  v
PostgreSQL
  |
  v
Filtered + Sorted + Paginated Results
  |
  v
Course Cards
```

Filtering, sorting, and pagination are handled at the API/database layer rather than downloading the complete course dataset to the browser.

## Data Storage

The application uses PostgreSQL hosted on Neon for persistent storage.

Prisma is used as the ORM.

### User Model

Stores parent account information.

| Field | Example |
|---|---|
| id | `cme123abc` |
| name | `Chinmay Takke` |
| email | `parent@example.com` |
| password | `bcrypt hashed password` |
| createdAt | `2026-08-17` |

### Course Model

Stores course information.

| Field | Example |
|---|---|
| id | `course-001` |
| name | `Python Programming` |
| description | `Learn Python fundamentals through practical examples.` |
| subject | `Computer Science` |
| grade | `Grade 9` |
| price | `2499` |
| teacherName | `Aditya Kulkarni` |
| teacherRating | `4.9` |

The database is seeded with 30 sample courses covering different grades, subjects, prices, and teacher ratings.

## Course Search API

### Endpoint

```http
GET /api/courses
```

### Query Parameters

| Parameter | Description |
|---|---|
| `search` | Searches course name or subject |
| `grade` | Filters by grade |
| `subject` | Filters by subject |
| `minPrice` | Minimum course price |
| `maxPrice` | Maximum course price |
| `minRating` | Minimum teacher rating |
| `sort` | Sorting option |
| `page` | Page number |
| `limit` | Number of courses per page |

### Example Request

```http
GET /api/courses?search=math&grade=Grade%208&minRating=4.5&sort=price_asc&page=1&limit=6
```

This demonstrates that search, grade, rating, sorting, and pagination can be applied together.

## Authentication Flow

Authentication is implemented using Auth.js with a credentials provider.

```text
Sign Up
   |
   v
Password hashed using bcrypt
   |
   v
User stored in PostgreSQL
   |
   v
Login
   |
   v
Credentials verified
   |
   v
Authenticated session
   |
   v
Protected Dashboard
```

Unauthenticated users attempting to access `/dashboard` are redirected to `/login`.

## Project Structure

```text
learniee-parent-dashboard/
|
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── courses/
│   |
│   ├── components/
│   │   ├── CourseSearch.tsx
│   │   └── LogoutButton.tsx
│   |
│   ├── dashboard/
│   │   └── page.tsx
│   |
│   ├── login/
│   │   └── page.tsx
│   |
│   ├── signup/
│   │   └── page.tsx
│   |
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
|
├── lib/
│   └── prisma.ts
|
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
|
├── auth.ts
├── prisma.config.ts
├── package.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/learniee-parent-dashboard.git
cd learniee-parent-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
DATABASE_URL="your-postgresql-connection-string"
AUTH_SECRET="your-auth-secret"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Seed sample courses

```bash
npx tsx prisma/seed.ts
```

Expected output:

```text
Seeded 30 courses
```

### 7. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

The application requires the following environment variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Secret used by Auth.js for authentication |

The `.env` file is excluded from Git using `.gitignore`.

## Production Build

To create a production build locally:

```bash
npm run build
```

The build command generates the Prisma Client before compiling the Next.js application.

```text
npm run build
      |
      v
prisma generate
      |
      v
next build
```

## Deployment

The application is deployed using Vercel.

Production architecture:

```text
Vercel
  |
  v
Next.js Application
  |
  v
Prisma
  |
  v
Neon PostgreSQL
```

Required Vercel environment variables:

```text
DATABASE_URL
AUTH_SECRET
```

The course data is seeded into the production PostgreSQL database before the application is deployed.

### Live Demo

Add the deployed URL here:

```text
https://learniee-parent-dashboard2.vercel.app/login
```

### GitHub Repository

Add the repository URL here:

```text
https://github.com/Chinmay48/learniee-parent-dashboard
```

## What I Would Improve

If this application were developed beyond the scope of the assignment, I would add:

### 1. Course Details and Booking

Parents could open a course detail page and book a course directly.

### 2. Child Profiles

Parents could manage multiple children with information such as:

- Name
- Grade
- Subjects of interest
- Learning preferences

Courses could then be personalized for each child.

### 3. Personalized Recommendations

A recommendation system could suggest courses using:

- Child's grade
- Subjects of interest
- Previous course activity
- Teacher ratings
- Parent preferences

### 4. Teacher Profiles

Each teacher could have a dedicated profile containing:

- Experience
- Qualifications
- Subjects taught
- Reviews
- Ratings

### 5. Reviews and Verified Ratings

Parents could submit reviews after completing a course.

### 6. Advanced Search

The search system could later include:

- Course duration
- Online/offline mode
- Location
- Language
- Availability
- Class schedule

### 7. Production Improvements

For a larger production system, I would add:

- Automated tests
- API rate limiting
- Input validation
- Error monitoring
- Caching
- Database indexes for frequently queried fields
- CI/CD pipeline
- Improved accessibility

## Assignment Assumptions

The assignment allows either a local JSON file or SQLite for storage.

For the initial local implementation, SQLite was used because it is lightweight and requires no external database setup.

For deployment, PostgreSQL was used through Neon because the deployed application requires persistent server-side storage for user accounts and course data.

The course catalog contains seeded sample data because the assignment focuses on authentication, dashboard UI, course discovery, filtering, sorting, and pagination rather than building a full course management system.

