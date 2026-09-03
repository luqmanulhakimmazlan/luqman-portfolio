# Developer Portfolio & Custom CMS

A full-stack developer portfolio built as a **single-page application (SPA)** with a custom Content Management System (CMS). The system combines an interactive public portfolio with a secure administrative dashboard, allowing portfolio content to be managed dynamically through a Laravel REST API.

Rather than relying on static site generators or third-party CMS platforms, I designed and developed the application from the ground up to demonstrate practical experience in **frontend development, backend API design, authentication, database management, and production deployment**.

## 🚀 Key Features

### Interactive Portfolio

* Single-page React application with client-side routing
* Responsive UI designed for desktop and mobile
* Dynamic rendering of projects, skills, and professional experience
* Clean, cinematic interface focused on presenting technical work and case studies

### Custom CMS

A protected administrative dashboard provides CRUD functionality for managing:

* Projects
* Technical skills
* Professional experiences
* Timeline information

Changes made through the CMS are persisted in the PostgreSQL database and reflected dynamically on the portfolio.

### 🔐 Authentication & Security

* Laravel session-based authentication
* CSRF protection
* Secure password hashing
* Protected administrative routes using middleware
* Environment variables for sensitive configuration
* HTTPS-aware production configuration

### ⚡ Production Deployment

* Deployed using Render Web Services and PostgreSQL
* Separate frontend and backend responsibilities
* Production environment configuration
* Database connection optimization
* Git-based deployment workflow

## 🏗️ Architecture

The application follows a **decoupled frontend/backend architecture**:

```text
┌─────────────────────────────┐
│        React Frontend       │
│      React Router + Vite    │
└──────────────┬──────────────┘
               │
               │ REST API
               ▼
┌─────────────────────────────┐
│       Laravel Backend       │
│   Controllers / Middleware  │
│       Authentication        │
└──────────────┬──────────────┘
               │
               │ Eloquent ORM
               ▼
┌─────────────────────────────┐
│        PostgreSQL DB        │
│ Projects / Skills / Exp.    │
└─────────────────────────────┘
```

Laravel also provides the application shell required for the SPA, while React Router manages client-side navigation and page transitions.

## 🧠 Engineering Decisions

### Why Build a Custom CMS?

The project was intentionally developed without relying on WordPress or other third-party CMS platforms.

Building the CMS from scratch provided practical experience with:

* RESTful API design
* CRUD operations
* HTTP request handling
* Server-side validation
* Authentication and authorization
* Relational database design
* Data persistence
* Frontend-to-backend communication

This approach allowed the portfolio itself to demonstrate the same engineering skills that it presents.

### Database Integrity

PostgreSQL constraints are used to ensure that required data is validated at the database level.

For example, critical fields such as employment type and location are configured to prevent incomplete records from being stored.

This provides an additional layer of protection beyond frontend and backend validation.

### SPA Routing

Laravel is configured to serve the application's main view while React Router handles frontend navigation.

This allows routes such as:

```text
/projects
/experience
/about
/admin
```

to function as part of a seamless SPA experience without requiring full page reloads.

## 🛠️ Tech Stack

| Category       | Technologies                                |
| -------------- | ------------------------------------------- |
| Frontend       | React, React Router DOM, Tailwind CSS, Vite |
| Backend        | PHP 8.4, Laravel 11                         |
| Authentication | Laravel Sanctum / Session Authentication    |
| Database       | PostgreSQL                                  |
| ORM            | Eloquent ORM                                |
| Infrastructure | Render                                      |
| Development    | Docker, Git                                 |
| Architecture   | REST API, SPA                               |

## 💻 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/luqman-portfolio.git

cd luqman-portfolio
```

### 2. Install Backend Dependencies

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure your local PostgreSQL database credentials in `.env`.

### 3. Run Database Migrations & Seeders

```bash
php artisan migrate
php artisan db:seed
```

### 4. Install Frontend Dependencies

```bash
npm install
```

### 5. Start the Development Server

Start the Laravel backend:

```bash
php artisan serve
```

Then start the Vite development server:

```bash
npm run dev
```

## 📌 Project Purpose

This portfolio is more than a personal website. It serves as a practical demonstration of my ability to design and develop a **full-stack application from frontend interface to backend API and database**.

The project reflects my interest in building maintainable systems, learning modern development practices, and applying software engineering concepts to real-world applications.

## 👨‍💻 About the Developer

**Luqmanul Hakim**
Computer Science Graduate | Full-Stack & Software Development

Based in Malaysia, I enjoy building interactive applications and exploring technologies across frontend, backend, and multimedia development.

This portfolio represents my approach to learning: **build the system, understand how it works, and continuously improve it.**
