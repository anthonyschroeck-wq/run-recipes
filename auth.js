// api/auth.js — Supabase auth + progress proxy

const SUPA_URL = process.env.SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_ANON_KEY;

async function supaFetch(path, { method = 'GET', body, token } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPA_KEY,
    'Authorization': `Bearer ${token || SUPA_KEY}`,
  };
  if (method === 'POST' || method === 'PATCH') headers['Prefer'] = 'return=representation';
  const res = await fetch(`${SUPA_URL}${path}`, {
    method, headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!SUPA_URL || !SUPA_KEY) return res.status(500).json({ error: 'Supabase not configured — add SUPABASE_URL and SUPABASE_ANON_KEY to Vercel env vars' });

  const { action, email, password, access_token, progress } = req.body;

  try {
    if (action === 'signup') {
      const data = await supaFetch('/auth/v1/signup', { method: 'POST', body: { email, password } });
      if (data.error || data.msg) return res.status(400).json({ error: data.error_description || data.msg || 'Signup failed' });
      return res.status(200).json(data);
    }

    if (action === 'login') {
      const data = await supaFetch('/auth/v1/token?grant_type=password', { method: 'POST', body: { email, password } });
      if (data.error) return res.status(400).json({ error: data.error_description || 'Login failed' });
      return res.status(200).json(data);
    }

    if (action === 'get_progress') {
      const user = await supaFetch('/auth/v1/user', { token: access_token });
      if (!user.id) return res.status(401).json({ error: 'Not authenticated' });
      const rows = await supaFetch(`/rest/v1/user_progress?user_id=eq.${user.id}&select=*`, { token: access_token });
      if (Array.isArray(rows) && rows.length > 0) return res.status(200).json({ progress: rows[0] });
      const newRow = await supaFetch('/rest/v1/user_progress', { method: 'POST', token: access_token, body: { user_id: user.id, phase: 'welcome', tools_checked: {}, modules_completed: [] } });
      return res.status(200).json({ progress: Array.isArray(newRow) ? newRow[0] : newRow });
    }

    if (action === 'save_progress') {
      const user = await supaFetch('/auth/v1/user', { token: access_token });
      if (!user.id) return res.status(401).json({ error: 'Not authenticated' });
      const updated = await supaFetch(`/rest/v1/user_progress?user_id=eq.${user.id}`, { method: 'PATCH', token: access_token, body: { ...progress, updated_at: new Date().toISOString() } });
      if (Array.isArray(updated) && updated.length === 0) {
        const inserted = await supaFetch('/rest/v1/user_progress', { method: 'POST', token: access_token, body: { user_id: user.id, ...progress } });
        return res.status(200).json({ progress: Array.isArray(inserted) ? inserted[0] : inserted });
      }
      return res.status(200).json({ progress: Array.isArray(updated) ? updated[0] : updated });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
