-- Create table for submissions
CREATE TABLE IF NOT EXISTS public.freshers_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  roll_no TEXT NOT NULL,
  email TEXT NOT NULL,
  payment_proof_url TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.freshers_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (no reads by default)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'freshers_submissions' AND policyname = 'Public can insert submissions'
  ) THEN
    CREATE POLICY "Public can insert submissions"
    ON public.freshers_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);
  END IF;
END $$;

-- Create storage bucket for payment proofs (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for the bucket
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public read payment proofs'
  ) THEN
    CREATE POLICY "Public read payment proofs"
    ON storage.objects
    FOR SELECT
    TO anon
    USING (bucket_id = 'payment-proofs');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public upload payment proofs'
  ) THEN
    CREATE POLICY "Public upload payment proofs"
    ON storage.objects
    FOR INSERT
    TO anon
    WITH CHECK (bucket_id = 'payment-proofs');
  END IF;
END $$;