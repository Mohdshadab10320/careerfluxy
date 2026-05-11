
-- Career roadmaps
CREATE TABLE public.career_roadmaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  goal text NOT NULL,
  duration_months integer NOT NULL DEFAULT 3,
  roadmap jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.career_roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own roadmaps" ON public.career_roadmaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own roadmaps" ON public.career_roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own roadmaps" ON public.career_roadmaps FOR DELETE USING (auth.uid() = user_id);

-- Daily challenges
CREATE TABLE public.daily_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_date date NOT NULL UNIQUE,
  category text NOT NULL,
  question text NOT NULL,
  ideal_answer text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read daily challenges" ON public.daily_challenges FOR SELECT USING (true);
CREATE POLICY "Admins manage daily challenges" ON public.daily_challenges FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- User daily attempts
CREATE TABLE public.user_daily_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  challenge_id uuid NOT NULL REFERENCES public.daily_challenges(id) ON DELETE CASCADE,
  challenge_date date NOT NULL,
  answer text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  feedback jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);
ALTER TABLE public.user_daily_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read daily attempts" ON public.user_daily_attempts FOR SELECT USING (true);
CREATE POLICY "Users insert own attempts" ON public.user_daily_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Streaks
CREATE TABLE public.user_streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  current_streak integer NOT NULL DEFAULT 0,
  best_streak integer NOT NULL DEFAULT 0,
  last_activity_date date,
  total_xp integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read streaks" ON public.user_streaks FOR SELECT USING (true);
CREATE POLICY "Users upsert own streak" ON public.user_streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own streak" ON public.user_streaks FOR UPDATE USING (auth.uid() = user_id);

-- Badges catalog
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  icon text,
  criteria jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone read badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Admins manage badges" ON public.badges FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- User earned badges
CREATE TABLE public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  badge_code text NOT NULL,
  earned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_code)
);
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read user badges" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "Users insert own badge" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Certificates
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  full_name text NOT NULL,
  course text NOT NULL,
  score integer NOT NULL,
  total integer NOT NULL,
  level text,
  issued_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own certs" ON public.certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own certs" ON public.certificates FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed badges
INSERT INTO public.badges (code, name, description, icon) VALUES
('first_step', 'First Step', 'Completed your first daily challenge', '🎯'),
('streak_3', '3-Day Streak', 'Maintained a 3-day streak', '🔥'),
('streak_7', 'Week Warrior', 'Maintained a 7-day streak', '⚡'),
('streak_30', 'Month Master', 'Maintained a 30-day streak', '🏆'),
('roadmap_set', 'Path Finder', 'Generated your first AI career roadmap', '🗺️'),
('certified', 'Certified', 'Earned your first interview certificate', '🎓'),
('english_pro', 'English Pro', 'Scored 80+ in spoken English practice', '🗣️');
