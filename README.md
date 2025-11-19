# UnaBombeer

Generated project scaffold for **UnaBombeer** (note: repository name contains two 'e' as requested).

## Structure

- server/ - Node.js backend (Express) following MVC
- client/ - Static frontend (HTML/CSS/JS) with a simple Bomberman-like engine skeleton

## Quick start (development)

1. Backend:
   ```bash
   cd server
   cp .env.example .env
   npm install
   npm run dev
   ```

2. Frontend:
   Serve `client/` directory with any static server (or configure Express to serve it).

## Environment variables (.env.example provided)

## Deployment
A GitHub Actions deploy workflow is included for Railway.

