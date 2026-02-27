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
  { id: "m5", name: "Wings and Beer Cheese Dip", cuisine: "American", starred: true, chef: "DoorDash", servings: 6, cookDate: "2026-03-12", notes: "Poker night", tags: ["American", "Party"], folder: "Quick Weeknight",
    ingredients: [{ name: "Chicken Wings", amount: 3, unit: "lbs" }, { name: "Hot Sauce", amount: 0.5, unit: "cup" }, { name: "Butter", amount: 4, unit: "tbsp" }, { name: "Cheddar", amount: 2, unit: "cups" }, { name: "Cream Cheese", amount: 8, unit: "oz" }, { name: "Beer", amount: 0.5, unit: "cup" }],
    steps: ["Order from DoorDash.", "Open door.", "Tip well.", "Plate it like you made it.", "Take credit."],
    experience: { timesMade: 0, confidence: "none", skills: [], newSkills: ["Deep frying", "Making a roux", "Cheese sauce emulsion"], lastMade: "Never" } },
  { id: "m7", name: "Tacos Al Pastor", cuisine: "Mexican", starred: true, chef: "Me", servings: 6, cookDate: "2026-03-05", notes: "Having friends over", tags: ["Mexican", "Party"], folder: "Quick Weeknight",
    ingredients: [{ name: "Pork Shoulder", amount: 2, unit: "lbs" }, { name: "Pineapple", amount: 1, unit: "pc" }, { name: "Achiote Paste", amount: 2, unit: "tbsp" }, { name: "Corn Tortillas", amount: 24, unit: "pcs" }, { name: "Cilantro", amount: 1, unit: "bunch" }, { name: "Limes", amount: 4, unit: "pcs" }, { name: "Garlic", amount: 3, unit: "cloves" }],
    steps: ["Blend marinade: achiote, garlic, pineapple juice.", "Marinate pork overnight.", "Grill pork + pineapple.", "Chop. Warm tortillas.", "Assemble: cilantro, onion, lime."],
    experience: { timesMade: 2, confidence: "medium", skills: ["Grilling", "Marinade making"], newSkills: ["Working with achiote"], lastMade: "2 months ago" } },
];

const INIT_PANTRY = ["Salt", "Black Pepper", "Olive Oil", "Garlic", "Butter", "Eggs", "Soy Sauce", "Rice"];

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

/* ─── JARGON GLOSSARY ─── */
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
  "commit": "A saved snapshot of your code. Like hitting 'Save' but with a description of what you changed.",
  "branch": "A parallel copy of your code where you can experiment without breaking the main version.",
  "merge": "Combining changes from a branch back into the main version of your code.",
  "Node.js": "A tool that lets JavaScript run outside the browser. Required for most dev tools.",
  "npm": "Node Package Manager — a tool that installs code libraries other people wrote so you don't have to.",
  "Supabase": "A free backend-as-a-service. Gives you a database, auth, and API without writing server code.",
  "environment variable": "A secret value (like an API key) stored outside your code so it doesn't get exposed.",
  "Opus 4.6": "Anthropic's most advanced AI model. The smartest Claude available.",
  "Sonnet": "Anthropic's balanced AI model. Fast and capable — great for coding tasks.",
  "component": "A reusable piece of UI in React. Like a Lego brick you can use in different places.",
  "state": "Data that your app remembers while it's open. Changes to state make the UI update.",
  "props": "Data passed from a parent component to a child component. Like function arguments.",
  "hook": "A React feature that lets components remember things (useState) or run effects (useEffect).",
  "responsive": "A design that adapts to different screen sizes — desktop, tablet, and phone.",
  "RLS": "Row Level Security — a database rule that ensures users can only see their own data.",
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

/* ─── HELP CHAT ─── */
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
      <span style={{ fontSize: 15 }}>💬</span> Ask for help
    </button>
  );

  return (
    <div style={{ border: "1.5px solid " + CL.teal + "40", borderRadius: 12, overflow: "hidden", background: CL.white }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: CL.tealBg, borderBottom: "1px solid " + CL.teal + "20" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: CL.teal, fontFamily: FN.d }}>💬 Ask</span>
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
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys || "Creative witty chef. Valid JSON only. No markdown fences.", messages: [{ role: "user", content: prompt }] }) });
    const data = await res.json();
    const text = data.content?.map(b => b.text || "").join("") || "";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch { return null; }
}

async function callAIText(prompt, sys) {
  try {
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 500, system: sys || "Helpful friendly assistant. 2-3 sentences max.", messages: [{ role: "user", content: prompt }] }) });
    const data = await res.json();
    return data.content?.map(b => b.text || "").join("") || "Try again!";
  } catch { return "Something went wrong."; }
}

function calcYesChef(meal, pantry) {
  if (meal.chef === "DoorDash") return { score: 100, color: CL.green, pantryPct: 100, expPct: 100, have: [], missing: [], exp: meal.experience };
  const pl = pantry.map(p => p.toLowerCase());
  const have = [], missing = [];
  meal.ingredients.forEach(i => { const n = i.name.toLowerCase(); (pl.some(p => n.includes(p) || p.includes(n)) ? have : missing).push(i.name); });
  const pantryPct = Math.round((have.length / meal.ingredients.length) * 100);
  const ex = meal.experience || { timesMade: 0, confidence: "low", newSkills: [] };
  const confMap = { high: 95, medium: 65, low: 30, none: 10 };
  const expPct = Math.min(100, Math.max(0, Math.round((confMap[ex.confidence] || 30) + Math.min(ex.timesMade * 5, 30) - Math.min(ex.newSkills.length * 12, 40))));
  const blended = Math.round(pantryPct * 0.6 + expPct * 0.4);
  return { score: blended, color: blended >= 75 ? CL.green : blended >= 45 ? CL.yellow : CL.red, pantryPct, expPct, have, missing, exp: ex };
}
/* ═══════════════════════════════════════════
   ONBOARDING FLOW — NEW SEQUENCE
   1. Intro (Why Claude + Opus 4.6)
   2. What You Need (Claude tier breakdown)
   3. Challenge Prompt Exercise
   4. Build Prompt + "Come Back" transition
   5. Lessons:
      L1: Tools & services
      L2: Deploy to web
      L3: Iterating in GitHub (brand/aesthetic)
        3a: VS Code local editing
        3b: Branch mgmt / commits
      L4: Identity & storage
      L5: Mobile
   ═══════════════════════════════════════════ */

const LESSONS = [
  {
    id: "tools", num: "01", title: "Tools & Services Setup", icon: "🧰", color: CL.blue,
    desc: "Get every tool installed and connected before writing a line of code.",
    concept: "Building a real app requires a small toolchain — each tool has one job. Think of it like a kitchen: you need a knife (VS Code), a stove (Node.js), a recipe book (GitHub), and a dining room (Vercel). Claude is your sous chef. You don't need to master any of these — just get them installed.",
    checklist: [
      { id: "node", label: "Node.js", desc: "Runtime that powers all your dev tools. Download the LTS version.", link: "https://nodejs.org", icon: "⚙" },
      { id: "vscode", label: "VS Code", desc: "Free code editor — where you'll read, edit, and manage your project files.", link: "https://code.visualstudio.com/download", icon: "💻" },
      { id: "git", label: "Git", desc: "Version control — tracks every change you make. Mac: pre-installed. Windows: download it.", link: "https://git-scm.com/downloads", icon: "🔧" },
      { id: "github", label: "GitHub Account", desc: "Your code lives here in the cloud. Free account is all you need.", link: "https://github.com/signup", icon: "🐙" },
      { id: "vercel", label: "Vercel Account", desc: "Free hosting — deploys your app to a public URL. Sign up with GitHub.", link: "https://vercel.com/signup", icon: "🚀" },
    ],
    helpContext: "User is setting up dev tools: Node.js, VS Code, Git, GitHub, Vercel. Help with downloads, installs, path issues, and account creation.",
  },
  {
    id: "deploy", num: "02", title: "Deploying Your Prototype", icon: "🌐", color: CL.teal,
    desc: "Take your Claude-built React prototype from artifact to live URL in under 5 minutes.",
    concept: "Your React artifact lives inside Claude right now. To get it on the internet, we need to: save it as a file, push it to GitHub, and connect Vercel. Vercel watches your GitHub repo — every time you push changes, it automatically rebuilds and redeploys. Your app gets a free URL anyone can visit.",
    steps: [
      { title: "Download your artifact", desc: "In Claude, click the download icon on your React artifact. Save the .jsx or .html file to a new folder on your computer (e.g., ~/my-app/)." },
      { title: "Create a Vite project", desc: "Open Terminal in VS Code. Run: npx create-vite@latest my-app --template react → cd my-app → npm install. Replace src/App.jsx with your artifact code." },
      { title: "Test locally", desc: "Run npm run dev in Terminal. Open http://localhost:5173 in your browser. You should see your app running locally on your machine." },
      { title: "Push to GitHub", desc: "In Terminal: git init → git add . → git commit -m \"first deploy\" → Create a new repo on github.com → git remote add origin [URL] → git push -u origin main." },
      { title: "Deploy on Vercel", desc: "Go to vercel.com → Import Project → Select your GitHub repo → Click Deploy. In ~60 seconds you'll have a live URL." },
      { title: "Auto-deploy", desc: "From now on, every git push automatically triggers a new deployment. Change code → push → live in 60 seconds." },
    ],
    promptTemplate: "Help me deploy my React artifact to the web:\n1. I have a React artifact from Claude. Walk me through saving it as a Vite project.\n2. Show me the exact Terminal commands to:\n   - Create the project\n   - Install dependencies\n   - Test locally\n   - Initialize git\n   - Push to GitHub\n   - Connect to Vercel\n3. List any environment variables I need to set.\n4. Explain what happens when I push updates.",
    helpContext: "User is deploying their first React app. Help with Vite setup, git commands, GitHub repo creation, Vercel connection, and troubleshooting build errors.",
  },
  {
    id: "github", num: "03", title: "Iterating in GitHub", icon: "🐙", color: CL.purple,
    desc: "Make your app look and feel professional — brand, aesthetics, and code management.",
    concept: "Your app works but looks like AI spit it out. This lesson covers two things: making it look like YOUR product (brand, colors, typography, personality), and learning to manage code changes without breaking things. GitHub isn't just storage — it's your safety net.",
    steps: [
      { title: "Define your brand", desc: "Pick a name, 2-3 colors (use coolors.co), a mood (professional/playful/minimal), and light vs dark theme. This is the difference between 'generic dashboard' and a product." },
      { title: "Apply aesthetics in Claude", desc: "Tell Claude: 'Update my app's look — name it [X], use [color] as primary, [color] as accent, make it feel [mood]. Use a premium display font for headings and clean sans-serif for body.'" },
      { title: "Commit your changes", desc: "After each meaningful change, commit: git add . → git commit -m \"added brand styling\". Think of commits as save points in a video game." },
      { title: "Iterate in branches", desc: "Before big changes: git checkout -b feature-name. Work freely. When happy: git checkout main → git merge feature-name. This keeps your main version safe." },
    ],
    promptTemplate: "Update my app's aesthetic:\n- App name: [YOUR NAME]\n- Primary color: [HEX]\n- Accent color: [HEX]\n- Mood: [professional/playful/minimal/bold]\n- Theme: [light/dark]\n- Make the typography feel premium — use a distinctive display font for headings and a clean sans-serif for body text.\n- Add subtle touches that show personality (hover effects, micro-copy, empty states with character).\n- Keep the layout professional and SaaS-quality.",
    helpContext: "User is branding their app and learning git workflow. Help with color choices, font suggestions, git commands (commit, branch, merge), and resolving merge conflicts.",
    subLessons: [
      {
        id: "vscode-local", num: "3a", title: "Editing Code in VS Code", icon: "💻",
        desc: "How to read, navigate, and edit your project files locally.",
        steps: [
          { title: "Open your project", desc: "In VS Code: File → Open Folder → select your project folder. You'll see all files in the sidebar." },
          { title: "Navigate the file tree", desc: "src/App.jsx is your main app. public/ holds static files. package.json lists your dependencies. node_modules/ is auto-generated (never edit it)." },
          { title: "Make edits", desc: "Click any file to open it. VS Code highlights syntax, shows errors with red squiggles, and auto-saves. Use Cmd+S (Mac) or Ctrl+S (Windows) to save." },
          { title: "Use the integrated Terminal", desc: "View → Terminal opens a Terminal panel right inside VS Code. Run npm run dev here to test changes live." },
          { title: "Install extensions", desc: "Click the Extensions icon (left sidebar). Install: ES7+ React snippets, Prettier (auto-formatting), and GitLens (see who changed what)." },
        ],
        helpContext: "User is learning VS Code. Help with file navigation, keyboard shortcuts, extensions, and reading React/JSX files.",
      },
      {
        id: "branch-mgmt", num: "3b", title: "Branch Management & Commits", icon: "🌿",
        desc: "Keep your code safe while experimenting with changes.",
        steps: [
          { title: "Understand main", desc: "Your 'main' branch is the live version. Everything on main gets deployed. Never experiment directly on main." },
          { title: "Create a branch", desc: "git checkout -b dark-theme — this creates a parallel copy. All changes happen here, not on main." },
          { title: "Make commits", desc: "After each change: git add . → git commit -m \"describe what changed\". Good messages: \"added dark mode toggle\" not \"stuff\"." },
          { title: "Push branches", desc: "git push origin dark-theme — pushes your branch to GitHub. You can now see it on github.com." },
          { title: "Merge when ready", desc: "git checkout main → git merge dark-theme → git push. Your changes are now live. Vercel auto-deploys." },
          { title: "Handle conflicts", desc: "If both branches changed the same line, Git asks you to pick which version to keep. VS Code shows both — click to accept one." },
        ],
        helpContext: "User is learning git branching. Help with branch creation, switching, committing, merging, push/pull, and resolving conflicts.",
      },
    ],
  },
  {
    id: "identity", num: "04", title: "Identity & Storage", icon: "🔐", color: CL.green,
    desc: "Add login, user accounts, and persistent data so your app has memory.",
    concept: "Right now your app has amnesia — close the tab and everything resets. Every user sees the same thing. Identity (auth) gives each user their own space. Storage (database) gives your app memory. Together, they turn a demo into a real product. We use Supabase — it's free and handles both.",
    steps: [
      { title: "Create a Supabase project", desc: "Go to supabase.com → New Project → Pick a name and region. The free tier gives you auth + database + API." },
      { title: "Get your credentials", desc: "In Supabase: Settings → API. Copy your Project URL and anon/public key. These are your app's connection details." },
      { title: "Add to Vercel", desc: "Vercel → Project Settings → Environment Variables. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. Never put secrets directly in code." },
      { title: "Add authentication", desc: "Tell Claude to add a login/signup flow using Supabase Auth. Email + password is simplest to start." },
      { title: "Design your tables", desc: "What does your app need to remember? Users, items, settings? Each becomes a table in Supabase. Think of tables as spreadsheets." },
      { title: "Add Row Level Security", desc: "RLS ensures users only see their own data. One SQL rule per table. Without this, anyone can read anyone's data." },
      { title: "Wire it up", desc: "Replace in-memory state with Supabase reads/writes. Claude can generate all the connection code." },
    ],
    promptTemplate: "Add authentication and data persistence to my app using Supabase:\n\n1. Add a login/signup modal with email + password using Supabase Auth\n2. Show user email and logout button when logged in\n3. Design the database tables I need for [describe your data]\n4. Generate the SQL CREATE TABLE statements with Row Level Security\n5. Replace in-memory state with Supabase reads/writes\n6. Keep pre-loaded sample data as defaults for new users\n7. Add loading states and handle errors gracefully\n\nMy Supabase URL: [YOUR_URL]\nMy Supabase anon key: [YOUR_KEY]",
    helpContext: "User is adding auth and database. Help with Supabase setup, SQL table creation, RLS policies, environment variables, and troubleshooting auth flows.",
  },
  {
    id: "mobile", num: "05", title: "Building for Mobile", icon: "📱", color: CL.orange,
    desc: "Make your app work beautifully on phones, tablets, and desktops.",
    concept: "More than half of web traffic is mobile. If your app only works on desktop, you've lost most users before they start. Responsive design means your layout adapts to the screen size. The key idea: on mobile, things stack vertically. Sidebars collapse. Tables become cards. Hover effects become taps.",
    steps: [
      { title: "Think in breakpoints", desc: "Desktop (>1024px): full layout. Tablet (768-1024px): simplified layout. Mobile (<768px): stacked, single-column. Your CSS should change at each." },
      { title: "Add a responsive hook", desc: "Tell Claude to add a useMediaQuery hook that detects screen width. Then use it: if mobile, show cards; if desktop, show table." },
      { title: "Fix touch targets", desc: "All buttons need to be at least 44x44px on mobile. Your finger is bigger than a mouse cursor." },
      { title: "Replace hover effects", desc: "Hover doesn't exist on phones. Convert hover tooltips to tap-to-toggle. Convert hover highlights to active states." },
      { title: "Test on real devices", desc: "Chrome DevTools: right-click → Inspect → phone icon (top-left). Test at iPhone SE (375px) and iPad (768px). But also test on your actual phone." },
      { title: "Bottom navigation", desc: "On mobile, move primary navigation to the bottom of the screen. Thumbs reach the bottom; top nav requires a stretch." },
    ],
    promptTemplate: "Make my app fully mobile responsive:\n- Add a useMediaQuery hook that detects screen width\n- Desktop (>1024px): current layout\n- Tablet (768-1024px): collapse sidebar, stack panels\n- Mobile (<768px): bottom tab navigation, card-based layouts instead of tables, full-screen modals\n- Replace all hover tooltips with tap-to-toggle on mobile\n- Ensure all buttons are at least 44px touch targets\n- Test: everything should work at 375px width (iPhone SE)\n- Move primary nav to bottom on mobile",
    helpContext: "User is making their app mobile responsive. Help with CSS breakpoints, media queries, touch targets, mobile-first design, and testing on devices.",
  },
];
/* ═══════════════════════════════════════════
   ONBOARDING PHASE COMPONENTS
   ═══════════════════════════════════════════ */

/* ─── PHASE 1: INTRO — Why Code with Claude ─── */
function PhaseIntro({ onNext, onBack }) {
  return (
    <div className="fu" style={{ maxWidth: 640, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #7c3aed, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>⚡</div>
        <div>
          <div style={{ fontFamily: FN.m, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: CL.purple }}>Powered by</div>
          <div style={{ fontFamily: FN.d, fontSize: 22, fontWeight: 700, color: CL.navy }}>Claude · <span style={{ color: CL.purple }}>Opus 4.6</span></div>
        </div>
      </div>

      <h1 style={{ fontFamily: FN.d, fontSize: 28, fontWeight: 700, color: CL.navy, marginBottom: 12, lineHeight: 1.3 }}>Why Build with AI?</h1>

      <p style={{ fontSize: 15, lineHeight: 1.8, color: CL.textMd, marginBottom: 16 }}>
        You just explored <strong style={{ color: CL.teal }}>Run Recipes</strong> — a fully functional app. Every view, every component, every interaction was built by prompting Claude. No frameworks memorized. No Stack Overflow. Just an idea and a conversation.
      </p>

      <div style={{ background: CL.bg, borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: FN.m, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: CL.purple, marginBottom: 12 }}>What you're about to do</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "🎯", text: "Get a business challenge and describe your solution in plain English" },
            { icon: "⚡", text: "Paste a prompt into Claude and watch it generate a live React artifact you can click around" },
            { icon: "🔄", text: "Iterate on your prototype — change colors, add features, fix bugs — all through conversation" },
            { icon: "🚀", text: "Come back here to learn how to deploy it, add auth, storage, and mobile support" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
              <span style={{ fontSize: 13, lineHeight: 1.6, color: CL.text }}><JargonText text={item.text} /></span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: CL.purpleBg, borderRadius: 10, padding: "14px 18px", marginBottom: 24, border: "1px solid " + CL.purple + "25" }}>
        <div style={{ fontSize: 12, color: CL.purple, fontWeight: 600, marginBottom: 4, fontFamily: FN.d }}>💡 The mental model</div>
        <div style={{ fontSize: 13, color: CL.textMd, lineHeight: 1.6 }}><JargonText text="Think of Claude as a senior developer who works at the speed of conversation. You describe what you want in plain English. Claude writes the React code, the JSX, the state management, the styling — all of it. Your job is to direct, iterate, and ship." /></div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onBack} style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 14, cursor: "pointer", fontFamily: FN.b }}>← Back to Run Recipes</button>
        <button onClick={onNext} style={{ padding: "10px 28px", borderRadius: 10, background: CL.teal, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>I'm In →</button>
      </div>
    </div>
  );
}

/* ─── PHASE 2: What You Need — Claude Tier Breakdown ─── */
function PhaseClaudeTier({ onNext, onBack }) {
  return (
    <div className="fu" style={{ maxWidth: 640, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
      <h2 style={{ fontFamily: FN.d, fontSize: 24, fontWeight: 700, color: CL.navy, marginBottom: 6 }}>What You Need First: Claude</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: CL.textMd, marginBottom: 24 }}><JargonText text="Claude is your builder. You'll use it to generate React artifacts — live, interactive prototypes you can click around right in the chat. Here's what each plan gets you:" /></p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {/* Free */}
        <div style={{ padding: "18px 20px", borderRadius: 12, border: "1.5px solid " + CL.border, background: CL.bg }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontFamily: FN.d, fontSize: 17, fontWeight: 700, color: CL.navy }}>Free</div>
            <div style={{ fontFamily: FN.m, fontSize: 11, color: CL.textLt }}>$0/mo</div>
          </div>
          <div style={{ fontSize: 13, color: CL.textMd, lineHeight: 1.6, marginBottom: 8 }}><JargonText text="Enough to build your first React artifact. Limited messages per day, uses Sonnet. Perfect for trying the challenge prompt and seeing if this approach clicks." /></div>
          <div style={{ padding: "6px 12px", borderRadius: 6, background: CL.yellowBg, color: CL.yellow, fontSize: 11, fontWeight: 600, fontFamily: FN.m, display: "inline-block" }}>Good for one prototype</div>
        </div>

        {/* Pro */}
        <div style={{ padding: "18px 20px", borderRadius: 12, border: "1.5px solid " + CL.teal + "50", background: CL.tealBg + "80" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontFamily: FN.d, fontSize: 17, fontWeight: 700, color: CL.navy }}>Pro</div>
              <div style={{ padding: "2px 8px", borderRadius: 4, background: CL.teal, color: "#fff", fontSize: 9, fontFamily: FN.m, fontWeight: 600 }}>RECOMMENDED</div>
            </div>
            <div style={{ fontFamily: FN.m, fontSize: 11, color: CL.textMd }}>$20/mo</div>
          </div>
          <div style={{ fontSize: 13, color: CL.textMd, lineHeight: 1.6, marginBottom: 8 }}><JargonText text="5x more messages, access to Opus 4.6 (the smartest model), and higher rate limits. This is the sweet spot for building and iterating on your app. You won't hit walls mid-conversation." /></div>
          <div style={{ padding: "6px 12px", borderRadius: 6, background: CL.tealBg, color: CL.teal, fontSize: 11, fontWeight: 600, fontFamily: FN.m, display: "inline-block" }}>Sweet spot for building</div>
        </div>

        {/* Max */}
        <div style={{ padding: "18px 20px", borderRadius: 12, border: "1.5px solid " + CL.purple + "40", background: CL.purpleBg + "60" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontFamily: FN.d, fontSize: 17, fontWeight: 700, color: CL.navy }}>Max</div>
            <div style={{ fontFamily: FN.m, fontSize: 11, color: CL.textMd }}>$100/mo</div>
          </div>
          <div style={{ fontSize: 13, color: CL.textMd, lineHeight: 1.6, marginBottom: 8 }}><JargonText text="Unlimited Opus 4.6, highest priority, longest context windows. If you want to build production-ready deployments with complex multi-file apps, auth, databases, and API integrations — this is your tier." /></div>
          <div style={{ padding: "6px 12px", borderRadius: 6, background: CL.purpleBg, color: CL.purple, fontSize: 11, fontWeight: 600, fontFamily: FN.m, display: "inline-block" }}>Production-ready builds</div>
        </div>
      </div>

      <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 8, background: CL.blueBg, color: CL.blue, fontSize: 12, fontWeight: 600, textDecoration: "none", marginBottom: 8, fontFamily: FN.b }}>Open Claude → claude.ai</a>
      <div style={{ textAlign: "center", fontSize: 11, color: CL.textLt, marginBottom: 24 }}><JargonText text="Make sure Artifacts are enabled in Feature Previews (Settings → Feature Previews → Artifacts → On)" /></div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onBack} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 13, cursor: "pointer", fontFamily: FN.b }}>← Back</button>
        <button onClick={onNext} style={{ padding: "8px 24px", borderRadius: 8, background: CL.teal, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>I Have Claude →</button>
      </div>
    </div>
  );
}

/* ─── PHASE 3: Challenge Prompt ─── */
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
      <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 20, lineHeight: 1.6 }}>Here's a real business problem. Describe how you'd solve it — plain English, no jargon needed.</p>
      {loading && <div style={{ padding: 40, textAlign: "center" }}><div style={{ width: 24, height: 24, border: "3px solid " + CL.teal, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block", marginBottom: 10 }} /><div style={{ fontSize: 13, color: CL.textLt }}>Generating your challenge...</div></div>}
      {challenge && !loading && (<>
        <div style={{ background: CL.bg, border: "1.5px solid " + CL.orange + "40", borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 9, fontFamily: FN.m, color: CL.orange, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: 10 }}>The Challenge</div>
          <h3 style={{ fontFamily: FN.d, fontSize: 18, fontWeight: 700, color: CL.navy, marginBottom: 8 }}>{challenge.title}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: CL.textMd, marginBottom: 12 }}>{challenge.scenario}</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: CL.navy }}>{challenge.question}</p>
        </div>
        <button onClick={generateChallenge} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid " + CL.border, background: CL.white, color: CL.textMd, fontSize: 11, cursor: "pointer", fontFamily: FN.b, marginBottom: 16 }}>🎲 Different challenge</button>
        <div style={{ marginBottom: 8, fontFamily: FN.d, fontWeight: 600, fontSize: 13, color: CL.navy }}>Your Solution</div>
        <p style={{ fontSize: 12, color: CL.textLt, marginBottom: 10 }}>Describe what you'd build in plain English. No jargon needed.</p>
        <textarea value={solution} onChange={e => setSolution(e.target.value)} placeholder="Example: A tool that auto-detects meeting types based on notes, then tracks patterns so the team can see where their hours go..." style={{ width: "100%", minHeight: 120, padding: 16, borderRadius: 10, border: "1.5px solid " + CL.border, fontSize: 14, fontFamily: FN.b, lineHeight: 1.7, color: CL.text, resize: "vertical", background: CL.bg }} />
      </>)}
      <div style={{ marginTop: 16 }}><HelpChat context={"User is responding to challenge: " + (challenge?.title || "") + ". Help them think through features and how it would look."} phaseLabel="Your Challenge" /></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button onClick={onBack} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 13, cursor: "pointer", fontFamily: FN.b }}>← Back</button>
        <button onClick={() => onNext(challenge, solution)} disabled={solution.trim().length < 20} style={{ padding: "8px 24px", borderRadius: 8, background: solution.trim().length >= 20 ? CL.teal : CL.borderDk, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: solution.trim().length >= 20 ? "pointer" : "not-allowed", fontFamily: FN.b, opacity: solution.trim().length >= 20 ? 1 : 0.6 }}>Build My Solution →</button>
      </div>
    </div>
  );
}

/* ─── PHASE 4: Build Prompt + Transition ─── */
function PhaseBuild({ challenge, solution, onNext, onBack }) {
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generatePrompt() {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500,
          system: `You are an expert prompt engineer. Given a business challenge and a user's solution idea, generate a detailed prompt that will make Claude build a professional single-file React artifact.\n\nThe prompt should:\n1. Describe the app concept clearly\n2. Specify single React JSX artifact with inline styles and hooks\n3. Request professional SaaS-quality UI\n4. Define layout: nav bar, main content, relevant panels\n5. List specific features from the user's idea\n6. Request 6-8 pre-loaded realistic sample data entries\n7. End with: AESTHETIC:\\n[CUSTOMIZE THIS — tell Claude your preferred colors, dark/light theme, brand name, fonts, or mood]\n\nReturn ONLY the prompt text. No preamble, no markdown fences.`,
          messages: [{ role: "user", content: "CHALLENGE: " + challenge.title + "\n" + challenge.scenario + "\n\nUSER'S SOLUTION:\n" + solution }] }) });
      const data = await res.json();
      setPrompt((data.content?.map(b => b.text || "").join("") || "").trim());
    } catch {
      setPrompt("Build me a professional " + challenge.title.toLowerCase() + " app as a single React artifact with inline styles and hooks. It should have a clean SaaS-style UI, relevant data views, and 6-8 pre-loaded sample entries. Based on this idea: " + solution + "\n\nAESTHETIC:\n[CUSTOMIZE THIS — tell Claude your preferred colors, dark/light theme, brand name, fonts, or mood]");
    }
    setLoading(false);
  }

  useEffect(() => { if (!prompt && challenge && solution) generatePrompt(); }, [challenge, solution]);

  function copyPrompt() { navigator.clipboard?.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  return (
    <div className="fu" style={{ maxWidth: 620, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
      <h2 style={{ fontFamily: FN.d, fontSize: 22, fontWeight: 700, color: CL.navy, marginBottom: 6 }}>Your Build Prompt</h2>
      <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 20, lineHeight: 1.6 }}><JargonText text="Copy this prompt, paste it into Claude, and watch it generate a live React artifact you can interact with. Customize the AESTHETIC section to make it yours." /></p>

      {loading && <div style={{ padding: 40, textAlign: "center" }}><div style={{ width: 24, height: 24, border: "3px solid " + CL.purple, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block", marginBottom: 10 }} /><div style={{ fontSize: 13, color: CL.textLt }}>Crafting your build prompt...</div></div>}

      {prompt && !loading && (<>
        <div style={{ background: CL.tealBg, borderRadius: 10, padding: "12px 16px", marginBottom: 16, border: "1px solid " + CL.teal + "30" }}>
          <div style={{ fontSize: 10, fontFamily: FN.m, color: CL.teal, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Your Idea</div>
          <div style={{ fontSize: 12, color: CL.text, lineHeight: 1.5 }}>{solution}</div>
        </div>
        <div style={{ background: CL.bg, borderRadius: 10, border: "1px solid " + CL.border, padding: 16, fontSize: 12, fontFamily: FN.m, lineHeight: 1.7, color: CL.textMd, maxHeight: 250, overflow: "auto", whiteSpace: "pre-wrap", marginBottom: 16 }}>{prompt}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <button onClick={copyPrompt} style={{ padding: "10px 24px", borderRadius: 8, background: copied ? CL.green : CL.teal, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>{copied ? "✓ Copied!" : "📋 Copy Prompt"}</button>
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 24px", borderRadius: 8, background: CL.purple, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: FN.b }}>Open Claude →</a>
        </div>

        {/* Transition message */}
        <div style={{ background: "linear-gradient(135deg, " + CL.purpleBg + ", " + CL.tealBg + ")", borderRadius: 12, padding: 24, marginBottom: 16, border: "1px solid " + CL.purple + "20" }}>
          <div style={{ fontSize: 16, marginBottom: 8 }}>🔄</div>
          <div style={{ fontFamily: FN.d, fontSize: 16, fontWeight: 700, color: CL.navy, marginBottom: 8 }}>Go iterate in Claude. Come back when you're ready.</div>
          <div style={{ fontSize: 13, color: CL.textMd, lineHeight: 1.7 }}>
            <JargonText text="Spend time with your React artifact. Ask Claude to change colors, add features, fix bugs, add more sample data. Iterate until you have something you're proud of. When you're ready to deploy it to the real internet and start making it production-ready — come back here." />
          </div>
        </div>
      </>)}

      <div style={{ marginTop: 8 }}><HelpChat context={"User has their build prompt for: " + (challenge?.title || "") + ". Help with customizing the AESTHETIC section, understanding the generated prompt, or troubleshooting the Claude artifact."} phaseLabel="Build Prompt" /></div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button onClick={onBack} style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 13, cursor: "pointer", fontFamily: FN.b }}>← Back</button>
        <button onClick={onNext} style={{ padding: "8px 24px", borderRadius: 8, background: CL.teal, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>I'm Ready to Go Production →</button>
      </div>
    </div>
  );
}
/* ═══════════════════════════════════════════
   LESSON COMPONENTS
   ═══════════════════════════════════════════ */

function LessonView({ lesson, onBack, onComplete, isCompleted, toolsChecked, onToolsCheckedChange }) {
  const [activeTab, setActiveTab] = useState("concept");
  const [copied, setCopied] = useState(false);
  const [activeSubLesson, setActiveSubLesson] = useState(null);

  function copyPrompt() { navigator.clipboard?.writeText(lesson.promptTemplate); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  // Sub-lesson view
  if (activeSubLesson) {
    const sub = lesson.subLessons.find(s => s.id === activeSubLesson);
    return (
      <div className="fu" style={{ maxWidth: 620, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 0, boxShadow: "0 4px 24px rgba(0,0,0,.06)", overflow: "hidden" }}>
        <div style={{ padding: "20px 28px", borderBottom: "1px solid " + CL.border, background: CL.bg }}>
          <button onClick={() => setActiveSubLesson(null)} style={{ background: "none", border: "none", color: CL.textMd, fontSize: 12, cursor: "pointer", fontFamily: FN.b, marginBottom: 8 }}>← Back to Lesson {lesson.num}</button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 24 }}>{sub.icon}</div>
            <div>
              <div style={{ fontFamily: FN.m, fontSize: 9, color: CL.purple }}>LESSON {sub.num}</div>
              <div style={{ fontFamily: FN.d, fontSize: 18, fontWeight: 700, color: CL.navy }}>{sub.title}</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "24px 28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sub.steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: CL.bg, borderRadius: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: CL.purple, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: FN.m, flexShrink: 0 }}>{i + 1}</div>
                <div><div style={{ fontWeight: 600, fontSize: 13, color: CL.navy, marginBottom: 2 }}>{s.title}</div><div style={{ fontSize: 12, color: CL.textMd, lineHeight: 1.6 }}><JargonText text={s.desc} /></div></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20 }}><HelpChat context={sub.helpContext} phaseLabel={sub.title} /></div>
        </div>
      </div>
    );
  }

  // Tools lesson (has checklist instead of steps)
  const isToolsLesson = lesson.id === "tools";

  const tabs = isToolsLesson
    ? [{ id: "concept", label: "📖 Why" }, { id: "checklist", label: "✅ Checklist" }]
    : lesson.promptTemplate
      ? [{ id: "concept", label: "📖 Concept" }, { id: "steps", label: "🔨 Steps" }, { id: "prompt", label: "⚡ Prompt" }]
      : [{ id: "concept", label: "📖 Concept" }, { id: "steps", label: "🔨 Steps" }];

  return (
    <div className="fu" style={{ maxWidth: 620, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 0, boxShadow: "0 4px 24px rgba(0,0,0,.06)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px 28px", borderBottom: "1px solid " + CL.border, background: CL.bg }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: CL.textMd, fontSize: 12, cursor: "pointer", fontFamily: FN.b, marginBottom: 8 }}>← Back to Lessons</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 28 }}>{lesson.icon}</div>
          <div>
            <div style={{ fontFamily: FN.m, fontSize: 9, color: lesson.color || CL.teal }}>LESSON {lesson.num}</div>
            <h2 style={{ fontFamily: FN.d, fontSize: 20, fontWeight: 700, color: CL.navy }}>{lesson.title}</h2>
            <p style={{ fontSize: 12, color: CL.textMd }}>{lesson.desc}</p>
          </div>
          {isCompleted && <div style={{ marginLeft: "auto", padding: "4px 12px", borderRadius: 6, background: CL.greenBg, color: CL.green, fontSize: 11, fontFamily: FN.m, fontWeight: 600 }}>DONE ✓</div>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid " + CL.border }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, padding: "10px 8px", background: "none", border: "none", borderBottom: activeTab === t.id ? "2px solid " + CL.teal : "2px solid transparent", color: activeTab === t.id ? CL.teal : CL.textMd, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>{t.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px", minHeight: 280 }}>
        {activeTab === "concept" && (
          <div style={{ fontSize: 14, lineHeight: 1.8, color: CL.textMd }}><JargonText text={lesson.concept} /></div>
        )}
        {activeTab === "checklist" && lesson.checklist && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {lesson.checklist.map(t => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: toolsChecked?.[t.id] ? CL.greenBg : CL.bg, borderRadius: 10, border: "1px solid " + (toolsChecked?.[t.id] ? CL.green + "40" : CL.border), transition: "all 0.2s" }}>
                <div onClick={() => onToolsCheckedChange(p => ({ ...p, [t.id]: !p[t.id] }))} style={{ width: 22, height: 22, borderRadius: 6, border: "2px solid " + (toolsChecked?.[t.id] ? CL.green : CL.borderDk), background: toolsChecked?.[t.id] ? CL.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: "#fff", fontSize: 12, fontWeight: 700 }}>{toolsChecked?.[t.id] ? "✓" : ""}</div>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13, color: CL.navy }}>{t.label}</div><div style={{ fontSize: 11, color: CL.textMd, lineHeight: 1.4 }}><JargonText text={t.desc} /></div></div>
                <a href={t.link} target="_blank" rel="noopener noreferrer" style={{ padding: "4px 12px", borderRadius: 6, background: CL.white, color: CL.blue, fontSize: 11, fontWeight: 500, textDecoration: "none", border: "1px solid " + CL.border, flexShrink: 0 }}>Get →</a>
              </div>
            ))}
          </div>
        )}
        {activeTab === "steps" && lesson.steps && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {lesson.steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: CL.bg, borderRadius: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: lesson.color || CL.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: FN.m, flexShrink: 0 }}>{i + 1}</div>
                <div><div style={{ fontWeight: 600, fontSize: 13, color: CL.navy, marginBottom: 2 }}>{s.title}</div><div style={{ fontSize: 12, color: CL.textMd, lineHeight: 1.6 }}><JargonText text={s.desc} /></div></div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "prompt" && lesson.promptTemplate && (
          <div>
            <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 16, lineHeight: 1.6 }}><JargonText text="Copy this prompt template, customize the bracketed sections, and paste it into Claude." /></p>
            <div style={{ background: CL.bg, borderRadius: 10, border: "1px solid " + CL.border, padding: 16, fontSize: 12, fontFamily: FN.m, lineHeight: 1.7, color: CL.textMd, whiteSpace: "pre-wrap", marginBottom: 16, maxHeight: 220, overflow: "auto" }}>{lesson.promptTemplate}</div>
            <button onClick={copyPrompt} style={{ padding: "10px 24px", borderRadius: 8, background: copied ? CL.green : CL.teal, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>{copied ? "✓ Copied!" : "📋 Copy Prompt"}</button>
          </div>
        )}
      </div>

      {/* Sub-lessons */}
      {lesson.subLessons && (
        <div style={{ padding: "0 28px 20px", borderTop: "1px solid " + CL.border, paddingTop: 20 }}>
          <div style={{ fontFamily: FN.m, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: CL.textLt, marginBottom: 10 }}>Deep dives</div>
          <div style={{ display: "flex", gap: 8 }}>
            {lesson.subLessons.map(sub => (
              <button key={sub.id} onClick={() => setActiveSubLesson(sub.id)} style={{ flex: 1, padding: "12px 14px", borderRadius: 10, background: CL.bg, border: "1px solid " + CL.border, cursor: "pointer", textAlign: "left" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = CL.purple}
                onMouseLeave={e => e.currentTarget.style.borderColor = CL.border}>
                <div style={{ fontSize: 16, marginBottom: 4 }}>{sub.icon}</div>
                <div style={{ fontFamily: FN.m, fontSize: 9, color: CL.purple, marginBottom: 2 }}>LESSON {sub.num}</div>
                <div style={{ fontWeight: 600, fontSize: 12, color: CL.navy, fontFamily: FN.d }}>{sub.title}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: "16px 28px", borderTop: "1px solid " + CL.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <HelpChat context={lesson.helpContext} phaseLabel={lesson.title} />
        {!isCompleted && <button onClick={onComplete} style={{ padding: "8px 20px", borderRadius: 8, background: CL.green, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FN.b }}>✓ Mark Complete</button>}
      </div>
    </div>
  );
}

/* ─── LESSON HUB ─── */
function LessonHub({ onBack, completedLessons, onCompleteLesson, toolsChecked, onToolsCheckedChange }) {
  const [activeLesson, setActiveLesson] = useState(null);

  if (activeLesson) {
    const lesson = LESSONS.find(l => l.id === activeLesson);
    return (
      <LessonView
        lesson={lesson}
        onBack={() => setActiveLesson(null)}
        onComplete={() => { onCompleteLesson(activeLesson); setActiveLesson(null); }}
        isCompleted={completedLessons.includes(activeLesson)}
        toolsChecked={toolsChecked}
        onToolsCheckedChange={onToolsCheckedChange}
      />
    );
  }

  const completedCount = completedLessons.length;
  const totalCount = LESSONS.length;

  return (
    <div className="fu" style={{ maxWidth: 600, width: "100%", background: CL.white, borderRadius: 16, border: "1px solid " + CL.border, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
      <h2 style={{ fontFamily: FN.d, fontSize: 22, fontWeight: 700, color: CL.navy, marginBottom: 6 }}>Production Playbook</h2>
      <p style={{ fontSize: 13, color: CL.textMd, marginBottom: 8, lineHeight: 1.6 }}>Your prototype lives in Claude. These lessons take it from artifact to deployed, authenticated, mobile-ready product.</p>
      {completedCount > 0 && <div style={{ fontSize: 12, color: CL.teal, fontFamily: FN.m, fontWeight: 600, marginBottom: 16 }}>{completedCount}/{totalCount} lessons completed</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {LESSONS.map(l => {
          const done = completedLessons.includes(l.id);
          return (
            <div key={l.id} onClick={() => setActiveLesson(l.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: done ? CL.greenBg : CL.bg, borderRadius: 10, border: "1px solid " + (done ? CL.green + "40" : CL.border), cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { if (!done) e.currentTarget.style.borderColor = l.color || CL.teal; }}
              onMouseLeave={e => { if (!done) e.currentTarget.style.borderColor = CL.border; }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: done ? CL.green : l.color || CL.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: FN.m, flexShrink: 0 }}>{done ? "✓" : l.num}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: CL.navy, fontFamily: FN.d }}>{l.title}</div>
                <div style={{ fontSize: 12, color: CL.textMd, lineHeight: 1.4, marginTop: 2 }}>{l.desc}</div>
                {l.subLessons && <div style={{ fontSize: 10, color: l.color || CL.textLt, fontFamily: FN.m, marginTop: 4 }}>+ {l.subLessons.length} deep dives</div>}
              </div>
              {done
                ? <div style={{ padding: "4px 10px", borderRadius: 6, background: CL.green, color: "#fff", fontSize: 10, fontFamily: FN.m, fontWeight: 600, flexShrink: 0 }}>DONE ✓</div>
                : <div style={{ padding: "4px 10px", borderRadius: 6, background: (l.color || CL.teal) + "18", color: l.color || CL.teal, fontSize: 10, fontFamily: FN.m, fontWeight: 600, flexShrink: 0 }}>START →</div>}
            </div>
          );
        })}
      </div>

      {completedCount === totalCount && (
        <div style={{ background: CL.greenBg, borderRadius: 10, padding: "16px 20px", marginBottom: 20, border: "1px solid " + CL.green + "30" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: CL.green, marginBottom: 4, fontFamily: FN.d }}>🎉 All Lessons Complete!</div>
          <div style={{ fontSize: 13, color: CL.text, lineHeight: 1.6 }}>You've gone from zero to deployed, authenticated, mobile-ready product. Keep shipping.</div>
        </div>
      )}

      <button onClick={onBack} style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid " + CL.border, background: "none", color: CL.textMd, fontSize: 14, cursor: "pointer", fontFamily: FN.b }}>← Back to Run Recipes</button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ONBOARDING VIEW — STATE + ROUTING
   ═══════════════════════════════════════════ */

function OnboardingView({ onBack, user }) {
  const [phase, setPhase] = useState("intro");
  const [toolsChecked, setToolsChecked] = useState({});
  const [challengeData, setChallengeData] = useState(null);
  const [solutionData, setSolutionData] = useState("");
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load progress from Supabase
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
          if (data.modules_completed) setCompletedLessons(typeof data.modules_completed === "string" ? JSON.parse(data.modules_completed) : data.modules_completed);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [user?.token]);

  // Save progress on changes
  const saveRef = useRef(null);
  useEffect(() => {
    if (!loaded || !user?.token) return;
    clearTimeout(saveRef.current);
    saveRef.current = setTimeout(() => {
      fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        action: "save_progress", access_token: user.token,
        phase, tools_checked: toolsChecked, challenge: challengeData, solution: solutionData, modules_completed: completedLessons
      }) }).catch(() => {});
    }, 800);
  }, [phase, toolsChecked, challengeData, solutionData, completedLessons, loaded, user?.token]);

  function handleChallengeNext(challenge, solution) { setChallengeData(challenge); setSolutionData(solution); setPhase("build"); }
  function handleCompleteLesson(id) { setCompletedLessons(prev => prev.includes(id) ? prev : [...prev, id]); }

  const phases = ["intro", "claude", "challenge", "build", "lessons"];
  const phaseIndex = phases.indexOf(phase);

  if (!loaded) return <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: CL.textLt, fontFamily: FN.b }}>Loading your progress...</div>;

  return (
    <div style={{ flex: 1, overflow: "auto", background: CL.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 6, padding: "12px 32px", justifyContent: "center" }}>
        {phases.map((p, i) => <div key={p} style={{ width: i <= phaseIndex ? 24 : 10, height: 6, borderRadius: 3, background: i <= phaseIndex ? CL.teal : CL.border, transition: "all 0.3s" }} />)}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 32px 32px" }}>
        {phase === "intro" && <PhaseIntro onNext={() => setPhase("claude")} onBack={onBack} />}
        {phase === "claude" && <PhaseClaudeTier onNext={() => setPhase("challenge")} onBack={() => setPhase("intro")} />}
        {phase === "challenge" && <PhaseChallenge onNext={handleChallengeNext} onBack={() => setPhase("claude")} />}
        {phase === "build" && <PhaseBuild challenge={challengeData} solution={solutionData} onNext={() => setPhase("lessons")} onBack={() => setPhase("challenge")} />}
        {phase === "lessons" && <LessonHub onBack={onBack} completedLessons={completedLessons} onCompleteLesson={handleCompleteLesson} toolsChecked={toolsChecked} onToolsCheckedChange={setToolsChecked} />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   AUTH MODAL
   ═══════════════════════════════════════════ */
function AuthModal({ onClose, onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) { setError("Email and password required"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: mode, email, password }) });
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

/* ═══════════════════════════════════════════
   SIMPLIFIED DEMO — NavBar + Grid + Detail
   ═══════════════════════════════════════════ */

function NavBar({ activeView, onView, onBuild }) {
  return (
    <div style={{ background: CL.white, borderBottom: `1px solid ${CL.border}`, display: "flex", alignItems: "center", height: 44, padding: "0 16px", fontFamily: FN.b, fontSize: 13, position: "relative", zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 24, padding: "4px 12px 4px 8px", background: CL.bg, borderRadius: 6, border: `1px solid ${CL.border}` }}>
        <div style={{ width: 22, height: 22, borderRadius: 4, background: `linear-gradient(135deg, ${CL.teal}, ${CL.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🍳</div>
        <span style={{ fontFamily: FN.d, fontWeight: 700, fontSize: 13, color: CL.navy }}>Run Recipes</span>
      </div>
      <button onClick={() => onView("grid")} style={{ padding: "10px 12px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: FN.b, color: activeView === "grid" ? CL.teal : CL.text, borderBottom: activeView === "grid" ? `2px solid ${CL.teal}` : "2px solid transparent" }}>Meals</button>
      <div style={{ flex: 1 }} />
      <div onClick={onBuild} title="Build Your Own" style={{ width: 32, height: 32, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: CL.bg, border: `1px solid ${CL.border}`, transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${CL.teal}, ${CL.blue})`; e.currentTarget.style.borderColor = CL.teal; }}
        onMouseLeave={e => { e.currentTarget.style.background = CL.bg; e.currentTarget.style.borderColor = CL.border; }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={CL.textMd} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.5 4.5H18l-3.5 2.8 1.3 4.5L12 12.2l-3.8 2.6 1.3-4.5L6 7.5h4.5z" />
          <path d="M5 20h14" /><path d="M12 16v4" />
        </svg>
      </div>
    </div>
  );
}

function SimpleMealGrid({ meals, pantry }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = meals.find(m => m.id === selectedId);

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "8px 16px", borderBottom: `1px solid ${CL.border}`, background: CL.white, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 600, color: CL.navy }}>Meal Inspection</span>
          <span style={{ background: CL.teal, color: "#fff", padding: "1px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{meals.reduce((s, m) => s + m.servings, 0)} servings</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: FN.b }}>
          <thead><tr>
            {["", "NAME", "CHEF", "SERVINGS", "NOTES"].map((h, i) => (
              <th key={i} style={{ padding: "9px 10px", fontSize: 10, fontWeight: 600, color: CL.textLt, textTransform: "uppercase", fontFamily: FN.m, letterSpacing: "0.5px", borderBottom: `2px solid ${CL.border}`, background: CL.white, textAlign: "left" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {meals.map(m => {
              const isSel = selectedId === m.id;
              return (
                <tr key={m.id} onClick={() => setSelectedId(isSel ? null : m.id)} style={{ cursor: "pointer", background: isSel ? CL.selected : CL.white, borderBottom: `1px solid ${CL.border}` }}
                  onMouseEnter={e => { if (!isSel) e.currentTarget.style.background = CL.hover; }}
                  onMouseLeave={e => { if (!isSel) e.currentTarget.style.background = isSel ? CL.selected : CL.white; }}>
                  <td style={{ padding: "9px 10px", textAlign: "center", color: m.starred ? CL.orange : CL.borderDk, fontSize: 15 }}>{m.starred ? "★" : "☆"}</td>
                  <td style={{ padding: "9px 10px" }}><div style={{ fontWeight: 600, color: CL.navy }}>{m.name}</div><div style={{ fontSize: 11, color: CL.textLt }}>{m.cuisine}</div></td>
                  <td style={{ padding: "9px 10px", fontSize: 12, color: m.chef === "DoorDash" ? CL.red : CL.textMd }}>{m.chef === "DoorDash" ? "🛵 " : ""}{m.chef}</td>
                  <td style={{ padding: "9px 10px", textAlign: "center", fontFamily: FN.m, fontWeight: 600 }}>{m.servings}</td>
                  <td style={{ padding: "9px 10px", color: CL.textMd, fontSize: 12 }}>{m.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selected && (
        <div style={{ width: 300, minWidth: 300, borderLeft: `1px solid ${CL.border}`, background: CL.white, overflow: "auto", padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div><div style={{ fontFamily: FN.d, fontWeight: 700, fontSize: 14, color: CL.navy }}>{selected.name}</div><div style={{ fontSize: 11, color: CL.textLt }}>{selected.cuisine}</div></div>
            <button onClick={() => setSelectedId(null)} style={{ background: "none", border: "none", cursor: "pointer", color: CL.textLt, fontSize: 18 }}>×</button>
          </div>
          <div style={{ fontFamily: FN.d, fontWeight: 600, fontSize: 12, color: CL.navy, marginBottom: 8 }}>Ingredients</div>
          {selected.ingredients.map((ing, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${CL.bg}`, fontSize: 12 }}><span>{ing.name}</span><span style={{ fontFamily: FN.m, fontSize: 11, color: CL.teal }}>{ing.amount} {ing.unit}</span></div>)}
          <div style={{ fontFamily: FN.d, fontWeight: 600, fontSize: 12, color: CL.navy, marginBottom: 8, marginTop: 16 }}>Steps</div>
          {selected.steps.map((s, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12, lineHeight: 1.5 }}><span style={{ color: CL.teal, fontFamily: FN.m, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span><span style={{ color: CL.textMd }}>{s}</span></div>)}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */

export default function RunRecipes() {
  const [view, setView] = useState("grid");
  const [pantry] = useState(INIT_PANTRY);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [pendingBuild, setPendingBuild] = useState(false);

  function handleAuth(authData) {
    setUser({ email: authData.email || authData.user?.email, token: authData.access_token });
    if (pendingBuild) { setView("build"); setPendingBuild(false); }
  }

  function handleBuild() {
    if (user) { setView("build"); } else { setPendingBuild(true); setShowAuth(true); }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", fontFamily: FN.b, background: CL.bg }}>
      <style>{globalCSS}</style>
      <NavBar activeView={view} onView={setView} onBuild={handleBuild} />
      {/* Auth button in nav */}
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
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {view === "grid" && <SimpleMealGrid meals={MEALS} pantry={pantry} />}
        {view === "build" && !user && (() => { if (!showAuth) { setShowAuth(true); setView("grid"); setPendingBuild(true); } return null; })()}
        {view === "build" && user && <OnboardingView onBack={() => setView("grid")} user={user} />}
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={handleAuth} />}
    </div>
  );
}
