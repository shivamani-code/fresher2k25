# 🎉 Freshers 2025 – Event Fee Portal

A web app for collecting **Freshers 2025** event fees: students pay via a PhonePe QR code, upload their payment screenshot, and their submission is saved to Supabase for the organisers to verify.

*Represented by Jayanth Kumar & Shiva Mani.*

## ✨ Features

- **Hero page** – "Freshers 2025 – New Beginnings, Endless Memories." with a *Pay Fee* button that scrolls to the payment section
- **Payment section** – PhonePe QR code to scan and pay
- **Submission form** – full name, roll number, email and payment-proof image upload (all required)
- **Supabase backend**
  - Payment proof uploaded to the `payment-proofs` storage bucket
  - Submission saved to the `freshers_submissions` table with status `Pending`
- **Success page** – confirmation with event details (venue MREM, 18 October 2025, 9:30 AM onwards)
- Toast notifications for missing fields and errors, loading state while submitting
- 404 page

## 🛠️ Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui (Radix UI), Lucide icons
- React Router, TanStack Query
- Supabase (Postgres + Storage)

## 📁 Project Structure

```
fresher2k25/
├── src/
│   ├── pages/              # Index (hero + payment), Success, NotFound
│   ├── components/
│   │   ├── PaymentSection.tsx   # QR code + submission form + Supabase upload
│   │   └── ui/                  # shadcn/ui components
│   ├── integrations/supabase/   # Supabase client + generated types
│   └── assets/             # PhonePe QR images
├── supabase/migrations/    # Table, RLS policies and storage bucket
└── public/
```

## 🚀 Run Locally

**Prerequisites:** Node.js 18+ and npm, plus a Supabase project.

```bash
git clone https://github.com/shivamani-code/fresher2k25.git
cd fresher2k25
npm install
```

Create a `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

Run the SQL in `supabase/migrations/` on your Supabase project (creates the `freshers_submissions` table, its policies and the `payment-proofs` bucket), then:

```bash
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## 🖼️ Payment QR

Replace `src/assets/phonepe-qr-new.jpeg` with your own payment QR code before using it for another event.
