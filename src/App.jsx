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

const ONBOARDING_STEPS = [
  { title: "Welcome, Chef", icon: "👨‍🍳", body: "You just explored Run Recipes — a fully functional app built entirely with Claude AI. Every line of code, every feature, every DoorDash joke. Now it's your turn to build your own version.", action: "Let's Go", helpContext: "Intro screen. User is deciding whether to start." },
  { title: "Step 1: Get VS Code", icon: "💻", body: "VS Code is a free code editor. You'll use it to save and organize the files Claude creates for you.", link: "https://code.visualstudio.com/download", linkLabel: "Download VS Code", tip: "Just download and install. Open it once to make sure it works.", helpContext: "Installing VS Code. May need help with: downloading for their OS, running the installer, verifying it works." },
  { title: "Step 2: Create a GitHub Account", icon: "🐙", body: "GitHub stores your code in the cloud. Think of it as Google Drive for code. A free repo is all you need.", link: "https://github.com/signup", linkLabel: "Sign Up for GitHub", tip: "Free tier is all you need.", helpContext: "Creating GitHub account. May need help with signup, username, or understanding what GitHub is for." },
  { title: "Step 3: Install Git", icon: "🔧", body: "Git connects VS Code to GitHub. It's the bridge between your computer and the cloud.", tip: "Mac: Open Terminal, type: git --version (usually pre-installed). Windows: Download from git-scm.com", helpContext: "Installing Git. May need help checking if installed, downloading for Windows, using Terminal, or Git vs GitHub." },
  { title: "Step 4: Get Claude", icon: "🤖", body: "If you're seeing this app, you probably already have Claude. Make sure you're logged into claude.ai and have Artifacts enabled in Feature Previews.", link: "https://claude.ai", linkLabel: "Open Claude", tip: "Settings > Feature Previews > Enable Artifacts and Analysis tool", helpContext: "Setting up Claude. May need help logging in, finding Feature Previews, enabling Artifacts." },
  { title: "Step 5: Build Your Version", icon: "🎨", body: "Here's the magic moment. Copy the prompt below, paste it into Claude, and tell it your preferred colors, brand, or aesthetic. Claude will generate a fully customized version of Run Recipes as a React artifact.", isPromptStep: true, helpContext: "Copying the build prompt into Claude. May need help with pasting, customizing the AESTHETIC section, or understanding what a React artifact is." },
  { title: "Step 6: Preview It", icon: "👀", body: "Claude will render your app right in the chat as an artifact. Click around. Test it. If you want changes, just tell Claude: make it darker, change the green to blue, add a recipe for pizza.", tip: "This is the iterative loop. Prompt, see result, refine, repeat.", helpContext: "Previewing and iterating on their artifact. May need help requesting changes or understanding the prompt-refine loop." },
  { title: "Step 7: Deploy (Bonus)", icon: "🚀", body: "Want to deploy your app to the internet? Sign up for Vercel, connect your GitHub repo, and push your file. Vercel will give you a live URL anyone can visit.", link: "https://vercel.com/signup", linkLabel: "Sign Up for Vercel", tip: "This step is optional but impressive. Ask Claude to help you with the deploy steps if you get stuck.", helpContext: "Deploying to Vercel. May need help with signup, connecting GitHub, pushing code, or troubleshooting." },
  { title: "You Did It", icon: "🎉", body: "You just went from zero to building and (optionally) deploying a real web app with AI. The same workflow works for dashboards, internal tools, prototypes, client demos — anything. Now go build something that matters to you.", action: "Back to Run Recipes", helpContext: "Completed the tutorial. May want encouragement, next steps, or ideas for what to build." },
];

const BUILD_PROMPT = `I want you to build me a recipe management app called "Run Recipes" as a single React artifact. It should look and feel like a professional SaaS product (inspired by Clari's deal inspection UI).

LAYOUT:
- Top nav bar with brand on left, nav items: Inspect, Ingredient Forecast, Grocery Analyze
- Left sidebar with folder groups for recipe categories
- Main area is a data grid/table of meals
- Right sidebar detail panel when a row is clicked

GRID COLUMNS:
- Star/favorite toggle
- Recipe name + cuisine subtitle
- "Yes Chef Score" (blended score: pantry readiness + personal cooking experience)
- Chef (who is cooking — names like "Me", partner name, or "DoorDash")
- Servings
- Cook Date (color coded: red=past due, yellow=soon, green=upcoming)
- Notes (free text)

YES CHEF SCORE:
- Blended from two factors: Ingredient Readiness (pantry match %) and Experience (times made, confidence, new skills needed)
- If Chef = "DoorDash", score is always 100%
- Hover tooltip shows BOTH factors broken down: ingredients in pantry vs missing, AND experience details
- Each meal should have an experience object with timesMade, confidence, skills, newSkills

RIGHT SIDEBAR:
- Top: AI-generated insights about the dish (call Claude API)
- Middle: Ingredients list + steps
- Bottom: "Ask Run Recipes" input for questions (call Claude API)

OTHER VIEWS:
- Ingredient Forecast (Pantry): add/remove items, affects Yes Chef scores
- Grocery Analyze: select meals, deduplicate ingredients, subtract pantry

AESTHETIC:
[CUSTOMIZE THIS — tell Claude your colors, brand, dark/light theme, fonts, mood]

Include 6-8 pre-loaded recipes with a mix of cuisines and difficulties. At least one "DoorDash" entry with funny steps. Each recipe needs an experience object.

Single React JSX file, inline styles. Use Claude API for AI features.`;

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
function HelpChat({ stepData, stepIndex }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => { setMessages([]); setOpen(false); }, [stepIndex]);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    const sys = "You are a friendly, patient onboarding assistant for Run Recipes — a coding tutorial for complete beginners building their first web app with Claude AI. The user is on: \"" + stepData.title + "\". Context: " + (stepData.helpContext || "") + ". RULES: Assume ZERO technical knowledge. Keep answers to 2-4 sentences. Be warm and encouraging. Give exact actions (what to click, what to type). Use analogies to non-tech things. Never make them feel dumb.";
    try {
      const answer = await callAIText(userMsg, sys);
      setMessages(prev => [...prev, { role: "assistant", text: answer }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Sorry, couldn't connect. Try again!" }]);
    }
    setLoading(false);
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 20, border: "1.5px solid " + CL.teal + "40", background: CL.tealBg, color: CL.teal, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FN.b, animation: "pulseGlow 2s ease-in-out infinite" }}>
      <span style={{ fontSize: 15 }}>💬</span> Need help with this step?
    </button>
  );

  return (
    <div style={{ border: "1.5px solid " + CL.teal + "40", borderRadius: 12, overflow: "hidden", background: CL.white }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: CL.tealBg, borderBottom: "1px solid " + CL.teal + "20" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: CL.teal, fontFamily: FN.d }}>💬 Step Helper</span>
        <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: CL.textLt, fontSize: 16 }}>×</button>
      </div>
      <div ref={scrollRef} style={{ maxHeight: 180, overflowY: "auto", padding: 10 }}>
        {messages.length === 0 && <div style={{ fontSize: 11, color: CL.textLt, textAlign: "center", padding: "12px 8px", lineHeight: 1.5 }}>Ask me anything about this step — no question is too basic!</div>}
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

function OnboardingView({ onBack }) {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const s = ONBOARDING_STEPS[step];
  function copyPrompt() { navigator.clipboard?.writeText(BUILD_PROMPT); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <div style={{ flex: 1, overflow: "auto", background: CL.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div className="fu" key={step} style={{ maxWidth: 580, width: "100%", background: CL.white, borderRadius: 16, border: `1px solid ${CL.border}`, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {ONBOARDING_STEPS.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? CL.teal : CL.border, transition: "background 0.3s" }} />)}
        </div>
        <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
        <h2 style={{ fontFamily: FN.d, fontSize: 22, fontWeight: 700, color: CL.navy, marginBottom: 12 }}>{s.title}</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: CL.textMd, marginBottom: 20 }}><JargonText text={s.body} /></p>
        {s.link && <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "8px 20px", borderRadius: 8, background: CL.teal, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>{s.linkLabel} →</a>}
        {s.tip && <div style={{ padding: "10px 14px", background: CL.blueBg, borderRadius: 8, fontSize: 12, color: CL.blue, lineHeight: 1.6, marginBottom: 16 }}>💡 <JargonText text={s.tip} /></div>}
        {s.isPromptStep && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: CL.bg, borderRadius: 8, border: `1px solid ${CL.border}`, padding: 16, fontSize: 11, fontFamily: FN.m, lineHeight: 1.6, color: CL.textMd, maxHeight: 200, overflow: "auto", whiteSpace: "pre-wrap", marginBottom: 12 }}>{BUILD_PROMPT}</div>
            <button onClick={copyPrompt} style={{ padding: "8px 20px", borderRadius: 8, background: copied ? CL.green : CL.teal, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{copied ? "✓ Copied!" : "Copy Prompt"}</button>
            <span style={{ marginLeft: 12, fontSize: 12, color: CL.textLt }}>Paste into Claude + customize the AESTHETIC section</span>
          </div>
        )}
        <div style={{ marginBottom: 20 }}>
          <HelpChat stepData={s} stepIndex={step} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <button onClick={() => { if (step === 0) onBack(); else setStep(step - 1); }} style={{ padding: "8px 20px", borderRadius: 8, background: "none", border: `1px solid ${CL.border}`, color: CL.textMd, fontSize: 13, cursor: "pointer", fontFamily: FN.b }}>{step === 0 ? "← Back to App" : "← Back"}</button>
          <button onClick={() => { if (step === ONBOARDING_STEPS.length - 1) onBack(); else setStep(step + 1); }} style={{ padding: "8px 24px", borderRadius: 8, background: CL.teal, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>{s.action || "Next →"}</button>
        </div>
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

  useEffect(() => {
    function handler(e) { if (e.ctrlKey && e.shiftKey && e.key === "B") { e.preventDefault(); setEgg(true); } }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const selectedMeal = MEALS.find((m) => m.id === selectedId);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", fontFamily: FN.b, background: CL.bg }}>
      <style>{globalCSS}</style>
      <NavBar activeView={view} onView={(v) => { setView(v); if (v !== "grid") setSelectedId(null); }} onBuild={() => setView("build")} />
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
        {view === "build" && <OnboardingView onBack={() => setView("grid")} />}
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
    </div>
  );
}
