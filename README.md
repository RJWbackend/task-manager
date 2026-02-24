Task Manager App

A simple full-stack task manager built with Next.js, React, TypeScript, and Supabase.

Overview

This project is a simple task management application where users can add, complete, and remove tasks. It includes a statistics page showing task progress and a feature that summarizes your tasks.

The goal of this project is to demonstrate:

- React state management

- Data fetching with useEffect

- Task management with Supabase (add, update, remove tasks)

- Basic input sanitization

- Routing with the Next.js App Router

- TypeScript usage


Features


- Create new tasks

- Mark tasks as completed

- Delete tasks

- View total, completed, and open tasks on stats page

- Generate a task summary based on current tasks

- Input sanitization (only letters, numbers, and spaces allowed)


Tech Stack

- Next.js (App Router)

- React

- TypeScript

- Supabase (PostgreSQL)

- Tailwind CSS

Project Structure

- app/page.tsx
  Main page with full CRUD functionality and task summary.

- app/stats/page.tsx
  Statistics page showing task total, tasks completed, tasks open

- lib/supabaseClient.ts
  Supabase client configuration.


Database

Table name: tasks


Columns:

- id (string / uuid)

- title (string)

- completed (boolean)

Getting Started
1. Install dependencies
npm install
2. Create a .env.local file in the root of the project
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
3. Run the development server
npm run dev

Open http://localhost:3000
 in your browser.

Implementation Notes

Data is fetched on component mount using useEffect.

Application state is managed using useState.

Supabase prevents SQL injection via parameterized queries.

User input is sanitized using a simple regex before storing it in the database.