import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail, Linkedin, Send, X, MessageCircle, ArrowDown, MapPin, Bot, ArrowUpRight,
  Terminal, Wrench, Sparkles, Database, MessageSquare, LineChart, Eye,
  Image as ImageIcon, User, Globe
} from "lucide-react";

// ============================================
// SAGE PALETTE (#8A9A5B base)
// ============================================
const SAGE = {
  50: "#EDF0DC",
  100: "#C5CFA0",
  200: "#A8B67C",
  500: "#8A9A5B",
  600: "#6B7A45",
  700: "#4D5636",
  900: "#2E3520",
  a04: "rgba(138, 154, 91, 0.04)",
  a08: "rgba(138, 154, 91, 0.08)",
  a15: "rgba(138, 154, 91, 0.15)",
  a30: "rgba(138, 154, 91, 0.30)",
  a40: "rgba(138, 154, 91, 0.40)",
};
const INK = "#1A1D14";
const INK_MUTED = "#5C5F50";
const PAPER = "#FAFAF6";
const BORDER = "#E4E6D9";

// ============================================
// DATA
// ============================================

const EXPERIENCES = [
  {
    company: "Luma AI",
    role: "Talent Engineering & Operations",
    period: "2025 — Present",
    location: "Remote (HQ: Palo Alto, CA)",
    type: "featured",
    description: "Own the full recruiting and people tech stack at a Series C AI company ($1.4B+ raised, $4B valuation). Build the platforms that help the recruiting team scale — most of them written, not bought. Daily work mixes recruiting ops with shipping software using AI coding tools.",
    highlights: [
      "Shipped the careers site from scratch — solo build, no engineering ask",
      "Built a custom recruiting analytics platform in-house, replacing off-the-shelf BI tools",
      "Built an internal sourcing platform for teams to find and reach talent at scale",
      "Created a recruiting enablement platform for interviewer training and calibration",
      "Engineered end-to-end workflow automations across the full recruiting lifecycle",
      "Established a company-wide source of truth for headcount, velocity, and quality",
    ],
    tags: ["AI Coding Tools", "Custom Analytics", "Ashby", "Agentic Workflows", "Careers Site"],
  },
  {
    company: "GEICO",
    role: "Lead, Talent Sourcer",
    period: "2024 — 2025",
    location: "Remote (HQ: Palo Alto, CA)",
    type: "standard",
    description: "Sole talent sourcer for senior and leadership hiring across Engineering and Product. Built end-to-end sourcing processes and strategic pipelines for hard-to-fill roles.",
    tags: ["Technical Sourcing", "Executive Hiring", "Talent Mapping"],
  },
  {
    company: "Abnormal Heights Rooftop",
    role: "Partner & Operations",
    period: "2023 — 2024",
    location: "San Diego, CA",
    type: "standard",
    description: "Co-founded and launched a rooftop bar and restaurant. Led operations from pre-launch through steady state, including design, strategy, hiring, and training.",
    tags: ["Entrepreneurship", "Operations", "Hiring"],
  },
  {
    company: "ThoughtSpot",
    role: "Sr Manager, Recruiting Operations & Sourcing",
    period: "2022 — 2023",
    location: "Vancouver, BC",
    type: "featured",
    description: "Led Global Talent Operations and the Talent Sourcing team. Drove a strategic overhaul of recruiting operations and technology across the full hiring lifecycle.",
    highlights: [
      "Overhauled recruitment and onboarding with a new technology stack",
      "Migrated hiring data to ThoughtSpot analytics, creating the first self-service TA dashboards",
      "Delivered early AI/GPT use case training for recruiting teams, pre-mainstream",
      "Led RFP evaluation and implementation of new recruiting technology",
    ],
    tags: ["RecOps Leadership", "Team Management", "Recruiting Analytics", "AI Training"],
  },
  {
    company: "realtor.com",
    role: "Sourcer → Recruiter → Manager, People Platforms & Analytics",
    period: "2017 — 2022",
    location: "Los Angeles, CA & Vancouver, Canada",
    type: "featured",
    description: "4+ years of progressive growth across four roles. Built and led two net-new functions: People Platforms and People Analytics. Proposed and grew the company's first-ever Recruiting Research team. Owned the workflows, analysis, and experiments that informed the full Talent and People organization.",
    highlights: [
      "Created People Platforms and People Analytics as new functions from scratch",
      "Built the inaugural Recruiting Research team, with strategies adopted across TA, HR, and business",
      "Developed analytics workflows to measure and predict engagement and retention",
      "Partnered with Head of TA and CPO on recruiting ops and talent insights strategy",
    ],
    tags: ["Recruiting Analytics", "Platform Ownership", "Team Building", "Recruiting Research"],
  },
  {
    company: "BuildDirect Technologies",
    role: "Technical Recruiter",
    period: "2016 — 2017",
    location: "Vancouver, Canada",
    type: "compact",
    description: "Full-cycle technical recruitment across three offices. Founded the BD Talks meetup series. Built a co-op recruitment platform for university branding.",
    tags: ["Technical Recruiting", "Employer Branding"],
  },
  {
    company: "Deutsche Bank",
    role: "Technical Recruiter",
    period: "2015",
    location: "London, UK",
    type: "compact",
    description: "Talent acquisition across Technology & Operations and Corporate Banking. Recruited from Associate to Director level.",
    tags: ["Enterprise Recruiting", "Financial Services"],
  },
  {
    company: "Alexander Mann Solutions",
    role: "Talent Acquisition Specialist",
    period: "2014 — 2015",
    location: "Bracknell, UK",
    type: "compact",
    description: "RPO sourcing for global blue-chip companies across IT, Technology, and Financial Services.",
    tags: ["RPO", "Contingent Sourcing"],
  },
  {
    company: "Tempest Resourcing",
    role: "Recruitment Consultant",
    period: "2012 — 2014",
    location: "London, UK",
    type: "compact",
    description: "Built a recruiting desk from scratch. Progressed from Trainee to Consultant.",
    tags: ["Agency Recruiting"],
  },
];

const PORTFOLIO_ITEMS = [
  {
    title: "Luma AI Careers Site",
    subtitle: "Talent brand front door",
    description: "Designed, written, and shipped from scratch as a solo build. The primary entry point for every candidate considering Luma.",
    url: "https://lumalabs.ai/careers",
    type: "live",
    screenshot: null,
  },
  {
    title: "Custom Recruiting Analytics Platform",
    subtitle: "Built, not bought",
    description: "Pulls data from Ashby, runs it through our own pipeline, and serves dashboards we host ourselves. Replaced the off-the-shelf BI vendor entirely.",
    type: "system",
    screenshot: null,
  },
  {
    title: "Internal Sourcing Platform",
    subtitle: "Find and reach talent at scale",
    description: "A purpose-built tool for the team to identify, surface, and reach candidates — wired into our stack end-to-end.",
    type: "system",
    screenshot: null,
  },
  {
    title: "Recruiting Enablement Hub",
    subtitle: "Interviewer training and calibration",
    description: "The home for interviewer training, calibration programs, and quality signals. Built to make great interviewing the default, not the exception.",
    type: "system",
    screenshot: null,
  },
  {
    title: "Agentic Recruiting Workflows",
    subtitle: "Intake to offer, automated",
    description: "End-to-end automations built with Claude API, Zapier, n8n, and Python. Absorbs the toil so recruiters can focus on the work that needs a human.",
    type: "system",
    screenshot: null,
  },
  {
    title: "Talent Engineering Blueprint",
    subtitle: "The operating model underneath",
    description: "My framework for treating recruiting operations as infrastructure. The reasoning behind the builds, not just the builds themselves.",
    type: "concept",
    screenshot: null,
  },
];

const STATS = [
  { value: 14, suffix: "+", label: "Years in talent", icon: Terminal },
  { value: 4, suffix: "", label: "Countries", icon: Globe },
  { value: 6, suffix: "", label: "Tools shipped at Luma", icon: Wrench },
  { value: 2012, suffix: "", label: "Recruiting since", icon: Sparkles },
];

const STACK_CATEGORIES = [
  {
    name: "Daily Drivers",
    icon: Terminal,
    tools: ["Claude Code", "Claude Cowork", "Cursor", "Terminal"],
  },
  {
    name: "ATS / CRM",
    icon: Database,
    tools: ["Gem", "Ashby"],
  },
  {
    name: "Sourcing",
    icon: LineChart,
    tools: ["LinkedIn Recruiter", "SeekOut", "Juicebox", "Gem AI", "Common Room"],
  },
  {
    name: "Automation",
    icon: Wrench,
    tools: ["Zapier", "n8n", "Relay.app", "Python", "Make"],
  },
  {
    name: "Interview Intel & Notetaking",
    icon: Eye,
    tools: ["Metaview (notetaker, reporting, MCP)"],
  },
  {
    name: "Assessment",
    icon: Sparkles,
    tools: ["CodeSignal"],
  },
  {
    name: "AI / Agents",
    icon: Bot,
    tools: ["Claude (API + Agents)", "Claude Code / Cowork", "Exa.ai (search primitive for agents)", "Relevance AI", "CrewAI"],
  },
  {
    name: "Comms & Docs",
    icon: MessageSquare,
    tools: ["Slack", "Notion", "Google Workspace", "Gamma"],
  },
];

const WORKFLOW_STEPS = [
  {
    n: "01",
    title: "Scope in plain English",
    body: "Start with the problem, not the tech. What's broken, what needs to happen, who benefits. If I can't explain it in two sentences, I'm not ready to build it.",
  },
  {
    n: "02",
    title: "Prototype with AI",
    body: "Claude Code or Cowork for the first version. Speed over polish. The goal is something testable in hours, not weeks.",
  },
  {
    n: "03",
    title: "Ship it scrappy",
    body: "Get it in front of a real user fast. Even if it's ugly. Feedback beats speculation every time.",
  },
  {
    n: "04",
    title: "Harden what works",
    body: "Only the systems that earn their keep get promoted to production. Everything else stays in prototype purgatory or gets killed.",
  },
];

const FIELD_NOTES = [
  {
    n: "01",
    take: "Build vs buy has already flipped.",
    body: "The calculus on internal tools changed the second AI coding tools got good. Ten years ago, \u201Clet's build it\u201D meant a year-long engineering commitment. Today it means a weekend. If a recruiting team isn't building its own infrastructure, it's usually because it doesn't know it can, not because it shouldn't.",
  },
  {
    n: "02",
    take: "Most RecOps work is software engineering in a trenchcoat.",
    body: "If your job is workflow design, integrations, data pipelines, dashboards, and automation — you're already doing engineering. You just don't call it that. The faster you accept the frame, the faster you start using the right tools for the job.",
  },
  {
    n: "03",
    take: "Agent-led sourcing is where I'm placing my bet.",
    body: "I think most sourcing work in the next few years moves to humans designing the systems and agents running them. Not a prediction about anyone's job — just where I'm focusing my own time and curiosity. The sourcers I know who understand their craft are already getting outsized leverage from this shift.",
  },
  {
    n: "04",
    take: "The mindset matters more than the background.",
    body: "Some of the best recruiting ops people I've worked with came from recruiting. Some came from systems. The common thread: they reach for process engineering and tooling before they reach for another spreadsheet. That's the move.",
  },
  {
    n: "05",
    take: "Recruiter toil is a design flaw, not a fact of life.",
    body: "Scheduling, data entry, status updates, report generation — that work shouldn't belong to the humans hiring humans. It belongs to the stack. Every hour a recruiter spends on it is an hour the system failed to absorb. That's what Talent Engineering is for.",
  },
  {
    n: "06",
    take: "Recruiting teams are closer to engineering than HR.",
    body: "Hot take, softly held. The mechanics of hiring — pipelines, throughput, quality, systems — are closer to sales operations or engineering infrastructure than to employee relations. I'm not saying recruiting doesn't belong in People. I'm saying the tooling and mental model the best RecOps teams use looks a lot more like GTM ops than HR.",
  },
];

const CHAT_KNOWLEDGE = [
  { keywords: ["hi", "hello", "hey", "sup", "howdy"], response: "Hey! I'm a mini version of Josh's brain. Ask me about his experience, what he's building at Luma, his take on Talent Engineering, or the tools he ships with." },
  { keywords: ["experience", "background", "career", "history", "resume"], response: "Josh has 14+ years across recruiting, talent ops, and systems work. Started as a sourcer in London in 2012, moved through technical recruiting at Deutsche Bank and BuildDirect, then into leadership at realtor.com and ThoughtSpot. Now he owns the full recruiting and people tech stack at Luma AI. The through-line: treating recruiting ops as an engineering discipline — and now actually shipping the software." },
  { keywords: ["luma", "current", "now", "today", "present"], response: "At Luma AI, Josh owns the full recruiting and people tech stack. He's shipped the careers site (solo build), a custom analytics platform that replaced the off-the-shelf BI vendor, an internal sourcing platform, an interviewer enablement hub, and a set of agentic workflows that run the hiring lifecycle. Luma builds multimodal AI (Dream Machine, Ray3, Photon) and is scaling fast." },
  { keywords: ["skill", "tool", "tech", "stack", "platform"], response: "Daily drivers: Claude Code, Claude Cowork, Cursor. ATS/CRM: Ashby, Gem. Automation: Zapier, n8n, Python, Relay. Sourcing: LinkedIn Recruiter, SeekOut, Juicebox, Gem AI, Common Room. AI/Agents: Claude API, Exa, Relevance AI, CrewAI. Interview intel: Metaview. Check out the Stack section for the full rundown." },
  { keywords: ["claude code", "cursor", "coding", "build", "vibe"], response: "Josh builds with Claude Code, Cursor, and Claude Cowork the way most ops leaders use spreadsheets. Most of what he ships at Luma — the careers site, the custom analytics platform, the sourcing and enablement tools — gets prototyped or fully built using AI coding tools. The approach: scope in plain English, prototype fast, ship scrappy, harden what works." },
  { keywords: ["analytics", "dashboard", "bi", "data"], response: "Josh built Luma's recruiting analytics platform from scratch and hosts it in-house. Data pulls from Ashby, runs through a custom pipeline, and serves dashboards the team actually uses. Replaced the off-the-shelf BI vendor. It's a good example of build-vs-buy: when the tool is the bottleneck, you build." },
  { keywords: ["talent engineering", "what is", "define", "mean"], response: "Talent Engineering is how Josh describes the work: recruiting operations plus systems engineering plus AI automation. It's about building the infrastructure that helps recruiting teams scale — and shipping that infrastructure yourself rather than waiting for vendors or engineering. Treat recruiting ops like a product. Own the stack like an engineer owns a codebase." },
  { keywords: ["build", "buy", "vendor"], response: "Josh's rule of thumb: buy when the problem is solved. Build when the tool is the bottleneck. AI coding tools flipped the economics of building — what used to be a six-month engineering ask is now a weekend project. Most of the tools at Luma aren't bought, they're built." },
  { keywords: ["agent", "agentic", "sourcing ai", "ai sourcing"], response: "Josh is betting that most sourcing work in the next few years moves to humans designing the systems and agents running them. He's building in that direction at Luma. Not a verdict on anyone's job — just where he's focusing his own time and curiosity." },
  { keywords: ["contact", "reach", "email", "hire", "connect"], response: "Best way to reach Josh: joshcorey2@gmail.com or connect on LinkedIn at linkedin.com/in/gilljosh. He's always down to talk about recruiting systems, build-vs-buy, or what Talent Engineering could look like at your company." },
  { keywords: ["realtor", "move"], response: "At realtor.com, Josh had a 4+ year run across four roles: Technical Recruiter → Lead, Talent Sourcing → Manager, Talent Sourcing & Intelligence → Manager, People Platforms & Analytics. He built two net-new functions (People Platforms and People Analytics) and founded the company's first Recruiting Research team." },
  { keywords: ["thoughtspot"], response: "At ThoughtSpot, Josh was Sr Manager of Recruiting Operations & Sourcing. He led Global Talent Operations, drove a full overhaul of recruiting technology, migrated hiring data to ThoughtSpot's own analytics platform, and delivered early AI/GPT training for recruiting teams before it went mainstream." },
  { keywords: ["entrepreneurship", "restaurant", "bar", "abnormal"], response: "In 2023-2024, Josh co-founded Abnormal Heights Rooftop, a bar and restaurant in San Diego. Led operations from pre-launch through steady state — design, hiring, strategy, the whole thing. Different context, same builder instinct." },
  { keywords: ["location", "where", "based", "live"], response: "Based in San Diego with regular time in the SF Bay Area. Works remotely for Luma AI, which is headquartered in Palo Alto." },
  { keywords: ["careers site", "careers page", "lumalabs"], response: "Josh shipped Luma's careers site as a solo build — design, copy, code, deploy. No engineering team, no marketing brief, no Figma round. Vibe-coded end to end using AI coding tools. It's the primary front door to Luma's talent brand today. See the Deep Dive section for the full story." },
];

const DEFAULT_CHAT_RESPONSE = "I'm not sure about that one. Try asking about Josh's experience, what he's building at Luma, his tools and stack, his take on build-vs-buy, or how to reach him.";

// ============================================
// HOOKS
// ============================================

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isInView];
}

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
}

function useCountUp(target, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, shouldStart]);
  return count;
}

// ============================================
// UTILITY
// ============================================

function getChatResponse(input) {
  const lower = input.toLowerCase().trim();
  if (!lower) return DEFAULT_CHAT_RESPONSE;
  for (const entry of CHAT_KNOWLEDGE) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return DEFAULT_CHAT_RESPONSE;
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ============================================
// PARTICLE NETWORK (hero background)
// ============================================

function ParticleNetwork() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const COUNT = Math.min(80, Math.floor((w * h) / 15000));
    const CONNECT_DIST = 150;
    const MOUSE_DIST = 200;

    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse, { passive: true });

    function animate() {
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 0) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(138, 154, 91, 0.45)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < CONNECT_DIST) {
            const alpha = (1 - cdist / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(138, 154, 91, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (dist < MOUSE_DIST * 1.5) {
          const alpha = (1 - dist / (MOUSE_DIST * 1.5)) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(138, 154, 91, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ============================================
// COMPONENTS
// ============================================

function Navigation() {
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 60;

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? "12px 0" : "20px 0",
        backgroundColor: scrolled ? "rgba(250,250,246,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => scrollTo("hero")} aria-label="Scroll to top" style={{ fontWeight: 700, fontSize: 18, color: SAGE[700], background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.02em" }}>
          JG
        </button>
        <div style={{ display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {[["About", "about"], ["Stack", "stack"], ["Journey", "journey"], ["Work", "work"], ["Deep Dive", "deep-dive"], ["Notes", "notes"], ["Contact", "contact"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: INK_MUTED, fontFamily: "inherit", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = SAGE[600]}
              onMouseLeave={(e) => e.target.style.color = INK_MUTED}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [ref, isInView] = useInView(0.1);
  return (
    <header id="hero" ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 24px 80px" }}>
      <ParticleNetwork />

      {/* Decorative orbs */}
      <div style={{
        position: "absolute", top: "8%", right: "2%", width: 560, height: 560, borderRadius: "50%",
        background: `radial-gradient(circle, ${SAGE.a08} 0%, transparent 70%)`,
        animation: "float 8s ease-in-out infinite", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "12%", left: "-3%", width: 480, height: 480, borderRadius: "50%",
        background: `radial-gradient(circle, ${SAGE.a04} 0%, transparent 70%)`,
        animation: "float 10s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Photo placeholder — swap src when ready */}
        <div style={{
          width: 112, height: 112, borderRadius: "50%", margin: "0 auto 28px",
          background: `linear-gradient(135deg, ${SAGE[50]} 0%, ${SAGE[100]} 50%, ${SAGE[200]} 100%)`,
          border: "4px solid white",
          boxShadow: `0 8px 32px ${SAGE.a30}, 0 0 0 1px ${SAGE.a15}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
          transition: "all 0.6s ease-out",
        }}>
          {/* Replace with: <img src="/headshot.jpg" alt="Joshua Gill" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
          <User size={38} color={SAGE[600]} strokeWidth={1.5} />
        </div>

        <div style={{
          display: "inline-block", padding: "6px 16px", borderRadius: 100, backgroundColor: "rgba(237,240,220,0.9)",
          border: `1px solid ${SAGE[100]}`, marginBottom: 24, fontSize: 13, fontWeight: 500, color: SAGE[700],
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out 0.1s",
          backdropFilter: "blur(8px)",
        }}>
          Talent Engineering & Operations @ Luma AI
        </div>

        <h1 style={{
          fontSize: "clamp(44px, 8vw, 78px)", fontWeight: 800, lineHeight: 1.03,
          letterSpacing: "-0.04em", margin: "0 0 22px",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease-out 0.2s",
          background: `linear-gradient(135deg, ${INK} 0%, ${SAGE[900]} 35%, ${SAGE[600]} 65%, ${INK} 100%)`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: isInView ? "shimmer 5s ease-in-out infinite" : "none",
        }}>
          Joshua Gill
        </h1>

        <p style={{
          fontSize: "clamp(18px, 2.3vw, 22px)", color: INK, lineHeight: 1.55, margin: "0 0 16px",
          maxWidth: 640, marginLeft: "auto", marginRight: "auto", fontWeight: 500,
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.7s ease-out 0.35s",
        }}>
          I build the platforms that help recruiting teams scale. Careers sites, custom analytics, sourcing tools, enablement hubs, agentic workflows — most of them shipped solo.
        </p>

        <p style={{
          fontSize: "clamp(15px, 1.8vw, 17px)", color: INK_MUTED, lineHeight: 1.65, margin: "0 0 40px",
          maxWidth: 620, marginLeft: "auto", marginRight: "auto",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.7s ease-out 0.45s",
        }}>
          14 years in recruiting and talent ops. The last few spent learning to code past the tooling ceiling, so I buy what's solved and build what isn't.
        </p>

        <div style={{
          display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease-out 0.55s",
        }}>
          <button onClick={() => scrollTo("work")} style={{
            padding: "15px 30px", borderRadius: 13, backgroundColor: SAGE[600], color: "white",
            border: "none", cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "inherit",
            transition: "all 0.25s", boxShadow: `0 2px 8px ${SAGE.a30}`,
          }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = SAGE[700]; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 4px 16px ${SAGE.a40}`; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = SAGE[600]; e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 2px 8px ${SAGE.a30}`; }}
          >
            See what I've shipped
          </button>
          <button onClick={() => scrollTo("contact")} style={{
            padding: "15px 30px", borderRadius: 13, backgroundColor: "transparent", color: SAGE[700],
            border: `1px solid ${SAGE[200]}`, cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "inherit",
            transition: "all 0.25s",
          }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = SAGE[50]; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.transform = "translateY(0)"; }}
          >
            Get in touch
          </button>
        </div>

        <div style={{
          marginTop: 56, opacity: isInView ? 1 : 0, transition: "opacity 1.2s ease-out 0.8s",
        }}>
          <button onClick={() => scrollTo("stats")} aria-label="Scroll to stats" style={{ background: "none", border: "none", cursor: "pointer", color: SAGE[500], animation: "bounce 2s infinite" }}>
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ============================================
// STATS BAR
// ============================================

function StatCard({ stat, index }) {
  const [ref, isInView] = useInView(0.3);
  const count = useCountUp(stat.value, 1800, isInView);
  const Icon = stat.icon;

  return (
    <div ref={ref} style={{
      textAlign: "center", padding: "28px 18px",
      opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.6s ease-out ${index * 0.1}s`,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, margin: "0 auto 14px",
        background: `linear-gradient(135deg, ${SAGE[50]}, ${SAGE.a15})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${SAGE[100]}`,
      }}>
        <Icon size={20} color={SAGE[600]} />
      </div>
      <div style={{
        fontSize: "clamp(34px, 5vw, 46px)", fontWeight: 800, color: INK,
        letterSpacing: "-0.03em", lineHeight: 1,
      }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: 13, color: INK_MUTED, marginTop: 6, fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <section id="stats" aria-label="Career stats" style={{ padding: "56px 24px 48px", borderBottom: `1px solid ${BORDER}`, backgroundColor: "white" }}>
      <div style={{
        maxWidth: 960, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8,
      }}>
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}

// ============================================
// ABOUT
// ============================================

function About() {
  const [ref, isInView] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "100px 24px", backgroundColor: PAPER }}>
      <div style={{
        maxWidth: 700, margin: "0 auto",
        opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease-out",
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: SAGE[600], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>About</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: INK, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 28 }}>
          A traditional talent ops leader who learned to code past the tooling ceiling.
        </h2>
        <div style={{ fontSize: 16, color: INK_MUTED, lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{margin: 0}}>
            I started recruiting in 2012. Sourcer, then technical recruiter, then ops lead, then running global talent operations, then owning the tech stack. Every role taught me the same thing: the best recruiting teams aren't the ones working harder — they're the ones running on systems that help good hiring happen by default.
          </p>
          <p style={{margin: 0}}>
            The last few years I stopped waiting for vendors and engineering teams to build the tools I wanted. AI coding tools made that possible. Now I ship software alongside the recruiting work — careers sites, custom analytics platforms, sourcing tools, automation, whatever the team actually needs.
          </p>
          <p style={{margin: 0}}>
            I call the whole thing Talent Engineering and Operations. It's recruiting operations plus systems engineering plus AI. Buy when the problem is solved. Build when the tool is the bottleneck. Focus on the work that needs a human, and absorb the rest into the stack.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32 }}>
          {["Talent Engineering", "Recruiting Operations", "AI Coding Tools", "Agentic Workflows", "Ashby", "Custom Analytics", "Process Engineering", "Sourcing Strategy"].map((skill) => (
            <span key={skill} style={{
              padding: "6px 14px", borderRadius: 100, backgroundColor: SAGE[50], border: `1px solid ${SAGE[100]}`,
              fontSize: 13, fontWeight: 500, color: SAGE[700],
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// STACK
// ============================================

function Stack() {
  const [ref, isInView] = useInView(0.05);
  return (
    <section id="stack" ref={ref} style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out", marginBottom: 48, maxWidth: 680,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: SAGE[600], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Stack</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: INK, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 16 }}>
            How I actually work
          </h2>
          <div style={{ fontSize: 16, color: INK_MUTED, lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{margin: 0}}>
              My job is to build the platforms that help recruiting teams scale. That means less time managing vendors and more time in the terminal. Most of what I ship at work gets prototyped, tested, and often fully built using AI coding tools.
            </p>
            <p style={{margin: 0}}>
              I treat recruiting ops like an engineering problem. Same tools. Same mental model. Same rigor.
            </p>
          </div>
        </div>

        {/* Build vs Buy callout */}
        <div style={{
          backgroundColor: SAGE.a08, border: `1px solid ${SAGE[100]}`, borderRadius: 16,
          padding: 28, marginBottom: 48,
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease-out 0.1s",
        }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: SAGE[700], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Build vs Buy</p>
          <p style={{ fontSize: 18, fontWeight: 600, color: INK, margin: "0 0 14px", lineHeight: 1.4 }}>
            Buy when the problem is solved. Build when the tool is the bottleneck.
          </p>
          <p style={{ fontSize: 14, color: INK_MUTED, lineHeight: 1.7, margin: 0 }}>
            Ten years ago, "build" meant a six-month engineering ask. In 2026, it means a weekend. AI coding tools flipped the economics. That changes what recruiting teams can own. Scrappy internal tool, custom dashboard, one-off workflow — you don't need to wait for the vendor roadmap or beg engineering for help. You build it. Most of the tools I ship at Luma wouldn't exist if I were waiting for someone else to build them.
          </p>
        </div>

        {/* Tool grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16,
          marginBottom: 64,
        }}>
          {STACK_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={cat.name} style={{
                backgroundColor: "white", borderRadius: 14, padding: 22,
                border: `1px solid ${BORDER}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
                opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease-out ${0.15 + i * 0.04}s`,
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, backgroundColor: SAGE[50],
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
                  border: `1px solid ${SAGE[100]}`,
                }}>
                  <Icon size={16} color={SAGE[600]} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10, letterSpacing: "-0.01em" }}>{cat.name}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  {cat.tools.map((tool) => (
                    <li key={tool} style={{ fontSize: 13, color: INK_MUTED, lineHeight: 1.5 }}>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Workflow strip */}
        <div style={{
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease-out 0.35s",
        }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: SAGE[600], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, textAlign: "center" }}>How I Ship</p>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: INK, textAlign: "center", marginBottom: 28, letterSpacing: "-0.01em" }}>
            The loop
          </h3>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14,
          }}>
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.n} style={{
                backgroundColor: "white", borderRadius: 12, padding: 22,
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: SAGE[500], letterSpacing: "0.08em", marginBottom: 8 }}>{step.n}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8, letterSpacing: "-0.01em" }}>{step.title}</h4>
                <p style={{ fontSize: 13, color: INK_MUTED, lineHeight: 1.55, margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// TIMELINE
// ============================================

function TimelineCard({ exp, index }) {
  const [ref, isInView] = useInView(0.1);
  const isFeatured = exp.type === "featured";

  return (
    <div ref={ref} style={{
      display: "flex", gap: 24, marginBottom: isFeatured ? 48 : 32,
      opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.6s ease-out ${index * 0.05}s`,
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 20 }}>
        <div style={{
          width: isFeatured ? 14 : 10, height: isFeatured ? 14 : 10, borderRadius: "50%",
          backgroundColor: isFeatured ? SAGE[500] : SAGE[200],
          border: isFeatured ? `3px solid ${SAGE[100]}` : `2px solid ${SAGE[50]}`,
          flexShrink: 0, marginTop: 6, transition: "all 0.3s",
        }} />
        <div style={{ width: 2, flex: 1, backgroundColor: BORDER, marginTop: 8 }} />
      </div>

      <div style={{
        flex: 1, paddingBottom: 8,
        ...(isFeatured ? {
          backgroundColor: "white", borderRadius: 16, padding: 28,
          border: `1px solid ${BORDER}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
        } : {}),
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
          <span style={{ fontSize: isFeatured ? 18 : 16, fontWeight: 700, color: INK }}>{exp.company}</span>
          <span style={{ fontSize: 13, color: SAGE[500] }}>{exp.period}</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 500, color: SAGE[600], margin: "0 0 4px" }}>{exp.role}</p>
        <p style={{ fontSize: 13, color: INK_MUTED, margin: "0 0 12px", display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={12} /> {exp.location}
        </p>
        <p style={{ fontSize: 14, color: INK_MUTED, lineHeight: 1.65, margin: 0 }}>{exp.description}</p>

        {exp.highlights && (
          <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
            {exp.highlights.map((h, i) => (
              <li key={i} style={{ fontSize: 13, color: INK_MUTED, lineHeight: 1.5, paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: SAGE[200] }}>—</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {exp.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {exp.tags.map((tag) => (
              <span key={tag} style={{
                padding: "3px 10px", borderRadius: 100, backgroundColor: SAGE[50],
                fontSize: 11, fontWeight: 500, color: SAGE[700],
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Timeline() {
  const [ref, isInView] = useInView(0.05);
  return (
    <section id="journey" ref={ref} style={{ padding: "100px 24px", backgroundColor: PAPER }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out", marginBottom: 48,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: SAGE[600], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Journey</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: INK, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 8 }}>
            Sourcer to Talent Engineer
          </h2>
          <p style={{ fontSize: 16, color: INK_MUTED, lineHeight: 1.6, margin: 0 }}>
            14 years in recruiting across four countries. The through-line: every role pushed me closer to treating recruiting operations as an engineering discipline — and eventually writing the software myself.
          </p>
        </div>

        {EXPERIENCES.map((exp, i) => (
          <TimelineCard key={exp.company + exp.role} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

// ============================================
// PORTFOLIO — with 3D tilt + screenshot slots
// ============================================

function PortfolioCard({ item, index }) {
  const [ref, isInView] = useInView();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const typeLabels = { live: "Live", concept: "Framework", system: "System" };

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={(el) => { cardRef.current = el; if (ref) ref.current = el; }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "white", borderRadius: 18, padding: 0,
        border: isHovered ? `1px solid ${SAGE[200]}` : `1px solid ${BORDER}`,
        boxShadow: isHovered
          ? `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px ${SAGE.a15}`
          : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? `translateY(0) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : "translateY(25px)",
        transition: isHovered
          ? "border 0.2s, box-shadow 0.2s, opacity 0.6s ease-out, transform 0.1s ease-out"
          : `border 0.2s, box-shadow 0.2s, opacity 0.6s ease-out ${index * 0.08}s, transform 0.6s ease-out ${index * 0.08}s`,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Screenshot slot */}
      <div style={{
        width: "100%", height: 168,
        borderBottom: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: item.screenshot
          ? `url(${item.screenshot}) center/cover`
          : `linear-gradient(135deg, ${SAGE[50]} 0%, ${PAPER} 50%, ${SAGE[50]} 100%)`,
      }}>
        {!item.screenshot && (
          <div style={{ textAlign: "center", color: SAGE[500] }}>
            <ImageIcon size={26} strokeWidth={1.5} />
            <p style={{ fontSize: 11, marginTop: 6, fontWeight: 500 }}>Screenshot placeholder</p>
          </div>
        )}
        <span style={{
          position: "absolute", top: 12, left: 12,
          padding: "4px 12px", borderRadius: 100,
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          fontSize: 11, fontWeight: 600, color: SAGE[700],
          border: `1px solid ${SAGE[100]}`,
        }}>
          {typeLabels[item.type]}
        </span>
      </div>

      <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 4 }}>{item.title}</h3>
          <p style={{ fontSize: 14, color: SAGE[600], fontWeight: 500, marginBottom: 10 }}>{item.subtitle}</p>
          <p style={{ fontSize: 14, color: INK_MUTED, lineHeight: 1.6, margin: 0 }}>{item.description}</p>
        </div>
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 6, marginTop: 18,
            fontSize: 14, fontWeight: 600, color: SAGE[700], textDecoration: "none",
            transition: "gap 0.2s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.gap = "10px"}
            onMouseLeave={(e) => e.currentTarget.style.gap = "6px"}
          >
            Visit site <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </div>
  );
}

function Portfolio() {
  const [ref, isInView] = useInView();
  return (
    <section id="work" ref={ref} style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out", marginBottom: 48,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: SAGE[600], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Work</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: INK, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 8 }}>
            Things I've shipped
          </h2>
          <p style={{ fontSize: 16, color: INK_MUTED, lineHeight: 1.6, margin: 0 }}>
            Most of the tools touching hiring at Luma aren't bought — they're built. Here are a few of them.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 22,
        }}>
          {PORTFOLIO_ITEMS.map((item, i) => (
            <PortfolioCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// DEEP DIVE
// ============================================

function DeepDive() {
  const [ref, isInView] = useInView(0.05);
  return (
    <section id="deep-dive" ref={ref} style={{ padding: "100px 24px", backgroundColor: PAPER }}>
      <div style={{
        maxWidth: 720, margin: "0 auto",
        opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease-out",
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: SAGE[600], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Deep Dive</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, color: INK, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 14 }}>
          Shipping the Luma careers site
        </h2>
        <p style={{ fontSize: 17, color: INK_MUTED, lineHeight: 1.6, marginBottom: 36 }}>
          How I built and shipped a careers site from scratch without an engineering team.
        </p>

        {[
          {
            h: "The problem",
            p: ["When I joined Luma, we were scaling fast and our talent brand didn't match. Candidates were applying blind — no context on the company, the products, the bar, or what it feels like to work here. Our careers page was a template with a job list stapled to it.",
                "I needed a real front door to the talent brand. One that reflected the Luma vibe and told candidates the story before they ever talked to a recruiter."]
          },
          {
            h: "The constraint",
            p: ["No engineering resources. No design team for this. A recruiting team that needed all of my bandwidth on actual hiring.",
                "The traditional play would be: write a brief, beg the marketing team, wait six months, end up with a Webflow template. That wasn't going to work."]
          },
          {
            h: "The approach",
            p: ["I built the site myself. Vibe-coded it end to end using AI coding tools. Scoped the problem, prototyped the design, wrote the copy, shipped the site. Iterated in real time based on feedback from the team and candidates going through our process."]
          },
          {
            h: "What shipped",
            p: ["A live careers site that actually reflects the company. Clean. Opinionated. On-brand. The primary front door to our talent funnel. Candidates land there first. Recruiters link to it. Hiring managers share it."]
          },
          {
            h: "The unlock",
            p: ["The real insight wasn't about one site. It was about what's possible now. A recruiter who codes can ship infrastructure that used to require an entire team.",
                "People teams don't need to wait in line behind engineering for tools. They can own their own stack and ship their own software."]
          },
        ].map((section) => (
          <div key={section.h} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 10, letterSpacing: "-0.01em" }}>{section.h}</h3>
            {section.p.map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: INK_MUTED, lineHeight: 1.7, margin: i === 0 ? "0 0 12px" : 0 }}>{para}</p>
            ))}
          </div>
        ))}

        <div style={{
          marginTop: 40, padding: 24, backgroundColor: "white", borderRadius: 14,
          border: `1px solid ${BORDER}`,
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20,
        }}>
          {[
            ["Role", "Solo build — design, dev, copy"],
            ["Stack", "AI coding tools + modern web"],
            ["Outcome", "Live. Primary talent brand entry point."],
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 11, fontWeight: 600, color: SAGE[600], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: 14, color: INK, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{val}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
          {["Vibe Coding", "AI Development", "Talent Brand", "Infrastructure", "Solo Ship"].map((tag) => (
            <span key={tag} style={{
              padding: "4px 12px", borderRadius: 100, backgroundColor: SAGE[50],
              border: `1px solid ${SAGE[100]}`, fontSize: 12, fontWeight: 500, color: SAGE[700],
            }}>{tag}</span>
          ))}
        </div>

        <a href="https://lumalabs.ai/careers" target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginTop: 28,
          fontSize: 15, fontWeight: 600, color: SAGE[700], textDecoration: "none",
          transition: "gap 0.2s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.gap = "10px"}
          onMouseLeave={(e) => e.currentTarget.style.gap = "6px"}
        >
          See it live <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

// ============================================
// FIELD NOTES
// ============================================

function FieldNotes() {
  const [ref, isInView] = useInView(0.05);
  return (
    <section id="notes" ref={ref} style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out", marginBottom: 40, maxWidth: 680,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: SAGE[600], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Field Notes</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: INK, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 12 }}>
            What I believe
          </h2>
          <p style={{ fontSize: 16, color: INK_MUTED, lineHeight: 1.6, margin: 0 }}>
            Short takes on recruiting, systems, and where this is all going. Held softly. Updated when something changes my mind.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18,
        }}>
          {FIELD_NOTES.map((note, i) => (
            <div key={note.n} style={{
              backgroundColor: "white", borderRadius: 14, padding: 26,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.6s ease-out ${0.1 + i * 0.05}s`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: SAGE[500], letterSpacing: "0.08em", marginBottom: 10 }}>Note {note.n}</div>
              <p style={{ fontSize: 17, fontWeight: 700, color: INK, margin: "0 0 12px", lineHeight: 1.35, letterSpacing: "-0.01em" }}>{note.take}</p>
              <p style={{ fontSize: 14, color: INK_MUTED, lineHeight: 1.65, margin: 0 }}>{note.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CHAT WIDGET
// ============================================

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey! I'm a mini version of Josh's brain. Ask me about his experience, what he's building at Luma, or his take on Talent Engineering." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { role: "user", text };
    const botResponse = { role: "bot", text: getChatResponse(text) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, botResponse]);
    }, 400);
  }, [input]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 100,
          width: 56, height: 56, borderRadius: "50%",
          backgroundColor: SAGE[600], color: "white", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 20px ${SAGE.a30}`,
          transition: "all 0.3s ease",
          transform: isOpen ? "scale(0)" : "scale(1)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = SAGE[700]; e.currentTarget.style.transform = isOpen ? "scale(0)" : "scale(1.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = SAGE[600]; e.currentTarget.style.transform = isOpen ? "scale(0)" : "scale(1)"; }}
      >
        <MessageCircle size={24} />
      </button>

      <div style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 100,
        width: 380, maxWidth: "calc(100vw - 48px)", height: 520, maxHeight: "calc(100vh - 120px)",
        backgroundColor: "white", borderRadius: 20, overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 0px 1px rgba(0,0,0,0.08)",
        display: "flex", flexDirection: "column",
        transform: isOpen ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition: "all 0.3s ease",
        transformOrigin: "bottom right",
      }}>
        <div style={{
          padding: "16px 20px", borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backgroundColor: PAPER,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%", backgroundColor: SAGE[50],
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${SAGE[100]}`,
            }}>
              <Bot size={18} color={SAGE[600]} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: INK, margin: 0 }}>Ask Josh's AI</p>
              <p style={{ fontSize: 11, color: INK_MUTED, margin: 0 }}>Trained on his resume</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat" style={{ background: "none", border: "none", cursor: "pointer", color: INK_MUTED, padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
            }}>
              <div style={{
                padding: "10px 14px", borderRadius: 14,
                backgroundColor: msg.role === "user" ? SAGE[600] : SAGE[50],
                color: msg.role === "user" ? "white" : INK,
                fontSize: 13, lineHeight: 1.55,
                borderBottomRightRadius: msg.role === "user" ? 4 : 14,
                borderBottomLeftRadius: msg.role === "bot" ? 4 : 14,
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: "12px 16px", borderTop: `1px solid ${BORDER}`, display: "flex", gap: 8 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            placeholder="Ask about Josh..."
            style={{
              flex: 1, padding: "10px 14px", borderRadius: 12,
              border: `1px solid ${BORDER}`, fontSize: 13, fontFamily: "inherit",
              outline: "none", transition: "border-color 0.2s",
              backgroundColor: PAPER,
            }}
            onFocus={(e) => e.target.style.borderColor = SAGE[200]}
            onBlur={(e) => e.target.style.borderColor = BORDER}
          />
          <button onClick={handleSend} aria-label="Send message" style={{
            width: 40, height: 40, borderRadius: 12, backgroundColor: SAGE[600],
            color: "white", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background-color 0.2s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = SAGE[700]}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = SAGE[600]}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

// ============================================
// CONTACT + FOOTER
// ============================================

function Contact() {
  const [ref, isInView] = useInView();
  return (
    <section id="contact" ref={ref} style={{ padding: "100px 24px", backgroundColor: PAPER }}>
      <div style={{
        maxWidth: 560, margin: "0 auto", textAlign: "center",
        opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease-out",
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: SAGE[600], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Contact</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: INK, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 16 }}>
          Let's talk
        </h2>
        <p style={{ fontSize: 16, color: INK_MUTED, lineHeight: 1.6, marginBottom: 36 }}>
          Building recruiting systems, exploring AI for people teams, or just want to compare notes on where this is all going — happy to chat.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:joshcorey2@gmail.com" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "15px 26px", borderRadius: 13, backgroundColor: SAGE[600], color: "white",
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            transition: "all 0.25s", boxShadow: `0 2px 8px ${SAGE.a30}`,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = SAGE[700]; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = SAGE[600]; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Mail size={18} /> Email me
          </a>
          <a href="https://www.linkedin.com/in/gilljosh" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "15px 26px", borderRadius: 13, backgroundColor: "transparent", color: SAGE[700],
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            border: `1px solid ${SAGE[200]}`, transition: "all 0.25s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = SAGE[50]; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "32px 24px", borderTop: `1px solid ${BORDER}`, textAlign: "center",
      backgroundColor: PAPER,
    }}>
      <p style={{ fontSize: 13, color: INK_MUTED, margin: 0 }}>
        Joshua Gill · Talent Engineering & Operations · {new Date().getFullYear()}
      </p>
    </footer>
  );
}

// ============================================
// GLOBAL STYLES
// ============================================

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${INK};
    background-color: #ffffff;
  }

  ::selection {
    background-color: ${SAGE[100]};
    color: ${SAGE[900]};
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-25px) scale(1.02); }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-8px); }
    60% { transform: translateY(-4px); }
  }

  @keyframes shimmer {
    0% { background-position: 0% center; }
    50% { background-position: 100% center; }
    100% { background-position: 0% center; }
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${SAGE[200]}; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: ${SAGE[500]}; }

  /* Mobile nav tightening */
  @media (max-width: 720px) {
    nav div[style*="gap: 26"] { gap: 14px !important; }
    nav button[style*="fontSize: 14"] { font-size: 12px !important; }
  }
`;

// ============================================
// APP
// ============================================

export default function App() {
  return (
    <div>
      <style>{globalStyles}</style>
      <Navigation />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Stack />
        <Timeline />
        <Portfolio />
        <DeepDive />
        <FieldNotes />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
