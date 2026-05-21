# Database Setup Guide

## Overview

This project uses PostgreSQL with Prisma ORM. You have several options for running PostgreSQL.

## Option 1: Cloud Database (Recommended for Quick Start)

### Supabase (Free Tier Available)
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > Database
4. Copy the "Connection string" (URI format)
5. Update `.env` file:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[HOST]:[PORT]/postgres"
   ```

### Neon (Free Tier Available)
1. Go to [https://neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update `.env` file with the connection string

## Option 2: Local PostgreSQL

### macOS (using Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15
createdb edtech
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb edtech
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'yourpassword';"
```

### Windows
1. Download PostgreSQL from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Remember the password you set for the postgres user
4. Use pgAdmin or command line to create a database named `edtech`

### Update .env
```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/edtech?schema=public"
```

## Option 3: Docker (Easy Local Setup)

```bash
docker run --name edtech-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=edtech -p 5432:5432 -d postgres:15
```

Update `.env`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/edtech?schema=public"
```

## Running Migrations

Once your database is configured:

```bash
# Create and apply migrations
npx prisma migrate dev --name init

# Or just push the schema (for development)
npx prisma db push
```

## Useful Prisma Commands

```bash
# Open Prisma Studio (GUI for your database)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Generate Prisma Client after schema changes
npx prisma generate

# View current database schema
npx prisma db pull
```

## Database Schema

See `prisma/schema.prisma` for the full schema definition.

### Main Tables:
- **users** - All users (students, instructors, admins)
- **instructors** - Instructor-specific data
- **courses** - Course catalog
- **sections** - Course modules/sections
- **lessons** - Individual lessons with content
- **assessments** - Tests and quizzes
- **questions** - Assessment questions
- **enrollments** - Student-course subscriptions
- **lesson_progress** - Track student progress
- **submissions** - Assessment submissions and grades
- **transactions** - Payment records

## Troubleshooting

### Connection refused
- Make sure PostgreSQL is running: `sudo systemctl status postgresql` (Linux) or `brew services list` (macOS)
- Check if the port 5432 is available

### Authentication failed
- Verify your username and password in DATABASE_URL
- For local Postgres, you may need to update `pg_hba.conf`

### Schema out of sync
```bash
npx prisma migrate reset
npx prisma migrate dev
```
