/**
 * DUNIA - Smooth Transitions + Starfield
 * Standardized content for all languages
 * 
 * Security: XSS protection, input validation, rate limiting
 * Contact form: Supabase integration
 */

// ============================================
// Supabase Configuration
// ============================================
const SUPABASE_URL = 'https://mjxqfmlsjokcuwugytve.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qeHFmbWxzam9rY3V3dWd5dHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzE0MjEsImV4cCI6MjA3OTc0NzQyMX0.arp0ygidKHKZRd-Ga8KCOgSIo7AYXSCLq_QCHsR0IEk';

// ============================================
// Security Utilities
// ============================================
const Security = {
    // Sanitize input to prevent XSS
    sanitize(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    // Validate email format
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Rate limiting (client-side)
    lastSubmitTime: 0,
    submitCount: 0,
    
    canSubmit() {
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        
        // Reset counter after 5 minutes
        if (now - this.lastSubmitTime > fiveMinutes) {
            this.submitCount = 0;
        }
        
        // Max 3 submissions per 5 minutes
        if (this.submitCount >= 3) {
            return false;
        }
        
        return true;
    },
    
    recordSubmit() {
        this.lastSubmitTime = Date.now();
        this.submitCount++;
    }
};

// ============================================
// Supabase Contact Form Handler
// ============================================
async function submitContactForm(formData) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
            name: Security.sanitize(formData.name),
            email: Security.sanitize(formData.email),
            message: Security.sanitize(formData.message),
            user_agent: navigator.userAgent.substring(0, 500)
        })
    });
    
    if (!response.ok) {
        throw new Error('Failed to send message');
    }
    
    return true;
}

// Standardized translations - same full content for each language
const translations = [
    // 1. Dark - Turkish
    {
        fontClass: 'font-turkish',
        theme: 'theme-purple',
        mode: 'dark',
        title: "dunia'dan merhaba",
        content: "burası yeni bir oluşum. burada hem bireysel hem kolektifsin. yeni insanları bul, topluluklara karış.",
        contact: "iletişim"
    },
    // 2. White - English
    {
        fontClass: 'font-english',
        theme: '',
        mode: 'white',
        title: "hello from dunia",
        content: "this is a new formation. here you are both individual and collective. find new people, join communities.",
        contact: "contact"
    },
    // 3. Dark - Spanish
    {
        fontClass: 'font-spanish',
        theme: 'theme-cyan',
        mode: 'dark',
        title: "hola desde dunia",
        content: "esta es una nueva formación. aquí eres individual y colectivo. encuentra nuevas personas, únete a comunidades.",
        contact: "contacto"
    },
    // 4. White - French
    {
        fontClass: 'font-french',
        theme: '',
        mode: 'white',
        title: "bonjour de dunia",
        content: "c'est une nouvelle formation. ici, vous êtes à la fois individuel et collectif. trouvez de nouvelles personnes, rejoignez des communautés.",
        contact: "contact"
    },
    // 5. Dark - German
    {
        fontClass: 'font-german',
        theme: 'theme-warm',
        mode: 'dark',
        title: "hallo von dunia",
        content: "dies ist eine neue formation. hier bist du sowohl individuell als auch kollektiv. finde neue leute, schließe dich gemeinschaften an.",
        contact: "kontakt"
    },
    // 6. White - Italian
    {
        fontClass: 'font-italian',
        theme: '',
        mode: 'white',
        title: "ciao da dunia",
        content: "questa è una nuova formazione. qui sei sia individuale che collettivo. trova nuove persone, unisciti alle comunità.",
        contact: "contatto"
    },
    // 7. Dark - Portuguese
    {
        fontClass: 'font-portuguese',
        theme: 'theme-rose',
        mode: 'dark',
        title: "olá de dunia",
        content: "esta é uma nova formação. aqui você é individual e coletivo. encontre novas pessoas, junte-se a comunidades.",
        contact: "contato"
    },
    // 8. White - Japanese
    {
        fontClass: 'font-japanese',
        theme: '',
        mode: 'white',
        title: "duniaからこんにちは",
        content: "ここは新しい形成です。ここではあなたは個人であり、集団でもあります。新しい人々を見つけ、コミュニティに参加しましょう。",
        contact: "連絡"
    },
    // 9. Dark - Korean
    {
        fontClass: 'font-korean',
        theme: 'theme-emerald',
        mode: 'dark',
        title: "dunia에서 안녕하세요",
        content: "이것은 새로운 형성입니다. 여기서 당신은 개인이자 집단입니다. 새로운 사람들을 찾고, 커뮤니티에 참여하세요.",
        contact: "연락"
    },
    // 10. White - Turkish
    {
        fontClass: 'font-turkish',
        theme: '',
        mode: 'white',
        title: "dunia'dan merhaba",
        content: "burası yeni bir oluşum. burada hem bireysel hem kolektifsin. yeni insanları bul, topluluklara karış.",
        contact: "iletişim"
    },
    // 11. Dark - English
    {
        fontClass: 'font-english',
        theme: 'theme-blue',
        mode: 'dark',
        title: "hello from dunia",
        content: "this is a new formation. here you are both individual and collective. find new people, join communities.",
        contact: "contact"
    },
    // 12. White - Spanish
    {
        fontClass: 'font-spanish',
        theme: '',
        mode: 'white',
        title: "hola desde dunia",
        content: "esta es una nueva formación. aquí eres individual y colectivo. encuentra nuevas personas, únete a comunidades.",
        contact: "contacto"
    },
    // 13. Dark - French
    {
        fontClass: 'font-french',
        theme: 'theme-violet',
        mode: 'dark',
        title: "bonjour de dunia",
        content: "c'est une nouvelle formation. ici, vous êtes à la fois individuel et collectif. trouvez de nouvelles personnes, rejoignez des communautés.",
        contact: "contact"
    },
    // 14. White - Italian
    {
        fontClass: 'font-italian',
        theme: '',
        mode: 'white',
        title: "ciao da dunia",
        content: "questa è una nuova formazione. qui sei sia individuale che collettivo. trova nuove persone, unisciti alle comunità.",
        contact: "contatto"
    },
    // 15. Dark - Japanese
    {
        fontClass: 'font-japanese',
        theme: 'theme-sakura',
        mode: 'dark',
        title: "duniaからこんにちは",
        content: "ここは新しい形成です。ここではあなたは個人であり、集団でもあります。新しい人々を見つけ、コミュニティに参加しましょう。",
        contact: "連絡"
    },
    // 16. White - Korean
    {
        fontClass: 'font-korean',
        theme: '',
        mode: 'white',
        title: "dunia에서 안녕하세요",
        content: "이것은 새로운 형성입니다. 여기서 당신은 개인이자 집단입니다. 새로운 사람들을 찾고, 커뮤니티에 참여하세요.",
        contact: "연락"
    }
];

// DOM
const titleEl = document.getElementById('title');
const contentEl = document.getElementById('content');
const contactBtn = document.getElementById('contactBtn');
const contactBtnText = document.querySelector('.contact-btn-text');
const contactWrapper = document.querySelector('.contact-btn-wrapper');
const starsContainer = document.getElementById('starsContainer');
const estYearEl = document.getElementById('estYear');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');
const body = document.body;

// State
let currentIndex = 0;
let isAnimating = false;
let currentFontClass = '';
let currentTheme = '';
let currentMode = '';

// Timing
const MODE_CHANGE = 400;
const CONTENT_UPDATE = 1000;
const SHOW_START = 1200;
const ANIMATION_END = 2800;
const CYCLE_INTERVAL = 6000;

/**
 * Create realistic starfield - 55 stars with varying brightness
 */
function createStars() {
    const starCount = 55;

    // Create dark zones (areas with fewer stars)
    const darkZones = [
        { x: 20, y: 30, radius: 15 },  // top-left area
        { x: 75, y: 60, radius: 20 },  // middle-right area
        { x: 40, y: 80, radius: 12 }   // bottom-center area
    ];

    function isInDarkZone(x, y) {
        for (const zone of darkZones) {
            const dx = x - zone.x;
            const dy = y - zone.y;
            if (Math.sqrt(dx * dx + dy * dy) < zone.radius) {
                return true;
            }
        }
        return false;
    }

    // Create stars
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position (avoid dark zones for most stars)
        let x, y;
        let attempts = 0;
        do {
            x = Math.random() * 100;
            y = Math.random() * 100;
            attempts++;
        } while (isInDarkZone(x, y) && attempts < 5);

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;

        // Varying sizes (most are tiny, few are bright)
        const sizeRoll = Math.random();
        let size;
        if (sizeRoll < 0.6) {
            size = 1; // 60% tiny
        } else if (sizeRoll < 0.85) {
            size = 1.5; // 25% small
        } else if (sizeRoll < 0.95) {
            size = 2; // 10% medium
        } else {
            size = 2.5; // 5% bright
        }
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Varying brightness (most are dim)
        const brightnessRoll = Math.random();
        let opacity;
        if (brightnessRoll < 0.4) {
            opacity = 0.15 + Math.random() * 0.15; // 40% very dim
        } else if (brightnessRoll < 0.7) {
            opacity = 0.3 + Math.random() * 0.2; // 30% dim
        } else if (brightnessRoll < 0.9) {
            opacity = 0.5 + Math.random() * 0.2; // 20% medium
        } else {
            opacity = 0.7 + Math.random() * 0.3; // 10% bright
        }
        star.style.setProperty('--star-opacity', opacity);

        // Fast pulse animation + drift movement
        const pulseDuration = 2 + Math.random() * 2; // 2-4 seconds
        const driftDuration = 15 + Math.random() * 10; // 15-25 seconds
        star.style.animationDelay = `${Math.random() * 3}s, ${Math.random() * 10}s`;
        star.style.animationDuration = `${pulseDuration}s, ${driftDuration}s`;

        starsContainer.appendChild(star);
    }
}

/**
 * Transition content
 */
function transitionContent() {
    if (isAnimating) return;
    isAnimating = true;

    const next = translations[currentIndex];

    // Hide all elements
    titleEl.classList.remove('visible', 'showing');
    contentEl.classList.remove('visible', 'showing');
    contactWrapper.classList.remove('visible', 'showing');
    titleEl.classList.add('hidden');
    contentEl.classList.add('hidden');
    contactWrapper.classList.add('hidden');

    // Mode change
    setTimeout(() => {
        body.classList.remove('mode-dark', 'mode-white');
        if (currentTheme) body.classList.remove(currentTheme);

        currentMode = next.mode;
        body.classList.add(`mode-${currentMode}`);

        if (next.theme) {
            currentTheme = next.theme;
            body.classList.add(currentTheme);
        } else {
            currentTheme = '';
        }
    }, MODE_CHANGE);

    // Update content
    setTimeout(() => {
        if (currentFontClass) titleEl.classList.remove(currentFontClass);
        currentFontClass = next.fontClass;
        titleEl.classList.add(currentFontClass);

        titleEl.textContent = next.title;
        contentEl.textContent = next.content;
        contactBtnText.textContent = next.contact;

        // Prepare for showing
        titleEl.classList.remove('hidden');
        contentEl.classList.remove('hidden');
        contactWrapper.classList.remove('hidden');
        titleEl.classList.add('showing');
        contentEl.classList.add('showing');
        contactWrapper.classList.add('showing');
    }, CONTENT_UPDATE);

    // Show all elements
    setTimeout(() => {
        titleEl.classList.remove('showing');
        contentEl.classList.remove('showing');
        contactWrapper.classList.remove('showing');
        titleEl.classList.add('visible');
        contentEl.classList.add('visible');
        contactWrapper.classList.add('visible');
    }, SHOW_START);

    setTimeout(() => { isAnimating = false; }, ANIMATION_END);
    currentIndex = (currentIndex + 1) % translations.length;
}

/**
 * Modal
 */
function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * EST Counter
 */
function startESTCounter() {
    const startYear = -9999, endYear = 2025, duration = 4500, pause = 3500;
    let startTime = null;

    function format(y) { return y < 0 ? `${Math.abs(y).toLocaleString()} BC` : y.toString(); }
    function ease(t) { return 1 - Math.pow(1 - t, 4); }

    function animate(ts) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const year = Math.round(startYear + (endYear - startYear) * ease(progress));

        estYearEl.textContent = format(year);
        estYearEl.classList.toggle('highlight', year >= 1900);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            estYearEl.textContent = '2025';
            setTimeout(() => { startTime = null; estYearEl.classList.remove('highlight'); requestAnimationFrame(animate); }, pause);
        }
    }
    requestAnimationFrame(animate);
}

/**
 * Init
 */
function init() {
    // Create stars
    createStars();



    const first = translations[0];
    currentFontClass = first.fontClass;
    currentTheme = first.theme;
    currentMode = first.mode;

    titleEl.classList.add(currentFontClass, 'visible');
    contentEl.classList.add('visible');
    contactWrapper.classList.add('visible');
    body.classList.add(`mode-${currentMode}`);
    if (currentTheme) body.classList.add(currentTheme);

    titleEl.textContent = first.title;
    contentEl.textContent = first.content;
    contactBtnText.textContent = first.contact;
    currentIndex = 1;

    contactBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
    
    // Contact form submission with validation and Supabase
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        
        // Get form values
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('formMessage').value.trim();
        
        // Honeypot check (if honeypot field is filled, it's a bot)
        const honeypot = document.getElementById('formWebsite');
        if (honeypot && honeypot.value) {
            // Silently fail for bots
            closeModal();
            return;
        }
        
        // Validation
        if (!name || name.length < 2) {
            showFormError('Please enter your name');
            return;
        }
        
        if (!email || !Security.isValidEmail(email)) {
            showFormError('Please enter a valid email');
            return;
        }
        
        if (!message || message.length < 10) {
            showFormError('Please enter a message (at least 10 characters)');
            return;
        }
        
        // Rate limiting check
        if (!Security.canSubmit()) {
            showFormError('Too many messages. Please wait a few minutes.');
            return;
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.6';
        
        try {
            await submitContactForm({ name, email, message });
            
            // Success
            Security.recordSubmit();
            submitBtn.textContent = 'Sent ✓';
            submitBtn.style.background = '#22c55e';
            submitBtn.style.borderColor = '#22c55e';
            submitBtn.style.color = '#fff';
            
            // Reset form and close after delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
                submitBtn.style.opacity = '';
                submitBtn.disabled = false;
                closeModal();
            }, 1500);
            
        } catch (error) {
            console.error('Contact form error:', error);
            submitBtn.textContent = 'Error - Try Again';
            submitBtn.style.background = '#ef4444';
            submitBtn.style.borderColor = '#ef4444';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
            }, 2000);
        }
    });
    
    function showFormError(msg) {
        const existingError = contactForm.querySelector('.form-error');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = msg;
        errorDiv.style.cssText = 'color: #ef4444; font-size: 0.85rem; text-align: center; margin-bottom: 1rem; padding: 0.5rem; background: rgba(239,68,68,0.1); border-radius: 8px;';
        
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
        
        setTimeout(() => errorDiv.remove(), 4000);
    }

    startESTCounter();
    setInterval(transitionContent, CYCLE_INTERVAL);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
