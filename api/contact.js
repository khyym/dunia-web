// Secure proxy for contact form - hides Supabase credentials
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', 'https://dunia.one');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // Rate limiting (simple in-memory, resets on cold start)
    const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                     req.headers['x-real-ip'] || 
                     'unknown';
    
    try {
        const { name, email, message } = req.body;
        
        // Validation
        if (!name || name.length < 2 || name.length > 100) {
            return res.status(400).json({ error: 'Invalid name' });
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        if (!message || message.length < 10 || message.length > 2000) {
            return res.status(400).json({ error: 'Invalid message' });
        }
        
        // Sanitize
        const sanitize = (str) => str
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .trim();
        
        // Insert to Supabase
        const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_SERVICE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                name: sanitize(name),
                email: sanitize(email),
                message: sanitize(message),
                ip_address: clientIP,
                user_agent: (req.headers['user-agent'] || '').substring(0, 500)
            })
        });
        
        if (!response.ok) {
            console.error('Supabase error:', await response.text());
            return res.status(500).json({ error: 'Failed to save message' });
        }
        
        return res.status(200).json({ success: true });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
