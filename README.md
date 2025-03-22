# 📝 Next.js LinkList App

This is a **Next.js** web app using **Supabase** for real-time updates. Users can create a list, share it with others, and allow them to add their names. The list updates **instantly** and is **automatically deleted after 7 days**.

---

## 🚀 Features

- **Create a List** 📃 - Generates a unique link.
- **Join a List** 👥 - Users can add their names.
- **Real-Time Updates** ⚡ - List updates instantly using Supabase Realtime.
- **Automatic Expiry** ⏳ - Lists delete **7 days** after creation.
- **Timestamp Display** 📅 - Shows the date and time each user joined.

---

## 🛠 Tech Stack

- **Next.js** - React Framework
- **Supabase** - Database & Realtime Updates
- **PostgreSQL** - Database

---

## 🏗 Setup Instructions

### 1️⃣ Clone the Repo

```sh
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies

```sh
npm install or bun i
```

### 3️⃣ Configure Supabase

- Create a **Supabase** account at [supabase.com](https://supabase.com)
- Set up a **new project** and **PostgreSQL database**.
- Get your **API keys** and **database URL** from the Supabase dashboard.
- Create a `.env` file in the root directory and add:

```sh
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Run Locally

```sh
npm run dev or bun run dev
```

---

## 🛠 Supabase Database Setup

Run the following SQL in Supabase SQL Editor:

```sql
CREATE TABLE lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  users JSONB NOT NULL DEFAULT '[]',
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '7 days')
);
```

Enable **Realtime Updates** for the `lists` table.

---

## 🎯 Contributing

1. Fork the repo 🍴
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Added new feature'`
4. Push branch: `git push origin feature-name`
5. Open a **Pull Request** 🚀

---

## 📜 License

MIT License. Feel free to use and modify!
