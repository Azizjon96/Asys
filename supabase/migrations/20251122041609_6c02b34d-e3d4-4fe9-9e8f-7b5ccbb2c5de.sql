-- Create tech_passports table for document management
CREATE TABLE public.tech_passports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id UUID REFERENCES public.contracts(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'at_notary',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.tech_passports ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can view tech passports"
ON public.tech_passports
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage tech passports"
ON public.tech_passports
FOR ALL
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_tech_passports_updated_at
BEFORE UPDATE ON public.tech_passports
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();