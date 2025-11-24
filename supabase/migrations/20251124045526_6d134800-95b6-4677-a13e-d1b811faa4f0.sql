-- Create apartment layouts table
CREATE TABLE public.apartment_layouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  apartment_id UUID REFERENCES public.apartments(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'brick_work' CHECK (status IN ('brick_work', 'plumbing', 'completed')),
  brick_work_approved BOOLEAN DEFAULT false,
  plumbing_approved BOOLEAN DEFAULT false,
  brick_work_notes TEXT,
  plumbing_notes TEXT,
  room_layout JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.apartment_layouts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can view apartment layouts"
ON public.apartment_layouts
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage apartment layouts"
ON public.apartment_layouts
FOR ALL
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_apartment_layouts_updated_at
BEFORE UPDATE ON public.apartment_layouts
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();