# Railway PostgreSQL Simple App

A simple application that connects to a PostgreSQL database on Railway and allows inserting name and age data.

## Features

- Simple frontend with a form to collect name and age
- Node.js/Express backend API
- PostgreSQL database integration
- Easy deployment to Railway

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database on Railway (or locally for development)

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/granitevolition/railway-postgres-simple-app.git
cd railway-postgres-simple-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on the `.env.example` file and add your Railway PostgreSQL database URL:

```
DATABASE_URL=postgresql://postgres:password@host:port/railway
PORT=3000
NODE_ENV=development
```

### 4. Start the application

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The application will run on [http://localhost:3000](http://localhost:3000)

## Deploying to Railway

1. Push your code to GitHub
2. Create a new project on Railway
3. Connect your GitHub repository
4. Add the PostgreSQL database plugin if you haven't already
5. Add the required environment variables:
   - `DATABASE_URL` (Railway auto-generates this)
   - `NODE_ENV=production`
6. Deploy your application

## Database Schema

The application creates a simple table named `people` with the following structure:

```sql
CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

- `GET /api/people` - Get all people in the database
- `POST /api/people` - Add a new person (requires name and age in request body)
- `GET /health` - Health check endpoint

## License

MIT