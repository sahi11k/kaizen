# Kaizen - Personal Growth & Productivity App

A personal growth and productivity web app built with React, Supabase, and Tailwind CSS. Kaizen combines a Pomodoro timer, journaling, and a dashboard to help you stay focused and track your progress.

## Features

- **Pomodoro Timer** - 25-minute focus sessions with short/long breaks, task management, session tracking, and Picture-in-Picture mode
- **Journals** - Create, edit, and manage journal entries to reflect on your day
- **Dashboard** - Overview widgets including total hours, task list, progress chart, and task completion percentage
- **Auth** - Email signup, login, OTP verification, and password reset via Supabase Auth
- **Settings** - Account and profile management
- **Theme** - Light and dark mode toggle

## Tech Stack

- **Frontend** - React 19, React Router, Zustand, TanStack Query
- **Styling** - Tailwind CSS 4, Radix UI, Lucide icons
- **Backend** - Supabase (auth, database)
- **Build** - Vite
- **Deployment** - Vercel
- **Other** - Chart.js, Day.js, dnd-kit, Sonner (toasts)

## Getting Started

### Prerequisites

- Node.js (v18+)
- A [Supabase](https://supabase.com) project

### Installation

1. Clone the repository

```bash
git clone https://github.com/sahi11k/pomodoro.git
cd pomodoro
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the dev server

```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

> If running in WSL, add `VITE_WSL=true` to your `.env` to enable file-watching via polling.

### Scripts

| Command               | Description                  |
| --------------------- | ---------------------------- |
| `npm run dev`         | Start the development server |
| `npm run build`       | Build for production         |
| `npm run check-types` | Run TypeScript type checking |

## Project Structure

```
src/
├── app/              # App-level setup (router, layouts)
├── features/         # Feature modules
│   ├── auth/         # Login, signup, OTP, password management
│   ├── pomodoro/     # Timer, tasks, sessions
│   ├── journals/     # Journal entries
│   ├── dashboard/    # Overview widgets
│   ├── settings/     # User settings
│   ├── home/         # Landing page
│   └── theme/        # Light/dark mode
├── shared/           # Shared UI components, utils, constants
├── assets/           # Static assets (icons, images, sounds)
├── styles/           # Global styles
└── index.jsx         # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Francesco Cirillo](https://www.linkedin.com/in/cirillof/) for the Pomodoro Technique
