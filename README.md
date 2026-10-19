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

## Multiple PDF documents

For an existing deployed project, run [`supabase/migrations/20261019_multiple_invoice_pdfs.sql`](supabase/migrations/20261019_multiple_invoice_pdfs.sql) once in the Supabase SQL Editor before uploading the updated HTML files. It creates the protected document list and preserves existing PDF links.

Administrators can select multiple PDF files in one upload. Each file is limited to 10 MB and users can download every PDF attached to their own finalized invoice.

## E-mail alerts for new requests

`supabase/functions/notify-new-invoice/index.ts` is a protected Edge Function. It runs only after a request is saved and verifies the caller before reading the request data.

Create a free Resend account, then add these **Supabase Edge Function Secrets**:

- `RESEND_API_KEY`: the Resend API key
- `ADMIN_NOTIFICATION_EMAIL`: `andreiorheanu@yahoo.com`
- `NOTIFICATION_FROM_EMAIL`: a Resend-approved sender; for testing, use `Facturi Arbitraj <onboarding@resend.dev>`
- `APP_URL`: `https://andrei-orheanu.github.io/facturi-arbitraj/admin.html`

Deploy with `supabase functions deploy notify-new-invoice`, then upload the updated `index.html` to GitHub Pages. Never put those secret values in `supabase-config.js`.
