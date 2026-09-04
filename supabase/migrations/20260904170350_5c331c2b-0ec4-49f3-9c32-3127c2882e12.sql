-- RLS policies on resume_entries call has_role() as the signed-in role,
-- so `authenticated` must be able to execute it.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Trigger on auth.users runs as the auth service role.
GRANT EXECUTE ON FUNCTION public.assign_first_admin() TO supabase_auth_admin;

-- BEFORE UPDATE trigger on resume_entries runs as the updating role.
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated;