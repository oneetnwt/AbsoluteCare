# MindfulSchedule — Therapy Practice Platform (Frontend)

MindfulSchedule is a therapy appointment scheduling and practice management platform designed for therapists and their clients. It features a calm, warm aesthetic inspired by Headspace and Calm, built with React 19, Vite, and Tailwind CSS v4.

## Features

- **Landing Page**:
  - **Hero Section**: Built around the primary "Get started" brand green CTA, featuring interactive live calendar demo switching between Therapist and Client views.
  - **Social Proof**: Practice logos (Harbor Wellness, Northstar Therapy, Kindred Care), HIPAA & SOC-2 compliance badges, and therapist testimonials.
  - **5 Key Feature Modules**: Easy Self-Serve Booking, Secure HIPAA Messaging, Gentle Automated Reminders, Insurance & Pre-session Intake, and Telehealth & Care Notes.
  - **Interactive Setup Guide**: 3-step walk-through for setting practice hours, sharing booking links, and automating care.
  - **Transparent Pricing**: Monthly/Annual toggle (20% discount badge), Solo Practitioner vs Group Practice plans.
  - **HIPAA Privacy FAQ**: Expandable accordion addressing BAA agreements, AES-256 data encryption, and client confidentiality.
  - **HIPAA Compliance Assurance Modal**: Dedicated dialog breaking down technical safeguards, SOC-2 readiness, and BAA terms.

- **Authentication Flow**:
  - **Low-Friction Sign Up / Log In**: Dedicated flow for both therapists and clients.
  - **Role Selection**: Interactive selector cards for **Therapist / Practice** vs **Client / Patient**.
  - **Field Validation & WCAG AA Accessibility**: Real-time inline field errors, `aria-invalid`, `aria-describedby`, password strength meter, password show/hide toggle.
  - **HIPAA Auth Provider Integration**: Uses Axios instance (`axiosInstance.js`) targeting backend `/auth/signup` and `/auth/login` with simulated fallback for local front-end testing.
  - **Light & Dark Mode**: Seamless theme toggle persisting preference in `localStorage`.

## Setup & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build production bundle
npm run build
```

## API configuration

Axios is configured in `src/api/axiosInstance.js`.

- Local development uses the Vite proxy, so `/auth` requests are forwarded to `http://localhost:8080`.
- Set `VITE_API_URL` in a local `.env` file when the frontend must call a deployed API directly.
- Copy `.env.example` to `.env` as a starting point. Do not commit secrets.
