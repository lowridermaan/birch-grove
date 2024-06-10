import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://krrcabwdoffgbysatfgu.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycmNhYndkb2ZmZ2J5c2F0Zmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5MzI0MDEsImV4cCI6MjAzMTUwODQwMX0.idFdoi7UDSzzYcEaJFt7QJdE7lwu6Hm9eJdDhg8K3rY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
