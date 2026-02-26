import { useState, useEffect, useRef } from "react";

const CL = {
  bg: "#f4f5f7", white: "#fff", hover: "#eef0f4", selected: "#e3f0fc",
  navy: "#1b2a4a", text: "#1e293b", textMd: "#5a6577", textLt: "#8e99a8",
  border: "#e0e4ea", borderDk: "#c8ced8",
  teal: "#00b894", tealBg: "#e0f7f1",
  green: "#27ae60", greenBg: "#d4efdf",
  red: "#e74c3c", redBg: "#fadbd8",
  yellow: "#f39c12", yellowBg: "#fef5e0",
  blue: "#3498db", blueBg: "#d6eaf8",
  purple: "#8e44ad", purpleBg: "#ebdef0",
  orange: "#e67e22", orangeBg: "#fdebd0",
};
const FN = { d: "'Sora',sans-serif", b: "'DM Sans',sans-serif", m: "'JetBrains Mono',monospace" };

const MEALS = [
  { id: "m1", name: "Garlic Butter Pasta", cuisine: "Italian Classics", starred: true, chef: "Me", servings: 2, cookDate: "2026-02-27", notes: "Quick weeknight comfort", tags: ["Italian", "Quick"], folder: "Quick Weeknight",
    ingredients: [{ name: "Spaghetti", amount: 200, unit: "g" }, { name: "Garlic", amount: 4, unit: "cloves" }, { name: "Butter", amount: 3, unit: "tbsp" }, { name: "Olive Oil", amount: 2, unit: "tbsp" }, { name: "Parmesan", amount: 50, unit: "g" }, { name: "Parsley", amount: 2, unit: "tbsp" }, { name: "Red Pepper Flakes", amount: 0.5, unit: "tsp" }, { name: "Salt", amount: 1, unit: "tsp" }],
    steps: ["Boil salted water, cook spaghetti al dente. Reserve pasta water.", "Slice garlic thin. Heat oil + butter medium-low.", "Add garlic + pepper flakes, 2-3 min until golden.", "Toss pasta in pan with splashes of pasta water.", "Off heat — parmesan + parsley. Toss until silky."],
    experience: { timesMade: 12, confidence: "high", skills: ["Boiling pasta", "Garlic technique"], newSkills: [], lastMade: "2 weeks ago" } },
  { id: "m2", name: "Pad Krapow (Thai Basil Chicken)", cuisine: "Southeast Asian", starred: true, chef: "Me", servings: 2, cookDate: "2026-02-28", notes: "Anniversary dinner", tags: ["Thai", "Spicy"], folder: "Thai",
    ingredients: [{ name: "Ground Chicken", amount: 250, unit: "g" }, { name: "Garlic", amount: 3, unit: "cloves" }, { name: "Thai Basil", amount: 1, unit: "cup" }, { name: "Soy Sauce", amount: 1.5, unit: "tbsp" }, { name: "Oyster Sauce", amount: 1, unit: "tbsp" }, { name: "Fish Sauce", amount: 1, unit: "tbsp" }, { name: "Thai Chilies", amount: 3, unit: "pcs" }, { name: "Jasmine Rice", amount: 1, unit: "cup" }, { name: "Eggs", amount: 2, unit: "pcs" }, { name: "Vegetable Oil", amount: 1, unit: "tbsp" }],
    steps: ["Cook rice.", "Pound garlic + chilies.", "Wok screaming hot, oil in. Paste 30 sec.", "Chicken in, break apart, 3-4 min.", "Sauces in. Toss. Kill heat, fold in basil.", "Serve over rice with fried egg."],
    experience: { timesMade: 3, confidence: "medium", skills: ["Wok cooking", "Sauce balancing"], newSkills: ["High-heat wok technique"], lastMade: "1 month ago" } },
  { id: "m3", name: "Honey Garlic Salmon", cuisine: "Seafood", starred: true, chef: "Alana", servings: 2, cookDate: "2026-03-01", notes: "Date night special", tags: ["Seafood", "Elegant"], folder: "Date Night",
    ingredients: [{ name: "Salmon Fillets", amount: 2, unit: "pcs" }, { name: "Garlic", amount: 3, unit: "cloves" }, { name: "Honey", amount: 2, unit: "tbsp" }, { name: "Soy Sauce", amount: 2, unit: "tbsp" }, { name: "Butter", amount: 2, unit: "tbsp" }, { name: "Lemon Juice", amount: 1, unit: "tbsp" }, { name: "Asparagus", amount: 1, unit: "bunch" }, { name: "Olive Oil", amount: 1, unit: "tbsp" }],
    steps: ["Mix honey, soy, garlic, lemon. Marinate salmon 15 min.", "Preheat 400F. Asparagus on sheet with oil + salt.", "Sear salmon skin-up 3 min in butter.", "Flip, pour marinade, into oven with asparagus.", "8-10 min. Serve with pan sauce."],
    experience: { timesMade: 5, confidence: "high", skills: ["Pan searing", "Oven finishing"], newSkills: [], lastMade: "3 weeks ago" } },
  { id: "m4", name: "Crispy Chickpea Bowl", cuisine: "Plant-Based", starred: false, chef: "Me", servings: 4, cookDate: "2026-03-02", notes: "Meal prep Sunday", tags: ["Vegan", "Healthy"], folder: "Meal Prep",
    ingredients: [{ name: "Chickpeas", amount: 2, unit: "cans" }, { name: "Sweet Potatoes", amount: 2, unit: "pcs" }, { name: "Olive Oil", amount: 3, unit: "tbsp" }, { name: "Cumin", amount: 1, unit: "tsp" }, { name: "Smoked Paprika", amount: 1, unit: "tsp" }, { name: "Tahini", amount: 3, unit: "tbsp" }, { name: "Lemon Juice", amount: 2, unit: "tbsp" }, { name: "Rice", amount: 2, unit: "cups" }, { name: "Spinach", amount: 4, unit: "cups" }],
    steps: ["425F. Cube sweet potatoes, oil + paprika.", "Dry chickpeas, oil + cumin. Separate sheet.", "Roast 25-30 min.", "Whisk tahini dressing.", "Bowl: rice, spinach, potatoes, chickpeas, drizzle."],
    experience: { timesMade: 8, confidence: "high", skills: ["Sheet pan roasting", "Dressing making"], newSkills: [], lastMade: "1 week ago" } },
  { id: "m5", name: "Wings and Beer Cheese Dip", cuisine: "American", starred: true, chef: "DoorDash", servings: 6, cookDate: "2026-03-12", notes: "Poker night", tags: ["American", "Party"], folder: "Quick Weeknight",
    ingredients: [{ name: "Chicken Wings", amount: 3, unit: "lbs" }, { name: "Hot Sauce", amount: 0.5, unit: "cup" }, { name: "Butter", amount: 4, unit: "tbsp" }, { name: "Cheddar", amount: 2, unit: "cups" }, { name: "Cream Cheese", amount: 8, unit: "oz" }, { name: "Beer", amount: 0.5, unit: "cup" }],
    steps: ["Order from DoorDash.", "Open door.", "Tip well.", "Plate it like you made it.", "Take credit."],
    experience: { timesMade: 0, confidence: "none", skills: [], newSkills: ["Deep frying", "Making a roux", "Cheese sauce emulsion"], lastMade: "Never" } },
  { id: "m6", name: "Homemade Ramen", cuisine: "Japanese", starred: false, chef: "Me", servings: 2, cookDate: "2026-03-20", notes: "Weekend project", tags: ["Japanese", "Complex"], folder: "Ambitious",
    ingredients: [{ name: "Pork Bones", amount: 2, unit: "lbs" }, { name: "Ramen Noodles", amount: 200, unit: "g" }, { name: "Soy Sauce", amount: 3, unit: "tbsp" }, { name: "Mirin", amount: 2, unit: "tbsp" }, { name: "Eggs", amount: 4, unit: "pcs" }, { name: "Green Onions", amount: 4, unit: "stalks" }, { name: "Nori", amount: 4, unit: "sheets" }, { name: "Garlic", amount: 6, unit: "cloves" }],
    steps: ["Blanch bones 10 min, rinse. Refill pot.", "Simmer 6+ hours with garlic.", "Make tare: soy + mirin base.", "Marinate soft-boil eggs in tare.", "Cook noodles. Assemble. Pour broth. Top."],
    experience: { timesMade: 0, confidence: "low", skills: [], newSkills: ["Bone broth extraction", "Tare preparation", "Chashu braising", "Soft-boil egg timing"], lastMade: "Never" } },
  { id: "m7", name: "Tacos Al Pastor", cuisine: "Mexican", starred: true, chef: "Me", servings: 6, cookDate: "2026-03-05", notes: "Having friends over", tags: ["Mexican", "Party"], folder: "Quick Weeknight",
    ingredients: [{ name: "Pork Shoulder", amount: 2, unit: "lbs" }, { name: "Pineapple", amount: 1, unit: "pc" }, { name: "Achiote Paste", amount: 2, unit: "tbsp" }, { name: "Corn Tortillas", amount: 24, unit: "pcs" }, { name: "Cilantro", amount: 1, unit: "bunch" }, { name: "Limes", amount: 4, unit: "pcs" }, { name: "Garlic", amount: 3, unit: "cloves" }],
    steps: ["Blend marinade: achiote, garlic, pineapple juice.", "Marinate pork overnight.", "Grill pork + pineapple.", "Chop. Warm tortillas.", "Assemble: cilantro, onion, lime."],
    experience: { timesMade: 2, confidence: "medium", skills: ["Grilling", "Marinade making"], newSkills: ["Working with achiote"], lastMade: "2 months ago" } },
  { id: "m8", name: "Beef Wellington", cuisine: "British", starred: false, chef: "DoorDash", servings: 4, cookDate: "", notes: "Lets be honest", tags: ["British", "Complex"], folder: "Ambitious",
    ingredients: [{ name: "Beef Tenderloin", amount: 2, unit: "lbs" }, { name: "Puff Pastry", amount: 1, unit: "sheet" }, { name: "Mushrooms", amount: 1, unit: "lb" }, { name: "Prosciutto", amount: 8, unit: "slices" }, { name: "Dijon Mustard", amount: 2, unit: "tbsp" }],
    steps: ["Acknowledge your limitations.", "Open DoorDash.", "Search beef wellington near me.", "Order.", "Instagram it like you made it."],
    experience: { timesMade: 0, confidence: "none", skills: [], newSkills: ["Duxelles preparation", "Pastry wrapping", "Internal temp precision", "Resting technique"], lastMade: "Never" } },
];

const FOLDERS = [
  { name: "All Meals", tag: null },
  { name: "Quick Weeknight", tag: "Quick Weeknight" },
  { name: "Thai", tag: "Thai" },
  { name: "Date Night", tag: "Date Night" },
  { name: "Meal Prep", tag: "Meal Prep" },
  { name: "Ambitious", tag: "Ambitious" },
  { name: "Ungrouped", tag: null, isDefault: true },
];

const INIT_PANTRY = ["Salt", "Black Pepper", "Olive Oil", "Garlic", "Butter", "Eggs", "Soy Sauce", "Rice"];

/* ─── TOOL CHECKLIST DATA ─── */
const TOOLS = [
  { id: "vscode", name: "VS Code", icon: "💻", desc: "Free code editor — where you'll save your files", link: "https://code.visualstudio.com/download" },
  { id: "apikey", name: "Claude API Key", icon: "🔑", desc: "Get one at console.anthropic.com — it's how your app talks to Claude", link: "https://console.anthropic.com/settings/keys" },
  { id: "claude", name: "Claude Account", icon: "🤖", desc: "Free plan works for your first React artifact. Max plan recommended for heavier builds.", link: "https://claude.ai" },
  { id: "git", name: "Git", icon: "🔧", desc: "Syncs your code to the cloud. Mac: usually pre-installed. Windows: git-scm.com", link: "https://git-scm.com/downloads" },
  { id: "vercel", name: "Vercel", icon: "🚀", desc: "Free hosting — deploy your app to a public URL in 60 seconds", link: "https://vercel.com/signup" },
];

/* ─── MODULES DATA ─── */
const MODULES = [
  { id: "brand", title: "Brand & Aesthetics", icon: "🎨", desc: "Make your app look and feel like YOU — not generic AI output" },
  { id: "mobile", title: "Mobile Responsive", icon: "📱", desc: "If it doesn't work on a phone, half your users can't use it" },
  { id: "auth", title: "Login & Identity", icon: "🔐", desc: "Let users sign up, log in, and own their data" },
  { id: "data", title: "Data Persistence", icon: "💾", desc: "Your app forgets everything when you close the tab. Let's fix that." },
  { id: "deploy", title: "Deploy to the Internet", icon: "🌐", desc: "Put your app on a public URL anyone can visit" },
];

/* ─── MODULE LESSON CONTENT ─── */
const MODULE_LESSONS = {
  brand: {
    concept: "Your app should feel like a product someone designed, not something an AI spit out. Brand is: a name, a color palette, typography, and a personality. It's the difference between 'generic dashboard' and 'Run Recipes'.",
    seeIt: "Look at Run Recipes: navy (#1b2a4a) + teal (#00b894), Sora font for headings, DM Sans for body text. Every color, spacing, and icon was chosen intentionally. The DoorDash jokes? That's brand personality.",
    steps: [
      { title: "Pick a name", desc: "What's your app called? Make it memorable. Run Recipes > 'Recipe Manager'." },
      { title: "Choose 2-3 colors", desc: "One dark (backgrounds/text), one accent (buttons/highlights), one optional secondary. Use coolors.co for palettes." },
      { title: "Pick a mood", desc: "Professional? Playful? Minimal? Tell Claude: 'I want it to feel like [brand you admire] but for [your use case]'." },
      { title: "Light or dark theme", desc: "Dark themes feel premium but are harder to get right. Start with light if unsure." },
    ],
    promptTemplate: "Update my app's aesthetic:\n- App name: [YOUR NAME]\n- Primary color: [HEX]\n- Accent color: [HEX]\n- Mood: [professional/playful/minimal/bold]\n- Theme: [light/dark]\n- Make the typography feel premium — use a distinctive display font for headings and a clean sans-serif for body text.\n- Add subtle touches that show personality (hover effects, micro-copy, empty states with character).",
  },
  mobile: {
    concept: "More than half of web traffic is mobile. If your app only works on desktop, you've already lost most of your users. Responsive design means your layout adapts to any screen size.",
    seeIt: "Try resizing your browser window on Run Recipes. Notice what breaks? That's what we're fixing. On mobile: sidebars collapse, tables become cards, modals go full-screen, hover tooltips become tap targets.",
    steps: [
      { title: "Think in breakpoints", desc: "Desktop (>1024px), Tablet (768-1024px), Mobile (<768px). Your layout should change at each." },
      { title: "Stack, don't shrink", desc: "On mobile, things stack vertically. A 3-column desktop layout becomes 1 column on mobile." },
      { title: "Touch targets", desc: "Buttons need to be at least 44x44px on mobile. Hover effects don't work — use tap/click instead." },
      { title: "Test it", desc: "In Chrome: right-click → Inspect → click the phone icon (top-left). Test at iPhone SE (375px) and iPad (768px)." },
    ],
    promptTemplate: "Make my app fully mobile responsive:\n- Add a useMediaQuery hook that detects screen width\n- Desktop (>1024px): current layout\n- Tablet (768-1024px): collapse sidebar, stack panels\n- Mobile (<768px): bottom tab navigation, card-based layouts instead of tables, full-screen modals for detail views\n- Replace all hover tooltips with tap-to-toggle on mobile\n- Ensure all buttons are at least 44px touch targets\n- Test: everything should work at 375px width (iPhone SE)",
  },
  auth: {
    concept: "Right now anyone who opens your app sees the same thing. Login/identity means each user gets their own space — their own data, their own settings, their own experience. It's what turns a demo into a product.",
    seeIt: "In Run Recipes, notice the user avatar in the nav? That's Supabase auth. When you log in, your recipes, pantry, and progress are yours. Log out, log in on another device — everything's there.",
    steps: [
      { title: "Create a Supabase project", desc: "Go to supabase.com → New Project → Pick a name and password. Free tier is generous." },
      { title: "Get your keys", desc: "In Supabase dashboard: Settings → API. Copy your Project URL and anon/public key." },
      { title: "Add to Vercel", desc: "Vercel → Project Settings → Environment Variables. Add SUPABASE_URL and SUPABASE_ANON_KEY." },
      { title: "Add auth to your app", desc: "Tell Claude to add a login/signup modal using your Supabase credentials." },
    ],
    promptTemplate: "Add authentication to my app using Supabase:\n- Add a login/signup modal with email + password\n- Show user email and a logout button in the nav bar when logged in\n- If not logged in, show a 'Sign In' button in the nav\n- Use fetch calls to /api/auth for all auth operations (signup, login, get_progress, save_progress)\n- Store the access_token in React state (not localStorage)\n- Protect features that need auth with a 'please log in' prompt\n- Make the auth UI clean and professional — not an afterthought",
  },
  data: {
    concept: "Your app right now has amnesia. Close the tab, everything resets. Data persistence means saving user data to a database so it survives across sessions, devices, and time. Think of it as giving your app a memory.",
    seeIt: "In Run Recipes, your pantry items and recipe edits persist because they're saved to Supabase. The pre-loaded recipes are seed data (same for everyone), but your changes are yours.",
    steps: [
      { title: "Design your tables", desc: "What data does your app need to save? Users, items, settings? Each becomes a table. Think of tables as spreadsheets." },
      { title: "Create tables in Supabase", desc: "Supabase dashboard → SQL Editor → Write CREATE TABLE statements (Claude can generate these for you)." },
      { title: "Add Row Level Security", desc: "RLS ensures users only see their own data. It's one line of SQL per table." },
      { title: "Connect your app", desc: "Use fetch calls to Supabase's REST API to read and write data. Claude can wire this up." },
    ],
    promptTemplate: "Add data persistence to my app using Supabase:\n- Design the database tables I need for [describe your data]\n- Generate the SQL CREATE TABLE statements with appropriate types\n- Add Row Level Security so users only see their own data\n- Replace in-memory state with Supabase reads/writes\n- Keep pre-loaded sample data as defaults for new users\n- Add loading states while data fetches\n- Handle errors gracefully (show friendly messages, not crashes)\n- Generate the complete SQL I need to run in Supabase's SQL Editor",
  },
  deploy: {
    concept: "Your app lives on your computer right now. Deployment puts it on the internet with a URL anyone can visit. It goes from 'look at my screen' to 'here's the link'. Vercel makes this nearly free and automatic.",
    seeIt: "Run Recipes is deployed on Vercel right now — that's how you're using it. Every time we push code to GitHub, Vercel automatically rebuilds and redeploys in about 60 seconds.",
    steps: [
      { title: "Push to GitHub", desc: "git init → git add . → git commit -m 'initial' → create repo on github.com → git push. Your code is now in the cloud." },
      { title: "Connect Vercel", desc: "vercel.com → Import Project → Select your GitHub repo. Vercel auto-detects Vite/React." },
      { title: "Set environment variables", desc: "Any API keys or secrets go in Vercel's Environment Variables, not in your code." },
      { title: "Deploy", desc: "Click Deploy. Wait 60 seconds. You get a live URL. Share it with anyone." },
      { title: "Auto-deploy updates", desc: "Every git push automatically triggers a new deployment. Change code → push → live in 60 seconds." },
    ],
    promptTemplate: "Help me deploy my React app to Vercel:\n- Generate the git commands I need to push to GitHub\n- Walk me through connecting Vercel to my GitHub repo\n- List which environment variables I need to set\n- Explain how auto-deployment works\n- Show me how to set up a custom domain (optional)",
  },
};


const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #c8ced8; border-radius: 3px; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(0,184,148,0.3); } 50% { box-shadow: 0 0 0 6px rgba(0,184,148,0); } }
.fu { animation: fadeUp 0.3s ease-out; }
`;

/* ─── JARGON GLOSSARY (Action 2) ─── */
const JARGON = {
  "VS Code": "A free app for viewing and editing code. Like Microsoft Word, but for code.",
  "GitHub": "A website that stores your code in the cloud. Like Google Drive for code projects.",
  "Git": "A tool that syncs code between your computer and GitHub. The behind-the-scenes messenger.",
  "repo": "Short for 'repository' — a project folder stored on GitHub.",
  "repository": "A project folder on GitHub containing all your code files and their history.",
  "Terminal": "The text-based command center on your computer. You type commands instead of clicking buttons.",
  "artifact": "When Claude builds something visual and shows it to you right in the chat.",
  "deploy": "Putting your app on the internet so anyone with the link can use it.",
  "Vercel": "A free service that hosts your app on the internet. Connect GitHub and it does the rest.",
  "localhost": "Your app running privately on your own computer — only you can see it.",
  "React": "A popular toolkit for building interactive web apps. Made by Meta/Facebook.",
  "JSX": "A way to write HTML-like code inside JavaScript. How React describes what things look like.",
  "API": "A way for apps to talk to each other. Like a waiter taking your order to the kitchen.",
  "Artifacts": "Claude's feature that renders live, interactive previews of code in the chat window.",
  "Feature Previews": "Settings in Claude where you turn on experimental features like Artifacts.",
  "push": "Uploading your code from your computer to GitHub.",
};

function JargonText({ text }) {
  const [activeKey, setActiveKey] = useState(null);
  const [tPos, setTPos] = useState({ x: 0, y: 0 });
  const keys = Object.keys(JARGON).sort((a, b) => b.length - a.length);
  const escaped = keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp("(" + escaped.join("|") + ")", "gi");
  const parts = text.split(regex);
  function handleEnter(e, term) {
    const r = e.target.getBoundingClientRect();
    setTPos({ x: r.left + r.width / 2, y: r.bottom + 6 });
    setActiveKey(term);
  }
  return (
    <span>{parts.map((part, i) => {
      const mk = keys.find(k => k.toLowerCase() === part.toLowerCase());
      if (mk) return (
        <span key={i} style={{ position: "relative", display: "inline" }}>
          <span onMouseEnter={(e) => handleEnter(e, mk)} onMouseLeave={() => setActiveKey(null)}
            style={{ color: CL.blue, borderBottom: "1.5px dashed " + CL.blue + "60", cursor: "help", fontWeight: 500 }}>{part}</span>
          {activeKey === mk && (
            <div style={{ position: "fixed", left: tPos.x, top: tPos.y, transform: "translateX(-50%)", zIndex: 9999, background: CL.navy, color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 11, lineHeight: 1.5, maxWidth: 260, boxShadow: "0 4px 16px rgba(0,0,0,.2)", fontFamily: FN.b, fontWeight: 400, pointerEvents: "none" }}>
              <div style={{ fontSize: 9, color: CL.teal, fontFamily: FN.m, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.5px" }}>nerd lingo</div>
              <strong>{mk}</strong>: {JARGON[mk]}
            </div>
          )}
        </span>
      );
      return <span key={i}>{part}</span>;
    })}</span>
  );
}

/* ─── HELP CHAT (Action 1) ─── */
function HelpChat({ context, phaseLabel }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => { setMessages([]); setOpen(false); }, [phaseLabel]);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    const sys = "You are a friendly, patient onboarding assistant. The user is on: \"" + phaseLabel + "\". Context: " + context + ". RULES: Assume ZERO technical knowledge. 2-4 sentences. Be warm. Give exact actions. Use analogies. Never make them feel dumb.";
    try {
      const answer = await callAIText(userMsg, sys);
      setMessages(prev => [...prev, { role: "assistant", text: answer }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Couldn't connect — try again!" }]);
    }
    setLoading(false);
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, border: "1.5px solid " + CL.teal + "40", background: CL.tealBg, color: CL.teal, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FN.b, animation: "pulseGlow 2s ease-in-out infinite" }}>
      <span style={{ fontSize: 15 }}>💬</span> Need help?
    </button>
  );

  return (
    <div style={{ border: "1.5px solid " + CL.teal + "40", borderRadius: 12, overflow: "hidden", background: CL.white }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: CL.tealBg, borderBottom: "1px solid " + CL.teal + "20" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: CL.teal, fontFamily: FN.d }}>💬 Help</span>
        <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: CL.textLt, fontSize: 16 }}>×</button>
      </div>
      <div ref={scrollRef} style={{ maxHeight: 180, overflowY: "auto", padding: 10 }}>
        {messages.length === 0 && <div style={{ fontSize: 11, color: CL.textLt, textAlign: "center", padding: "12px 8px", lineHeight: 1.5 }}>No question is too basic!</div>}
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 6 }}>
            <div style={{ maxWidth: "85%", padding: "7px 11px", borderRadius: 10, fontSize: 12, lineHeight: 1.5, background: m.role === "user" ? CL.teal : CL.bg, color: m.role === "user" ? "#fff" : CL.text, fontFamily: FN.b }}>{m.text}</div>
          </div>
        ))}
        {loading && <div style={{ display: "flex", marginBottom: 6 }}><div style={{ padding: "7px 11px", borderRadius: 10, background: CL.bg, fontSize: 12, color: CL.textLt }}><span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid " + CL.teal, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .6s linear infinite", verticalAlign: "middle", marginRight: 6 }} />Thinking...</div></div>}
      </div>
      <div style={{ display: "flex", gap: 6, padding: "8px 10px", borderTop: "1px solid " + CL.border }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything..." style={{ flex: 1, padding: "6px 10px", borderRadius: 8, border: "1px solid " + CL.border, fontSize: 12, fontFamily: FN.b, outline: "none" }} />
        <button onClick={send} disabled={loading} style={{ padding: "6px 14px", borderRadius: 8, background: CL.teal, color: "#fff", border: "none", fontSize: 11, fontWeight: 600, cursor: loading ? "wait" : "pointer" }}>Send</button>
      </div>
    </div>
  );
}

async function callAI(prompt, sys) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys || "Creative witty chef. Valid JSON only. No markdown fences.", messages: [{ role: "user", content: prompt }] }),
    });
    const data = await res.json();
    const text = data.content?.map((b) => b.text || "").join("") || "";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch { return null; }
}

async function callAIText(prompt, sys) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 500, system: sys || "Helpful friendly chef. 2-3 sentences max.", messages: [{ role: "user", content: prompt }] }),
    });
    const data = await res.json();
    return data.content?.map((b) => b.text || "").join("") || "Try again!";
  } catch { return "Something went wrong."; }
}

function calcYesChef(meal, pantry) {
  if (meal.chef === "DoorDash") return { score: 100, color: CL.green, pantryPct: 100, expPct: 100, have: [], missing: [], exp: meal.experience };

  const pl = pantry.map((p) => p.toLowerCase());
  const have = [];
  const missing = [];
  meal.ingredients.forEach((i) => {
    const n = i.name.toLowerCase();
    (pl.some((p) => n.includes(p) || p.includes(n)) ? have : missing).push(i.name);
  });
  const pantryPct = Math.round((have.length / meal.ingredients.length) * 100);

  const ex = meal.experience || { timesMade: 0, confidence: "low", newSkills: [] };
  const confMap = { high: 95, medium: 65, low: 30, none: 10 };
  const confScore = confMap[ex.confidence] || 30;
  const timesBonus = Math.min(ex.timesMade * 5, 30);
  const newSkillPenalty = Math.min(ex.newSkills.length * 12, 40);
  const expPct = Math.min(100, Math.max(0, Math.round(confScore + timesBonus - newSkillPenalty)));

  const blended = Math.round(pantryPct * 0.6 + expPct * 0.4);
  const color = blended >= 75 ? CL.green : blended >= 45 ? CL.yellow : CL.red;

  return { score: blended, color, pantryPct, expPct, have, missing, exp: ex };
}

function BuildIcon({ onClick }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} title="Build Your Own"
      style={{ width: 32, height: 32, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: h ? `linear-gradient(135deg, ${CL.teal}, ${CL.blue})` : CL.bg, border: `1px solid ${h ? CL.teal : CL.border}`, transition: "all 0.2s" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={h ? "#fff" : CL.textMd} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 4.5H18l-3.5 2.8 1.3 4.5L12 12.2l-3.8 2.6 1.3-4.5L6 7.5h4.5z" />
        <path d="M5 20h14" /><path d="M12 16v4" />
      </svg>
    </div>
  );
}

function NavBar({ activeView, onView, onBuild }) {
  const [drop, setDrop] = useState(null);
  const items = [
    { id: "inspect", label: "Inspect", sub: "Meal Inspection", view: "grid" },
    { id: "forecast", label: "Ingredient Forecast", sub: "Pantry", view: "pantry" },
    { id: "analyze", label: "Grocery Analyze", sub: "Groceries", view: "grocery" },
  ];
  return (
    <div style={{ background: CL.white, borderBottom: `1px solid ${CL.border}`, display: "flex", alignItems: "center", height: 44, padding: "0 16px", fontFamily: FN.b, fontSize: 13, position: "relative", zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 24, padding: "4px 12px 4px 8px", background: CL.bg, borderRadius: 6, border: `1px solid ${CL.border}` }}>
        <div style={{ width: 22, height: 22, borderRadius: 4, background: `linear-gradient(135deg, ${CL.teal}, ${CL.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🍳</div>
        <span style={{ fontFamily: FN.d, fontWeight: 700, fontSize: 13, color: CL.navy }}>Run Recipes</span>
      </div>
      {items.map((item) => {
        const isA = activeView === item.view;
        return (
          <div key={item.id} style={{ position: "relative", marginRight: 2 }} onMouseEnter={() => setDrop(item.id)} onMouseLeave={() => setDrop(null)}>
            <button onClick={() => onView(item.view)} style={{ padding: "10px 12px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: FN.b, color: isA ? CL.teal : CL.text, borderBottom: isA ? `2px solid ${CL.teal}` : "2px solid transparent", display: "flex", alignItems: "center", gap: 4 }}>
              {item.label} <span style={{ fontSize: 8, color: CL.textLt }}>▼</span>
            </button>
            {drop === item.id && (
              <div style={{ position: "absolute", top: "100%", left: 0, background: CL.white, border: `1px solid ${CL.border}`, borderRadius: 6, padding: 4, minWidth: 160, boxShadow: "0 4px 12px rgba(0,0,0,.1)", zIndex: 200 }}>
                <div onClick={() => { onView(item.view); setDrop(null); }} style={{ padding: "8px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12, background: CL.hover }}>{item.sub}</div>
              </div>
            )}
          </div>
        );
      })}
      <div style={{ flex: 1 }} />
      <BuildIcon onClick={onBuild} />
    </div>
  );
}

function FilterBar({ meals, filterChef, onFilterChef }) {
  const total = meals.reduce((s, m) => s + m.servings, 0);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 16px", borderBottom: `1px solid ${CL.border}`, background: CL.white, fontSize: 12, flexWrap: "wrap" }}>
      <span style={{ color: CL.textMd }}>AI-Led</span>
      <span style={{ fontWeight: 600, color: CL.navy }}>Meal Inspection</span>
      <div style={{ width: 1, height: 18, background: CL.border }} />
      <span style={{ background: CL.teal, color: "#fff", padding: "1px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{total} servings</span>
      <span style={{ background: CL.blueBg, color: CL.blue, padding: "1px 6px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{meals.length}</span>
      <div style={{ width: 1, height: 18, background: CL.border }} />
      {["All", "Me", "Alana", "DoorDash"].map((f) => (
        <button key={f} onClick={() => onFilterChef(f)} style={{ padding: "2px 10px", borderRadius: 12, border: `1px solid ${filterChef === f ? CL.teal : CL.border}`, background: filterChef === f ? CL.tealBg : "transparent", color: filterChef === f ? CL.teal : CL.textMd, fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: FN.b }}>
          {f === "DoorDash" ? "🛵 DoorDash" : f === "All" ? "All Chefs" : f}
        </button>
      ))}
    </div>
  );
}

function FolderPanel({ active, onSelect, meals }) {
  function count(f) {
    if (!f.tag && !f.isDefault) return meals.length;
    if (f.isDefault) return meals.filter((m) => !["Quick Weeknight", "Thai", "Date Night", "Meal Prep", "Ambitious"].includes(m.folder)).length;
    return meals.filter((m) => m.folder === f.tag).length;
  }
  return (
    <div style={{ width: 170, minWidth: 170, borderRight: `1px solid ${CL.border}`, background: CL.white, fontSize: 12 }}>
      <div style={{ padding: "10px 12px", borderBottom: `1px solid ${CL.border}`, fontWeight: 600, color: CL.navy }}>Groups</div>
      <div style={{ padding: 6 }}>
        {FOLDERS.map((f, i) => (
          <div key={i} onClick={() => onSelect(f.name)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px", borderRadius: 6, cursor: "pointer", marginBottom: 1, background: active === f.name ? CL.selected : "transparent", color: active === f.name ? CL.blue : CL.text, fontWeight: active === f.name ? 600 : 400 }}>
            <span>{f.name === "All Meals" ? "📋" : "📂"} {f.name}</span>
            <span style={{ fontSize: 10, color: CL.textLt, fontFamily: FN.m }}>{count(f)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function YesChefBadge({ meal, pantry }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const yc = calcYesChef(meal, pantry);
  const label = meal.chef === "DoorDash" ? "🛵 100" : String(yc.score);

  function handleEnter() {
    if (ref.current) { const r = ref.current.getBoundingClientRect(); setPos({ x: r.left + r.width / 2, y: r.bottom + 8 }); }
    setShow(true);
  }

  function MiniBar({ pct, color }) {
    return (
      <div style={{ width: "100%", height: 6, background: CL.bg, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 3, transition: "width 0.3s" }} />
      </div>
    );
  }

  return (
    <>
      <div ref={ref} onMouseEnter={handleEnter} onMouseLeave={() => setShow(false)}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 44, height: 28, borderRadius: 6, fontFamily: FN.d, fontWeight: 700, fontSize: 13, color: yc.color, background: yc.color + "18", border: `1.5px solid ${yc.color}40`, cursor: "pointer" }}>
        {label}
      </div>
      {show && (
        <div style={{ position: "fixed", left: pos.x, top: pos.y, transform: "translateX(-50%)", zIndex: 9999, background: CL.white, border: `1px solid ${CL.border}`, borderRadius: 10, padding: 14, boxShadow: "0 8px 24px rgba(0,0,0,.12)", width: 270, fontSize: 11 }}>
          <div style={{ fontFamily: FN.d, fontWeight: 700, fontSize: 14, marginBottom: 10, color: CL.navy, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Yes Chef Score</span>
            <span style={{ color: yc.color, fontSize: 18 }}>{yc.score}%</span>
          </div>

          {meal.chef === "DoorDash" ? (
            <div style={{ color: CL.textMd, lineHeight: 1.6 }}>🛵 DoorDash handles this one. Score is always 100%. Your only job is answering the door.</div>
          ) : (
            <>
              {/* Ingredient Readiness */}
              <div style={{ marginBottom: 12, padding: "8px 10px", background: CL.bg, borderRadius: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: CL.navy, fontSize: 11 }}>🥘 Ingredient Readiness</span>
                  <span style={{ fontFamily: FN.m, fontWeight: 600, color: yc.pantryPct >= 75 ? CL.green : yc.pantryPct >= 40 ? CL.yellow : CL.red }}>{yc.pantryPct}%</span>
                </div>
                <MiniBar pct={yc.pantryPct} color={yc.pantryPct >= 75 ? CL.green : yc.pantryPct >= 40 ? CL.yellow : CL.red} />
                <div style={{ marginTop: 6, color: CL.textMd, lineHeight: 1.4 }}>
                  {yc.have.length > 0 && <div><span style={{ color: CL.green }}>✓</span> {yc.have.join(", ")}</div>}
                  {yc.missing.length > 0 && <div style={{ marginTop: 2 }}><span style={{ color: CL.red }}>✗</span> {yc.missing.join(", ")}</div>}
                  {yc.missing.length === 0 && <div style={{ color: CL.green }}>All ingredients in stock!</div>}
                </div>
              </div>

              {/* Experience Factor */}
              <div style={{ padding: "8px 10px", background: CL.bg, borderRadius: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: CL.navy, fontSize: 11 }}>👨‍🍳 Personal Experience</span>
                  <span style={{ fontFamily: FN.m, fontWeight: 600, color: yc.expPct >= 70 ? CL.green : yc.expPct >= 40 ? CL.yellow : CL.red }}>{yc.expPct}%</span>
                </div>
                <MiniBar pct={yc.expPct} color={yc.expPct >= 70 ? CL.green : yc.expPct >= 40 ? CL.yellow : CL.red} />
                <div style={{ marginTop: 6, color: CL.textMd, lineHeight: 1.5, fontSize: 10 }}>
                  <div>Times made: <strong>{yc.exp.timesMade}</strong> · Last: {yc.exp.lastMade}</div>
                  <div>Confidence: <strong style={{ color: yc.exp.confidence === "high" ? CL.green : yc.exp.confidence === "medium" ? CL.yellow : CL.red }}>{yc.exp.confidence}</strong></div>
                  {yc.exp.skills?.length > 0 && <div style={{ marginTop: 2 }}><span style={{ color: CL.green }}>✓</span> {yc.exp.skills.join(", ")}</div>}
                  {yc.exp.newSkills?.length > 0 && <div style={{ marginTop: 2 }}><span style={{ color: CL.orange }}>⚡</span> New: {yc.exp.newSkills.join(", ")}</div>}
                </div>
              </div>

              <div style={{ marginTop: 8, fontSize: 10, color: CL.textLt, fontFamily: FN.m, textAlign: "center" }}>
                60% ingredients · 40% experience
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

function MealGrid({ meals, selectedId, onSelect, pantry, filterChef, activeFolder }) {
  let list = meals;
  if (filterChef !== "All") list = list.filter((m) => m.chef === filterChef);
  const af = FOLDERS.find((f) => f.name === activeFolder);
  if (af && af.tag) list = list.filter((m) => m.folder === af.tag);
  if (af && af.isDefault) list = list.filter((m) => !["Quick Weeknight", "Thai", "Date Night", "Meal Prep", "Ambitious"].includes(m.folder));

  const hs = { padding: "9px 10px", fontSize: 10, fontWeight: 600, color: CL.textLt, textTransform: "uppercase", fontFamily: FN.m, letterSpacing: "0.5px", borderBottom: `2px solid ${CL.border}`, background: CL.white, position: "sticky", top: 0, zIndex: 10, textAlign: "left" };
  const cs = { padding: "9px 10px", textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };

  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: FN.b }}>
        <thead><tr>
          <th style={{ ...hs, width: 28 }}></th>
          <th style={{ ...hs, minWidth: 200 }}>NAME</th>
          <th style={{ ...hs, width: 100, textAlign: "center" }}>YES CHEF SCORE</th>
          <th style={{ ...hs, width: 90 }}>CHEF</th>
          <th style={{ ...hs, width: 70, textAlign: "center" }}>SERVINGS</th>
          <th style={{ ...hs, width: 110 }}>COOK DATE</th>
          <th style={{ ...hs, minWidth: 160 }}>NOTES</th>
        </tr></thead>
        <tbody>
          {list.map((m) => {
            const isSel = selectedId === m.id;
            const da = m.cookDate ? Math.ceil((new Date(m.cookDate) - new Date()) / 86400000) : null;
            const dc = da === null ? CL.textLt : da < 0 ? CL.red : da <= 2 ? CL.yellow : CL.green;
            const db = da === null ? "transparent" : da < 0 ? CL.redBg : da <= 2 ? CL.yellowBg : CL.greenBg;
            return (
              <tr key={m.id} onClick={() => onSelect(m.id)} style={{ cursor: "pointer", background: isSel ? CL.selected : CL.white, borderBottom: `1px solid ${CL.border}` }}
                onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = CL.hover; }}
                onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = CL.white; }}>
                <td style={{ ...cs, textAlign: "center", color: m.starred ? CL.orange : CL.borderDk, fontSize: 15 }}>{m.starred ? "★" : "☆"}</td>
                <td style={cs}><div style={{ fontWeight: 600, color: CL.navy }}>{m.name}</div><div style={{ fontSize: 11, color: CL.textLt }}>{m.cuisine}</div></td>
                <td style={{ ...cs, textAlign: "center", overflow: "visible" }}><YesChefBadge meal={m} pantry={pantry} /></td>
                <td style={{ ...cs, fontSize: 12, color: m.chef === "DoorDash" ? CL.red : CL.textMd }}>{m.chef === "DoorDash" ? "🛵 " : ""}{m.chef}</td>
                <td style={{ ...cs, textAlign: "center", fontFamily: FN.m, fontWeight: 600 }}>{m.servings}</td>
                <td style={cs}>{m.cookDate ? <span style={{ padding: "2px 8px", borderRadius: 4, background: db, color: dc, fontSize: 12, fontWeight: 500 }}>{new Date(m.cookDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span> : <span style={{ color: CL.textLt }}>—</span>}</td>
                <td style={{ ...cs, color: CL.textMd, fontSize: 12 }}>{m.notes}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot><tr style={{ borderTop: `2px solid ${CL.border}`, background: CL.bg }}>
          <td colSpan={4} style={{ padding: "8px 10px", fontSize: 11, color: CL.textLt, fontFamily: FN.m }}>STARRED ▲ <strong style={{ color: CL.orange }}>{list.filter((m) => m.starred).reduce((s, m) => s + m.servings, 0)}</strong> servings</td>
          <td style={{ padding: "8px 10px", fontSize: 11, fontFamily: FN.m, textAlign: "center" }}><strong>{list.reduce((s, m) => s + m.servings, 0)}</strong></td>
          <td colSpan={2} style={{ padding: "8px 10px", fontSize: 11, color: CL.textLt, fontFamily: FN.m, textAlign: "right" }}>{list.length} meals</td>
        </tr></tfoot>
      </table>
    </div>
  );
}

function DetailSidebar({ meal, pantry, onClose }) {
  const [insights, setInsights] = useState(null);
  const [iLoad, setILoad] = useState(false);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [asking, setAsking] = useState(false);
  const yc = calcYesChef(meal, pantry);
  const daysTo = meal.cookDate ? Math.max(0, Math.ceil((new Date(meal.cookDate) - new Date()) / 86400000)) : "—";

  useEffect(() => { setInsights(null); setA(""); setQ(""); }, [meal.id]);

  async function loadInsights() {
    setILoad(true);
    const r = await callAI(`Recipe:"${meal.name}"(${meal.cuisine}).Ingredients:${meal.ingredients.map((i) => i.name).join(",")}.Chef:${meal.chef}.Experience:made ${meal.experience?.timesMade || 0} times,confidence:${meal.experience?.confidence || "unknown"}.Give 4 short insights mixing tips,fun facts,flavor advice,and one comment about their experience level with this dish.Return:{"insights":["..."]}`);
    setInsights(r?.insights || ["Could not generate insights."]); setILoad(false);
  }

  async function handleAsk() {
    if (!q.trim()) return; setAsking(true);
    const ans = await callAIText(`Recipe:"${meal.name}".Ingredients:${meal.ingredients.map((i) => i.amount + " " + i.unit + " " + i.name).join(",")}.Question:${q}`);
    setA(ans); setAsking(false);
  }

  return (
    <div style={{ width: 330, minWidth: 330, borderLeft: `1px solid ${CL.border}`, background: CL.white, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{ padding: "12px 14px", borderBottom: `1px solid ${CL.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div><div style={{ fontFamily: FN.d, fontWeight: 700, fontSize: 14, color: CL.navy }}>{meal.name}</div><div style={{ fontSize: 11, color: CL.textLt }}>{meal.cuisine}</div></div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: CL.textLt, fontSize: 18 }}>x</button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {[{ l: "DAYS TO COOK", v: daysTo, c: CL.navy }, { l: "SERVINGS", v: meal.servings, c: CL.navy }, { l: "YES CHEF", v: yc.score + "%", c: yc.color }].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: 8, background: CL.bg, borderRadius: 6 }}>
              <div style={{ fontSize: 9, color: CL.textLt, fontFamily: FN.m }}>{s.l}</div>
              <div style={{ fontFamily: FN.d, fontSize: 20, fontWeight: 700, color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 14 }}>✨</span>
            <span style={{ fontFamily: FN.d, fontWeight: 600, fontSize: 12, color: CL.navy }}>Meal Insights</span>
            {!insights && !iLoad && <button onClick={loadInsights} style={{ marginLeft: "auto", padding: "3px 10px", borderRadius: 6, background: CL.purpleBg, color: CL.purple, border: "none", fontSize: 11, fontWeight: 500, cursor: "pointer" }}>Generate</button>}
          </div>
          {iLoad && <div style={{ padding: 12, textAlign: "center", color: CL.textLt, fontSize: 12 }}><div style={{ width: 16, height: 16, border: `2px solid ${CL.purple}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block", marginRight: 6, verticalAlign: "middle" }} />Thinking...</div>}
          {insights && insights.map((ins, i) => <div key={i} style={{ padding: "6px 10px", background: CL.bg, borderRadius: 6, fontSize: 11, lineHeight: 1.5, color: CL.textMd, marginBottom: 4 }}>{ins}</div>)}
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: FN.d, fontWeight: 600, fontSize: 12, color: CL.navy, marginBottom: 8 }}>Ingredients</div>
          {meal.ingredients.map((ing, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${CL.bg}`, fontSize: 12 }}><span>{ing.name}</span><span style={{ fontFamily: FN.m, fontSize: 11, color: CL.teal }}>{ing.amount} {ing.unit}</span></div>)}
        </div>
        <div>
          <div style={{ fontFamily: FN.d, fontWeight: 600, fontSize: 12, color: CL.navy, marginBottom: 8 }}>Steps</div>
          {meal.steps.map((s, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 12, lineHeight: 1.5 }}><span style={{ minWidth: 18, height: 18, borderRadius: "50%", background: CL.tealBg, color: CL.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, fontFamily: FN.m, flexShrink: 0 }}>{i + 1}</span><span style={{ color: CL.textMd }}>{s}</span></div>)}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${CL.border}`, padding: "10px 14px", background: CL.bg }}>
        {a && <div style={{ padding: "8px 10px", background: CL.white, borderRadius: 6, border: `1px solid ${CL.border}`, marginBottom: 8, fontSize: 12, lineHeight: 1.5, color: CL.textMd }}>{a}</div>}
        <div style={{ display: "flex", gap: 6 }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAsk()} placeholder="Ask about this meal..." style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: `1px solid ${CL.border}`, fontSize: 12, fontFamily: FN.b, outline: "none", background: CL.white }} />
          <button onClick={handleAsk} disabled={asking} style={{ padding: "8px 12px", borderRadius: 6, background: CL.teal, color: "#fff", border: "none", fontSize: 11, fontWeight: 600, cursor: asking ? "wait" : "pointer" }}>{asking ? "..." : "Ask"}</button>
        </div>
      </div>
    </div>
  );
}

function PantryView({ pantry, onAdd, onRemove, onClear }) {
  const [input, setInput] = useState("");
  function add() { if (input.trim()) { onAdd(input.trim()); setInput(""); } }
  return (
    <div style={{ flex: 1, overflow: "auto", padding: "24px 32px", background: CL.bg }}>
      <h2 style={{ fontFamily: FN.d, fontSize: 20, fontWeight: 700, color: CL.navy, marginBottom: 4 }}>Ingredient Forecast</h2>
      <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 20 }}>Stock your pantry to improve Yes Chef Scores across the board.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Add pantry item..." style={{ flex: 1, padding: "8px 14px", borderRadius: 8, border: `1px solid ${CL.border}`, fontSize: 13, fontFamily: FN.b, outline: "none", background: CL.white }} />
        <button onClick={add} style={{ padding: "8px 16px", borderRadius: 8, background: CL.teal, color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>Add</button>
        {pantry.length > 0 && <button onClick={onClear} style={{ padding: "8px 14px", borderRadius: 8, background: CL.redBg, color: CL.red, border: "none", fontSize: 12, cursor: "pointer" }}>Clear</button>}
      </div>
      <div style={{ background: CL.white, borderRadius: 8, border: `1px solid ${CL.border}`, padding: 16 }}>
        {pantry.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {pantry.map((p, i) => <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: CL.orangeBg, fontSize: 12, color: CL.orange, fontWeight: 500 }}>{p}<button onClick={() => onRemove(p)} style={{ background: "none", border: "none", cursor: "pointer", color: CL.textLt, fontSize: 14, padding: 0 }}>x</button></span>)}
          </div>
        ) : <div style={{ textAlign: "center", padding: 32, color: CL.textLt }}>Add items to boost your Yes Chef Scores</div>}
      </div>
    </div>
  );
}

function GroceryView({ meals, pantry }) {
  const [sel, setSel] = useState(() => { const o = {}; meals.filter((m) => m.chef !== "DoorDash").forEach((m) => { o[m.id] = true; }); return o; });
  const [checked, setChecked] = useState({});
  const selected = meals.filter((m) => sel[m.id]);
  const agg = {};
  selected.forEach((r) => r.ingredients.forEach((i) => { const k = i.name.toLowerCase() + "|" + i.unit; if (!agg[k]) agg[k] = { name: i.name, unit: i.unit, amount: 0, count: 0 }; agg[k].amount += i.amount; agg[k].count++; }));
  const pl = pantry.map((p) => p.toLowerCase());
  const items = Object.values(agg).sort((a, b) => a.name.localeCompare(b.name));
  const need = items.filter((i) => !pl.some((p) => i.name.toLowerCase().includes(p) || p.includes(i.name.toLowerCase())));
  const have = items.filter((i) => pl.some((p) => i.name.toLowerCase().includes(p) || p.includes(i.name.toLowerCase())));

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "24px 32px", background: CL.bg }}>
      <h2 style={{ fontFamily: FN.d, fontSize: 20, fontWeight: 700, color: CL.navy, marginBottom: 4 }}>Grocery Analyze</h2>
      <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 20 }}>Select meals. We deduplicate and subtract your pantry.</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {meals.filter((m) => m.chef !== "DoorDash").map((m) => <button key={m.id} onClick={() => setSel((p) => ({ ...p, [m.id]: !p[m.id] }))} style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", border: `1px solid ${sel[m.id] ? CL.teal : CL.border}`, background: sel[m.id] ? CL.tealBg : CL.white, color: sel[m.id] ? CL.teal : CL.textMd }}>{sel[m.id] ? "✓ " : ""}{m.name}</button>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: have.length > 0 ? "1fr 1fr" : "1fr", gap: 16 }}>
        <div style={{ background: CL.white, borderRadius: 8, border: `1px solid ${CL.border}`, padding: 16 }}>
          <div style={{ fontSize: 11, fontFamily: FN.m, color: CL.textLt, marginBottom: 10 }}>NEED TO BUY - {need.length}</div>
          {need.map((i, idx) => { const k = i.name + i.unit; return (
            <div key={idx} onClick={() => setChecked((p) => ({ ...p, [k]: !p[k] }))} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${CL.bg}`, cursor: "pointer", fontSize: 12 }}>
              <span style={{ width: 15, height: 15, borderRadius: 3, border: `2px solid ${checked[k] ? CL.green : CL.borderDk}`, background: checked[k] ? CL.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", flexShrink: 0 }}>{checked[k] ? "✓" : ""}</span>
              <span style={{ flex: 1, textDecoration: checked[k] ? "line-through" : "none", color: checked[k] ? CL.textLt : CL.text }}>{i.name}</span>
              <span style={{ fontFamily: FN.m, fontSize: 11, color: CL.teal }}>{Math.round(i.amount * 100) / 100} {i.unit}</span>
              {i.count > 1 && <span style={{ fontSize: 9, color: CL.purple, fontFamily: FN.m }}>x{i.count}</span>}
            </div>); })}
          {need.length === 0 && <div style={{ textAlign: "center", padding: 20, color: CL.green, fontSize: 12 }}>Pantry covers everything!</div>}
        </div>
        {have.length > 0 && <div style={{ background: CL.white, borderRadius: 8, border: `1px solid ${CL.orange}30`, padding: 16 }}>
          <div style={{ fontSize: 11, fontFamily: FN.m, color: CL.orange, marginBottom: 10 }}>IN PANTRY - {have.length}</div>
          {have.map((i, idx) => <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${CL.bg}`, fontSize: 12, opacity: 0.5 }}><span style={{ color: CL.green }}>✓</span><span style={{ flex: 1, textDecoration: "line-through" }}>{i.name}</span><span style={{ fontFamily: FN.m, fontSize: 11 }}>{Math.round(i.amount * 100) / 100} {i.unit}</span></div>)}
        </div>}
      </div>
    </div>
  );
}

/* ─── NEW ONBOARDING: Phase Components ─── */

function PhaseWelcome({ onNext, onBack }) {
  return (
    <div className="fu" style={{ maxWidth: 600, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 56, marginBottom: 20 }}>🏗️</div>
      <h1 style={{ fontFamily: FN.d, fontSize: 28, fontWeight: 700, color: CL.navy, marginBottom: 8 }}>Build Something Real</h1>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: CL.textMd, marginBottom: 24 }}>
        You just explored <strong style={{ color: CL.teal }}>Run Recipes</strong> — a fully functional app built entirely with Claude AI. Now we're going to give you a real business challenge, and you're going to build the solution yourself.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: CL.textMd, marginBottom: 32 }}>
        No templates. No copying. <strong style={{ color: CL.navy }}>Your problem. Your idea. Your app.</strong>
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onBack} style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 14, cursor: "pointer", fontFamily: FN.b }}>← Back to Run Recipes</button>
        <button onClick={onNext} style={{ padding: "10px 28px", borderRadius: 10, background: CL.teal, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>Let's Go →</button>
      </div>
    </div>
  );
}

function PhaseTools({ onNext, onBack, checked, onCheckedChange }) {
  const allChecked = TOOLS.every(t => checked[t.id]);
  return (
    <div className="fu" style={{ maxWidth: 560, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🧰</div>
      <h2 style={{ fontFamily: FN.d, fontSize: 22, fontWeight: 700, color: CL.navy, marginBottom: 6 }}>Before We Start</h2>
      <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 20, lineHeight: 1.6 }}><JargonText text="Make sure you have these set up. You'll need VS Code, a Claude API Key, Git, and Vercel to go from idea to live app." /></p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {TOOLS.map(t => (
          <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: checked[t.id] ? CL.greenBg : CL.bg, borderRadius: 10, border: "1px solid " + (checked[t.id] ? CL.green + "40" : CL.border), transition: "all 0.2s" }}>
            <div onClick={() => onCheckedChange(p => ({ ...p, [t.id]: !p[t.id] }))} style={{ width: 22, height: 22, borderRadius: 6, border: "2px solid " + (checked[t.id] ? CL.green : CL.borderDk), background: checked[t.id] ? CL.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#fff", fontSize: 12, fontWeight: 700 }}>{checked[t.id] ? "✓" : ""}</div>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13, color: CL.navy }}>{t.name}</div><div style={{ fontSize: 11, color: CL.textMd, lineHeight: 1.4 }}><JargonText text={t.desc} /></div></div>
            <a href={t.link} target="_blank" rel="noopener noreferrer" style={{ padding: "4px 12px", borderRadius: 6, background: CL.white, color: CL.blue, fontSize: 11, fontWeight: 500, textDecoration: "none", border: "1px solid " + CL.border, flexShrink: 0 }}>Get →</a>
          </div>
        ))}
      </div>
      <HelpChat context="User is setting up tools: VS Code, Claude API key, Git, Vercel. Help with downloads, installs, finding API keys." phaseLabel="Tool Setup" />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button onClick={onBack} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 13, cursor: "pointer", fontFamily: FN.b }}>← Back</button>
        <button onClick={onNext} disabled={!allChecked} style={{ padding: "8px 24px", borderRadius: 8, background: allChecked ? CL.teal : CL.borderDk, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: allChecked ? "pointer" : "not-allowed", fontFamily: FN.b, opacity: allChecked ? 1 : 0.6 }}>{allChecked ? "I'm Ready →" : "Check all to continue"}</button>
      </div>
    </div>
  );
}

function PhaseChallenge({ onNext, onBack }) {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState("");

  async function generateChallenge() {
    setLoading(true); setChallenge(null); setSolution("");
    try {
      const r = await callAI(`Generate a business challenge.`, `You generate business challenges for a coding tutorial. Generate ONE realistic business problem solvable with a single-page web app.\n\nReturn ONLY valid JSON, no markdown fences:\n{"title":"Short title","scenario":"2-3 sentence scenario","question":"One sentence asking what they would build"}\n\nVary across domains: sales, ops, HR, marketing, finance, product, customer success, engineering.`);
      setChallenge(r || { title: "Time Tracker", scenario: "Your team has no idea how they spend their time. Meetings, deep work, admin — it's all a blur. Leadership wants visibility but nobody wants timesheets.", question: "If you were designing a product to solve this, what would you build?" });
    } catch {
      setChallenge({ title: "Time Tracker", scenario: "Your team has no idea how they spend their time. Meetings, deep work, admin — it's all a blur. Leadership wants visibility but nobody wants timesheets.", question: "If you were designing a product to solve this, what would you build?" });
    }
    setLoading(false);
  }

  useEffect(() => { if (!challenge) generateChallenge(); }, []);

  return (
    <div className="fu" style={{ maxWidth: 600, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
      <h2 style={{ fontFamily: FN.d, fontSize: 22, fontWeight: 700, color: CL.navy, marginBottom: 6 }}>Your Challenge</h2>
      <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 20, lineHeight: 1.6 }}>I'm going to present you with a business challenge. Explain to me how you might build a point solution to solve it.</p>
      {loading && <div style={{ padding: 40, textAlign: "center" }}><div style={{ width: 24, height: 24, border: "3px solid " + CL.teal, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block", marginBottom: 10 }} /><div style={{ fontSize: 13, color: CL.textLt }}>Generating your challenge...</div></div>}
      {challenge && !loading && (<>
        <div style={{ background: CL.bg, border: "1.5px solid " + CL.orange + "40", borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 9, fontFamily: FN.m, color: CL.orange, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: 10 }}>Your Challenge</div>
          <h3 style={{ fontFamily: FN.d, fontSize: 18, fontWeight: 700, color: CL.navy, marginBottom: 8 }}>{challenge.title}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: CL.textMd, marginBottom: 12 }}>{challenge.scenario}</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: CL.navy }}>{challenge.question}</p>
        </div>
        <button onClick={generateChallenge} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid " + CL.border, background: CL.white, color: CL.textMd, fontSize: 11, cursor: "pointer", fontFamily: FN.b, marginBottom: 16 }}>🎲 Give me a different challenge</button>
        <div style={{ marginBottom: 8, fontFamily: FN.d, fontWeight: 600, fontSize: 13, color: CL.navy }}>Your Solution</div>
        <p style={{ fontSize: 12, color: CL.textLt, marginBottom: 10 }}>Describe what you'd build in plain English. No jargon needed — just your idea.</p>
        <textarea value={solution} onChange={e => setSolution(e.target.value)} placeholder="Example: A tool that auto-detects meeting types based on notes, then tracks patterns so the team can see where their hours go..." style={{ width: "100%", minHeight: 120, padding: 16, borderRadius: 10, border: "1.5px solid " + CL.border, fontSize: 14, fontFamily: FN.b, lineHeight: 1.7, color: CL.text, resize: "vertical", background: CL.bg }} />
      </>)}
      <div style={{ marginTop: 16 }}><HelpChat context={"User is responding to challenge: " + (challenge?.title || "") + ". Help them think through features, users, and how it would look."} phaseLabel="Your Challenge" /></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button onClick={onBack} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 13, cursor: "pointer", fontFamily: FN.b }}>← Back</button>
        <button onClick={() => onNext(challenge, solution)} disabled={solution.trim().length < 20} style={{ padding: "8px 24px", borderRadius: 8, background: solution.trim().length >= 20 ? CL.teal : CL.borderDk, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: solution.trim().length >= 20 ? "pointer" : "not-allowed", fontFamily: FN.b, opacity: solution.trim().length >= 20 ? 1 : 0.6 }}>Build My Solution →</button>
      </div>
    </div>
  );
}

function PhaseBuild({ challenge, solution, onNext, onBack }) {
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generatePrompt() {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500,
          system: `You are an expert prompt engineer. Given a business challenge and a user's solution idea, generate a detailed prompt that will make Claude build a professional single-file React artifact.\n\nThe prompt should:\n1. Describe the app concept clearly (derived from the user's words)\n2. Specify single React JSX artifact with inline styles\n3. Request professional SaaS-quality UI\n4. Define layout: nav bar, main content, relevant panels\n5. List specific features as bullet points from the user's idea\n6. Request 6-8 pre-loaded realistic sample data entries\n7. End with: AESTHETIC:\\n[CUSTOMIZE THIS — tell Claude your preferred colors, dark/light theme, brand name, fonts, or mood]\n8. Request Claude API for any AI features\n\nReturn ONLY the prompt text. No preamble, no markdown fences.`,
          messages: [{ role: "user", content: "CHALLENGE: " + challenge.title + "\n" + challenge.scenario + "\n\nUSER'S SOLUTION:\n" + solution }] }),
      });
      const data = await res.json();
      setPrompt((data.content?.map(b => b.text || "").join("") || "").trim());
    } catch {
      setPrompt("Build me a professional " + challenge.title.toLowerCase() + " app as a single React artifact with inline styles. It should have a clean SaaS-style UI, relevant data views, and 6-8 pre-loaded sample entries. Based on this idea: " + solution + "\n\nAESTHETIC:\n[CUSTOMIZE THIS — tell Claude your preferred colors, dark/light theme, brand name, fonts, or mood]");
    }
    setLoading(false);
  }

  useEffect(() => { if (!prompt && challenge && solution) generatePrompt(); }, [challenge, solution]);

  function copyPrompt() { navigator.clipboard?.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <div className="fu" style={{ maxWidth: 620, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
      <h2 style={{ fontFamily: FN.d, fontSize: 22, fontWeight: 700, color: CL.navy, marginBottom: 6 }}>Let's Build It</h2>
      <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 20, lineHeight: 1.6 }}><JargonText text="I've turned your idea into a build prompt. Copy it, paste it into Claude, and watch it generate your first React artifact. Customize the AESTHETIC section to make it yours." /></p>
      {loading && <div style={{ padding: 40, textAlign: "center" }}><div style={{ width: 24, height: 24, border: "3px solid " + CL.purple, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block", marginBottom: 10 }} /><div style={{ fontSize: 13, color: CL.textLt }}>Crafting your build prompt...</div></div>}
      {prompt && !loading && (<>
        <div style={{ background: CL.tealBg, borderRadius: 10, padding: "12px 16px", marginBottom: 16, border: "1px solid " + CL.teal + "30" }}>
          <div style={{ fontSize: 10, fontFamily: FN.m, color: CL.teal, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Your Idea</div>
          <div style={{ fontSize: 12, color: CL.text, lineHeight: 1.5 }}>{solution}</div>
        </div>
        <div style={{ background: CL.bg, borderRadius: 10, border: "1px solid " + CL.border, padding: 16, fontSize: 12, fontFamily: FN.m, lineHeight: 1.7, color: CL.textMd, maxHeight: 280, overflow: "auto", whiteSpace: "pre-wrap", marginBottom: 16 }}>{prompt}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button onClick={copyPrompt} style={{ padding: "10px 24px", borderRadius: 8, background: copied ? CL.green : CL.teal, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>{copied ? "✓ Copied!" : "📋 Copy Prompt"}</button>
          <span style={{ fontSize: 12, color: CL.textLt }}>Paste into Claude → customize AESTHETIC → hit Enter</span>
        </div>
        <div style={{ background: CL.purpleBg, borderRadius: 10, padding: "12px 16px", marginBottom: 16, border: "1px solid " + CL.purple + "30" }}>
          <div style={{ fontSize: 12, color: CL.purple, lineHeight: 1.6 }}>💡 <strong>Pro tip:</strong> After Claude generates your app, iterate by talking to it. "Make the header darker", "Add a search bar", "Change the data to marketing campaigns" — it understands plain English.</div>
        </div>
      </>)}
      <div style={{ marginTop: 12 }}><HelpChat context="User just got their build prompt. Help with: opening Claude, pasting, customizing aesthetics, iterating on results." phaseLabel="Build It" /></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button onClick={onBack} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 13, cursor: "pointer", fontFamily: FN.b }}>← Back</button>
        <button onClick={onNext} style={{ padding: "8px 24px", borderRadius: 8, background: CL.teal, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>I Built It — What's Next? →</button>
      </div>
    </div>
  );
}

/* ─── AUTH MODAL ─── */
function AuthModal({ onClose, onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) { setError("Email and password required"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: mode, email, password }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setLoading(false); return; }
      onAuth({ email: data.email || email, access_token: data.access_token, user: data.user || { email } });
      onClose();
    } catch { setError("Connection failed. Try again."); }
    setLoading(false);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: CL.white, borderRadius: 16, padding: 32, width: 380, boxShadow: "0 12px 40px rgba(0,0,0,.15)" }}>
        <h3 style={{ fontFamily: FN.d, fontSize: 20, fontWeight: 700, color: CL.navy, marginBottom: 4 }}>{mode === "login" ? "Welcome Back" : "Create Account"}</h3>
        <p style={{ fontSize: 12, color: CL.textLt, marginBottom: 20 }}>{mode === "login" ? "Pick up where you left off" : "Save your progress across sessions"}</p>
        {error && <div style={{ padding: "8px 12px", background: CL.redBg, borderRadius: 8, fontSize: 12, color: CL.red, marginBottom: 12 }}>{error}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid " + CL.border, fontSize: 13, fontFamily: FN.b, marginBottom: 10, outline: "none" }} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" onKeyDown={e => e.key === "Enter" && handleSubmit()} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid " + CL.border, fontSize: 13, fontFamily: FN.b, marginBottom: 16, outline: "none" }} />
        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "10px", borderRadius: 8, background: CL.teal, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: loading ? "wait" : "pointer", fontFamily: FN.b }}>{loading ? "..." : mode === "login" ? "Log In" : "Sign Up"}</button>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: CL.textMd }}>
          {mode === "login" ? "No account? " : "Already have one? "}
          <span onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} style={{ color: CL.teal, cursor: "pointer", fontWeight: 600 }}>{mode === "login" ? "Sign up" : "Log in"}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── MODULE LESSON VIEW ─── */
function ModuleLesson({ module, onBack, onComplete, isCompleted }) {
  const lesson = MODULE_LESSONS[module.id];
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("concept");

  function copyPrompt() { navigator.clipboard?.writeText(lesson.promptTemplate); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  const tabs = [
    { id: "concept", label: "📖 Concept" },
    { id: "see", label: "👀 See It" },
    { id: "steps", label: "🔨 Steps" },
    { id: "prompt", label: "⚡ Build It" },
  ];

  return (
    <div className="fu" style={{ maxWidth: 620, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 0, boxShadow: "0 4px 24px rgba(0,0,0,.06)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px 28px", borderBottom: "1px solid " + CL.border, background: CL.bg }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: CL.textMd, fontSize: 12, cursor: "pointer", fontFamily: FN.b, marginBottom: 8 }}>← Back to Modules</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 28 }}>{module.icon}</div>
          <div>
            <h2 style={{ fontFamily: FN.d, fontSize: 20, fontWeight: 700, color: CL.navy }}>{module.title}</h2>
            <p style={{ fontSize: 12, color: CL.textMd }}>{module.desc}</p>
          </div>
          {isCompleted && <div style={{ marginLeft: "auto", padding: "4px 12px", borderRadius: 6, background: CL.greenBg, color: CL.green, fontSize: 11, fontFamily: FN.m, fontWeight: 600 }}>COMPLETED ✓</div>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid " + CL.border }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, padding: "10px 8px", background: "none", border: "none", borderBottom: activeTab === t.id ? "2px solid " + CL.teal : "2px solid transparent", color: activeTab === t.id ? CL.teal : CL.textMd, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>{t.label}</button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: "24px 28px", minHeight: 280 }}>
        {activeTab === "concept" && (
          <div style={{ fontSize: 14, lineHeight: 1.8, color: CL.textMd }}><JargonText text={lesson.concept} /></div>
        )}
        {activeTab === "see" && (
          <div style={{ fontSize: 14, lineHeight: 1.8, color: CL.textMd }}><JargonText text={lesson.seeIt} /></div>
        )}
        {activeTab === "steps" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {lesson.steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: CL.bg, borderRadius: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: CL.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: FN.m, flexShrink: 0 }}>{i + 1}</div>
                <div><div style={{ fontWeight: 600, fontSize: 13, color: CL.navy, marginBottom: 2 }}>{s.title}</div><div style={{ fontSize: 12, color: CL.textMd, lineHeight: 1.5 }}><JargonText text={s.desc} /></div></div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "prompt" && (
          <div>
            <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 16, lineHeight: 1.6 }}><JargonText text="Copy this prompt template, customize the bracketed sections, and paste it into Claude. It will add this capability to your app." /></p>
            <div style={{ background: CL.bg, borderRadius: 10, border: "1px solid " + CL.border, padding: 16, fontSize: 12, fontFamily: FN.m, lineHeight: 1.7, color: CL.textMd, whiteSpace: "pre-wrap", marginBottom: 16, maxHeight: 220, overflow: "auto" }}>{lesson.promptTemplate}</div>
            <button onClick={copyPrompt} style={{ padding: "10px 24px", borderRadius: 8, background: copied ? CL.green : CL.teal, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>{copied ? "✓ Copied!" : "📋 Copy Prompt"}</button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 28px", borderTop: "1px solid " + CL.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <HelpChat context={"User is learning about " + module.title + ". Help with concepts, implementation, and troubleshooting."} phaseLabel={module.title} />
        {!isCompleted && <button onClick={onComplete} style={{ padding: "8px 20px", borderRadius: 8, background: CL.green, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>✓ Mark Complete</button>}
      </div>
    </div>
  );
}

function PhaseModules({ onBack, completedModules, onCompleteModule }) {
  const [activeModule, setActiveModule] = useState(null);

  if (activeModule) {
    const mod = MODULES.find(m => m.id === activeModule);
    return (
      <ModuleLesson
        module={mod}
        onBack={() => setActiveModule(null)}
        onComplete={() => { onCompleteModule(activeModule); setActiveModule(null); }}
        isCompleted={completedModules.includes(activeModule)}
      />
    );
  }

  const completedCount = completedModules.length;
  const totalCount = MODULES.length;

  return (
    <div className="fu" style={{ maxWidth: 600, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
      <h2 style={{ fontFamily: FN.d, fontSize: 22, fontWeight: 700, color: CL.navy, marginBottom: 6 }}>Level Up Your App</h2>
      <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 8, lineHeight: 1.6 }}>You have a working v1. Each module teaches a concept and adds a real capability.</p>
      {completedCount > 0 && <div style={{ fontSize: 12, color: CL.teal, fontFamily: FN.m, fontWeight: 600, marginBottom: 16 }}>{completedCount}/{totalCount} modules completed</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {MODULES.map(m => {
          const done = completedModules.includes(m.id);
          return (
            <div key={m.id} onClick={() => setActiveModule(m.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: done ? CL.greenBg : CL.bg, borderRadius: 10, border: "1px solid " + (done ? CL.green + "40" : CL.border), cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { if (!done) e.currentTarget.style.borderColor = CL.teal; }}
              onMouseLeave={e => { if (!done) e.currentTarget.style.borderColor = CL.border; }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: CL.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14, color: CL.navy, fontFamily: FN.d }}>{m.title}</div><div style={{ fontSize: 12, color: CL.textMd, lineHeight: 1.4, marginTop: 2 }}>{m.desc}</div></div>
              {done
                ? <div style={{ padding: "4px 10px", borderRadius: 6, background: CL.green, color: "#fff", fontSize: 10, fontFamily: FN.m, fontWeight: 600, flexShrink: 0 }}>DONE ✓</div>
                : <div style={{ padding: "4px 10px", borderRadius: 6, background: CL.tealBg, color: CL.teal, fontSize: 10, fontFamily: FN.m, fontWeight: 600, flexShrink: 0 }}>START →</div>
              }
            </div>
          );
        })}
      </div>

      {completedCount === totalCount && (
        <div style={{ background: CL.greenBg, borderRadius: 10, padding: "16px 20px", marginBottom: 20, border: "1px solid " + CL.green + "30" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: CL.green, marginBottom: 4, fontFamily: FN.d }}>🎉 All Modules Complete!</div>
          <div style={{ fontSize: 13, color: CL.text, lineHeight: 1.6 }}>You've mastered every concept. You're not just building with AI — you're building like a developer. Keep shipping.</div>
        </div>
      )}

      <button onClick={onBack} style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 14, cursor: "pointer", fontFamily: FN.b }}>← Back to Run Recipes</button>
    </div>
  );
}

function OnboardingView({ onBack, user }) {
  const [phase, setPhase] = useState("welcome");
  const [toolsChecked, setToolsChecked] = useState({});
  const [challengeData, setChallengeData] = useState(null);
  const [solutionData, setSolutionData] = useState("");
  const [completedModules, setCompletedModules] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load progress from Supabase on mount
  useEffect(() => {
    if (!user?.token) { setLoaded(true); return; }
    fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "get_progress", access_token: user.token }) })
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          if (data.phase) setPhase(data.phase);
          if (data.tools_checked) setToolsChecked(typeof data.tools_checked === "string" ? JSON.parse(data.tools_checked) : data.tools_checked);
          if (data.challenge) setChallengeData(typeof data.challenge === "string" ? JSON.parse(data.challenge) : data.challenge);
          if (data.solution) setSolutionData(data.solution);
          if (data.modules_completed) setCompletedModules(typeof data.modules_completed === "string" ? JSON.parse(data.modules_completed) : data.modules_completed);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [user?.token]);

  // Save progress to Supabase on changes (debounced)
  const saveRef = useRef(null);
  useEffect(() => {
    if (!loaded || !user?.token) return;
    clearTimeout(saveRef.current);
    saveRef.current = setTimeout(() => {
      fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        action: "save_progress", access_token: user.token,
        phase, tools_checked: toolsChecked, challenge: challengeData, solution: solutionData, modules_completed: completedModules
      }) }).catch(() => {});
    }, 800);
  }, [phase, toolsChecked, challengeData, solutionData, completedModules, loaded, user?.token]);

  function handleChallengeNext(challenge, solution) { setChallengeData(challenge); setSolutionData(solution); setPhase("build"); }
  function handleCompleteModule(id) { setCompletedModules(prev => prev.includes(id) ? prev : [...prev, id]); }
  const phases = ["welcome", "tools", "challenge", "build", "modules"];
  const phaseIndex = phases.indexOf(phase);

  if (!loaded) return <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: CL.textLt, fontFamily: FN.b }}>Loading your progress...</div>;

  return (
    <div style={{ flex: 1, overflow: "auto", background: CL.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 6, padding: "12px 32px", justifyContent: "center" }}>
        {phases.map((p, i) => <div key={p} style={{ width: i <= phaseIndex ? 24 : 10, height: 6, borderRadius: 3, background: i <= phaseIndex ? CL.teal : CL.border, transition: "all 0.3s" }} />)}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 32px 32px" }}>
        {phase === "welcome" && <PhaseWelcome onNext={() => setPhase("tools")} onBack={onBack} />}
        {phase === "tools" && <PhaseTools onNext={() => setPhase("challenge")} onBack={() => setPhase("welcome")} checked={toolsChecked} onCheckedChange={setToolsChecked} />}
        {phase === "challenge" && <PhaseChallenge onNext={handleChallengeNext} onBack={() => setPhase("tools")} />}
        {phase === "build" && <PhaseBuild challenge={challengeData} solution={solutionData} onNext={() => setPhase("modules")} onBack={() => setPhase("challenge")} />}
        {phase === "modules" && <PhaseModules onBack={onBack} completedModules={completedModules} onCompleteModule={handleCompleteModule} />}
      </div>
    </div>
  );
}


export default function RunRecipes() {
  const [view, setView] = useState("grid");
  const [selectedId, setSelectedId] = useState(null);
  const [filterChef, setFilterChef] = useState("All");
  const [activeFolder, setActiveFolder] = useState("All Meals");
  const [pantry, setPantry] = useState(INIT_PANTRY);
  const [egg, setEgg] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [pendingBuild, setPendingBuild] = useState(false);

  function handleAuth(authData) {
    setUser({ email: authData.email || authData.user?.email, token: authData.access_token });
    if (pendingBuild) { setView("build"); setPendingBuild(false); }
  }

  useEffect(() => {
    function handler(e) { if (e.ctrlKey && e.shiftKey && e.key === "B") { e.preventDefault(); setEgg(true); } }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const selectedMeal = MEALS.find((m) => m.id === selectedId);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", fontFamily: FN.b, background: CL.bg }}>
      <style>{globalCSS}</style>
      <NavBar activeView={view} onView={(v) => { setView(v); if (v !== "grid") setSelectedId(null); }} onBuild={() => { if (user) { setView("build"); } else { setPendingBuild(true); setShowAuth(true); } }} />
      {/* Auth button overlay in nav area */}
      <div style={{ position: "absolute", top: 8, right: 56, zIndex: 101 }}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: CL.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontFamily: FN.d }}>{user.email[0].toUpperCase()}</div>
            <button onClick={() => setUser(null)} style={{ background: "none", border: "none", color: CL.textLt, fontSize: 11, cursor: "pointer", fontFamily: FN.b }}>Log out</button>
          </div>
        ) : (
          <button onClick={() => setShowAuth(true)} style={{ padding: "4px 12px", borderRadius: 6, border: "1px solid " + CL.border, background: CL.white, color: CL.textMd, fontSize: 11, cursor: "pointer", fontFamily: FN.b }}>Sign In</button>
        )}
      </div>
      {view === "grid" && <FilterBar meals={MEALS} filterChef={filterChef} onFilterChef={setFilterChef} />}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {view === "grid" && (
          <>
            <FolderPanel active={activeFolder} onSelect={setActiveFolder} meals={MEALS} />
            <MealGrid meals={MEALS} selectedId={selectedId} onSelect={setSelectedId} pantry={pantry} filterChef={filterChef} activeFolder={activeFolder} />
            {selectedMeal && <DetailSidebar meal={selectedMeal} pantry={pantry} onClose={() => setSelectedId(null)} />}
          </>
        )}
        {view === "pantry" && <PantryView pantry={pantry} onAdd={(i) => setPantry((p) => (p.includes(i) ? p : [...p, i]))} onRemove={(i) => setPantry((p) => p.filter((x) => x !== i))} onClear={() => setPantry([])} />}
        {view === "grocery" && <GroceryView meals={MEALS} pantry={pantry} />}
        {view === "build" && !user && (() => { if (!showAuth) { setShowAuth(true); setView("grid"); setPendingBuild(true); } return null; })()}
        {view === "build" && user && <OnboardingView onBack={() => setView("grid")} user={user} />}
      </div>
      {egg && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setEgg(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: CL.white, borderRadius: 12, padding: 28, textAlign: "center", maxWidth: 340 }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>👨‍🍳📖</div>
            <div style={{ fontFamily: FN.d, fontSize: 18, fontWeight: 700, color: CL.navy, marginBottom: 6 }}>Cook the Books</div>
            <p style={{ fontSize: 12, color: CL.textMd, lineHeight: 1.6 }}>In Run Recipes, cooking the books means inflating your Yes Chef Scores so people think you meal prep.</p>
            <p style={{ fontSize: 12, color: CL.textMd, lineHeight: 1.6, marginTop: 6 }}>Your DoorDash history says otherwise.</p>
          </div>
        </div>
      )}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={handleAuth} />}
    </div>
  );
}
