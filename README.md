# Facturi Arbitraj — Supabase

The Romanian static application now uses Supabase for authentication, protected invoice data, and private PDF files.

## Setup

1. Create a Supabase project, then run all of [`supabase/schema.sql`](supabase/schema.sql) in its SQL Editor.
2. Enable Email authentication and set the deployed site URL and its `index.html` URL as an Auth redirect URL.
3. Put the Project URL and browser-safe publishable (or legacy anon) key in `supabase-config.js`.
4. Register the first account, then run the commented final SQL command in `supabase/schema.sql` with that account's real e-mail to promote it to administrator.

Never put a `service_role` key in browser code.

## Security model

- Users can create/view only their own requests and download only their own PDF.
- Administrators can view every request and attach/replace PDFs.
- The `invoices` Storage bucket is private; PDFs are not embedded in database rows.
- AJF is cash-only in both the interface and the database rule.
