ALTER TABLE app_users ADD COLUMN IF NOT EXISTS username varchar(64);
CREATE UNIQUE INDEX IF NOT EXISTS app_users_username_unique ON app_users (lower(username)) WHERE username IS NOT NULL;
ALTER TABLE app_users ADD CONSTRAINT app_users_username_format CHECK (username IS NULL OR username ~ '^[a-z0-9][a-z0-9._-]{2,63}$');
