## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in the values. This project expects a single Postgres connection string from Neon (or any hosted Postgres) in `DATABASE_URL`.

```env
PORT=5000
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
GEMINI_API_KEY=your_google_gemini_api_key
--
**Tip:** get neon database credentials from the [Neon Console](https://console.neon.tech/).