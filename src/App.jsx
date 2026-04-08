import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Mail, Linkedin, Globe, Send, X, MessageCircle, Briefcase, ArrowDown, ExternalLink, MapPin, ChevronRight, Bot, ArrowUpRight, Menu, XCircle, Zap, BarChart3, Cpu, Users, Image } from "lucide-react";

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
    description: "Own the full recruiting and people tech stack at a Series C AI company ($1.4B+ raised, $4B valuation) scaling from 150 to 500+ people. Architect the operating system for People and Recruiting. Build AI-powered agentic workflows that automate manual processes and accelerate hiring.",
    highlights: [
      "Shipped a careers site from scratch as the primary talent brand front door",
      "Built an internal sourcing platform for teams to find and reach talent at scale",
      "Created a recruiting enablement platform for interviewer training and calibration",
      "Engineered end-to-end workflow automations across the full recruiting lifecycle",
      "Established company-wide source of truth for headcount, velocity, and quality metrics",
    ],
    tags: ["AI Automation", "People Systems", "ATS/CRM/HRIS", "Agentic Workflows", "Process Engineering"],
  },
  {
    company: "GEICO",
    role: "Lead, Talent Sourcer",
    period: "2024 — 2025",
    location: "Remote",
    type: "standard",
    description: "Sole talent sourcer for senior and leadership hiring across Engineering and Product. Built end-to-end sourcing processes and strategic talent pipelines for hard-to-fill positions.",
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
      "Overhauled recruitment and onboarding with new technology stack",
      "Migrated hiring data to ThoughtSpot analytics, creating first self-service TA dashboards",
      "Delivered early AI/GPT use case training for recruiting teams pre-mainstream",
      "Led RFP evaluation and implementation of new recruiting technology",
    ],
    tags: ["RecOps", "Sourcing Leadership", "Recruiting Analytics", "AI Training"],
  },
  {
    company: "realtor.com",
    role: "Sourcer → Recruiter → Manager, People Platforms & Analytics",
    period: "2017 — 2022",
    location: "Los Angeles, CA & Vancouver, Canada",
    type: "featured",
    description: "4+ years of progressive growth across four roles. Built and led two net-new functions: People Platforms and People Analytics. Proposed and grew the company's first-ever Recruiting Research team. Owned workflows, analysis, and experiments that informed the full Talent and People organization.",
    highlights: [
      "Created People Platforms and People Analytics as new functions from scratch",
      "Built the inaugural Recruiting Research team with strategies adopted across TA, HR, and business",
      "Developed analytics workflows to measure and predict engagement and retention",
      "Partnered with Head of TA and CPO on recruiting ops and talent insights strategy",
    ],
    tags: ["People Analytics", "Platform Ownership", "Team Building", "Recruiting Research"],
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
    title: "Luma AI Careers",
    subtitle: "Talent brand front door",
    description: "Designed and shipped from scratch. The primary entry point for all candidates considering Luma AI. Built to convert passive interest into active applications.",
    url: "https://lumalabs.ai/careers",
    type: "live",
    impact: "Primary candidate entry point for 500+ person scale-up",
    screenshot: null,
  },
  {
    title: "Recruiting Lifecycle Automations",
    subtitle: "Intake to offer, automated",
    description: "End-to-end workflow automations built with Zapier, Python, and API integrations. From intake form to offer letter with minimal manual touchpoints. Eliminates hours of manual coordinator work per requisition.",
    type: "system",
    impact: "80%+ reduction in manual process time per req",
    screenshot: null,
  },
  {
    title: "Talent Engineering Blueprint",
    subtitle: "The operating system for recruiting",
    description: "My framework for treating recruiting operations as infrastructure, not admin. Systems architecture applied to people teams. The playbook for building a recruiting org that scales like software.",
    type: "concept",
    impact: "Framework adopted across multiple orgs",
    screenshot: null,
  },
  {
    title: "Interview Intelligence System",
    subtitle: "Data-driven interview quality",
    description: "Built an interviewer training and calibration platform that tracks interview quality, identifies bias patterns, and surfaces coaching opportunities. Structured scorecards, real-time analytics, and automated feedback loops.",
    type: "system",
    impact: "Measurable improvement in interview consistency",
    screenshot: null,
  },
  {
    title: "Internal Sourcing Platform",
    subtitle: "Find and reach talent at scale",
    description: "Custom-built platform enabling hiring managers and teams to discover, evaluate, and engage talent without bottlenecking through a sourcer. Self-serve talent intelligence for the entire org.",
    type: "system",
    impact: "Scaled sourcing capacity across engineering teams",
    screenshot: null,
  },
  {
    title: "People Analytics Dashboard",
    subtitle: "Self-service TA intelligence",
    description: "Migrated recruiting data into a self-service analytics platform. Real-time pipeline health, conversion rates, time-to-fill predictions, and source-of-hire attribution. First dashboards the TA team could query without analyst support.",
    type: "live",
    impact: "First self-service TA dashboards at ThoughtSpot",
    screenshot: null,
  },
  {
    title: "Agentic Recruiting Workflows",
    subtitle: "AI agents that do the work",
    description: "Designed and deployed AI-powered agentic workflows that handle candidate screening, scheduling orchestration, and pipeline management. Built with Python, n8n, and API integrations across the recruiting stack.",
    type: "system",
    impact: "Automated multi-step recruiting processes end-to-end",
    screenshot: null,
  },
  {
    title: "Recruiting Research Function",
    subtitle: "Built the team from zero",
    description: "Proposed and created realtor.com's first Recruiting Research team. Developed market mapping, compensation benchmarking, and competitive intelligence capabilities that were adopted across TA, HR, and business leadership.",
    type: "concept",
    impact: "Strategies adopted across TA, HR, and business units",
    screenshot: null,
  },
];

const STATS = [
  { value: 12, suffix: "+", label: "Years Experience", icon: Briefcase },
  { value: 4, suffix: "", label: "Countries", icon: Globe },
  { value: 500, suffix: "+", label: "Scale Target (Luma)", icon: Users },
  { value: 8, suffix: "+", label: "Systems Built", icon: Cpu },
];

const CHAT_KNOWLEDGE = [
  { keywords: ["hi", "hello", "hey", "sup", "howdy"], response: "Hey! I'm a mini version of Josh's brain. Ask me about his experience, skills, what Talent Engineering means, or what he's building at Luma AI." },
  { keywords: ["experience", "background", "career", "history", "resume"], response: "Josh has 12+ years across recruiting, people systems, and operations. Started as a sourcer in London, moved through technical recruiting at Deutsche Bank and BuildDirect, then into leadership at realtor.com and ThoughtSpot. Now he owns the full people and recruiting tech stack at Luma AI. The through-line: treating recruiting ops as an engineering discipline." },
  { keywords: ["luma", "current", "now", "today", "present"], response: "At Luma AI, Josh owns the full recruiting and people tech stack end to end. He's shipped a careers site, built an internal sourcing platform, created interviewer training systems, and engineered workflow automations across the entire recruiting lifecycle. Luma builds multimodal AI (Dream Machine, Ray3, Photon) and is scaling from 150 to 500+ people." },
  { keywords: ["skill", "tool", "tech", "stack", "platform"], response: "Core domains: Recruiting Operations, People Systems, AI Automation, Talent Acquisition, Technical Recruiting. Tools include Gem, Ashby, Greenhouse, Lever, Zapier, Python, n8n, Metaview, CodeSignal, and more. He builds at the intersection of recruiting strategy, systems engineering, and AI." },
  { keywords: ["talent engineering", "what is", "define", "mean"], response: "Talent Engineering is Josh's term for the intersection of Recruiting Strategy, Systems Engineering, and AI Automation. It's about treating recruiting ops as infrastructure, not admin. Own the tech stack like an engineer owns a codebase. Automate everything a machine can do. Build systems that make good hiring the default." },
  { keywords: ["contact", "reach", "email", "hire", "connect"], response: "Best way to reach Josh: joshcorey2@gmail.com or connect on LinkedIn at linkedin.com/in/gilljosh. He's always down to talk about recruiting systems, AI automation, or what Talent Engineering looks like at your company." },
  { keywords: ["realtor", "move"], response: "At realtor.com, Josh had a 4+ year run across four roles: Technical Recruiter → Lead, Talent Sourcing → Manager, Talent Sourcing & Intelligence → Manager, People Platforms & Analytics. He built two net-new functions (People Platforms and People Analytics) and created the company's first Recruiting Research team." },
  { keywords: ["thoughtspot"], response: "At ThoughtSpot, Josh was Sr Manager of Recruiting Operations & Sourcing. He led Global Talent Operations, drove a full overhaul of recruiting technology, migrated hiring data to ThoughtSpot's own analytics platform, and delivered early AI/GPT training for recruiting teams before it went mainstream." },
  { keywords: ["entrepreneurship", "restaurant", "bar", "abnormal"], response: "In 2023-2024, Josh co-founded Abnormal Heights Rooftop, a bar and restaurant in San Diego. He led operations from pre-launch through steady state, covering everything from design to hiring to operational strategy. It shows the builder mindset extends beyond tech." },
  { keywords: ["location", "where", "based", "live"], response: "Josh is based in San Diego, CA. He works remotely for Luma AI, which is headquartered in Palo Alto." },
];

const DEFAULT_CHAT_RESPONSE = "I'm not sure about that one. Try asking about Josh's experience, current role at Luma AI, skills, what Talent Engineering means, or how to get in touch!";

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

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  return pos;
}

function useCountUp(target, duration = 2000, shouldStart = false) {
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
// INTERACTIVE CANVAS — PARTICLE NETWORK
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

    // Initialize particles
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

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 0) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 197, 94, 0.35)";
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < CONNECT_DIST) {
            const alpha = (1 - cdist / CONNECT_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (dist < MOUSE_DIST * 1.5) {
          const alpha = (1 - dist / (MOUSE_DIST * 1.5)) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
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
        backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => scrollTo("hero")} aria-label="Scroll to top" style={{ fontWeight: 700, fontSize: 18, color: "#14532d", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.02em" }}>
          JG
        </button>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["About", "about"], ["Journey", "journey"], ["Work", "work"], ["FAQ", "faq"], ["Contact", "contact"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#475569", fontFamily: "inherit", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.target.style.color = "#15803d"}
              onMouseLeave={(e) => e.target.style.color = "#475569"}
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

      {/* Gradient orbs */}
      <div style={{
        position: "absolute", top: "5%", right: "0%", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
        animation: "float 8s ease-in-out infinite", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-5%", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(22,163,74,0.05) 0%, transparent 70%)",
        animation: "float 10s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Photo placeholder */}
        <div style={{
          width: 120, height: 120, borderRadius: "50%", margin: "0 auto 28px",
          background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 50%, #86efac 100%)",
          border: "4px solid white",
          boxShadow: "0 8px 32px rgba(34,197,94,0.2), 0 0 0 1px rgba(34,197,94,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
          transition: "all 0.6s ease-out",
        }}>
          {/* Replace this placeholder with: <img src="/headshot.jpg" alt="Joshua Gill" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
          <Users size={40} color="#16a34a" strokeWidth={1.5} />
        </div>

        <div style={{
          display: "inline-block", padding: "6px 16px", borderRadius: 100, backgroundColor: "rgba(240,253,244,0.9)",
          border: "1px solid #dcfce7", marginBottom: 24, fontSize: 13, fontWeight: 500, color: "#15803d",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out 0.1s",
          backdropFilter: "blur(8px)",
        }}>
          <Zap size={12} style={{ display: "inline", verticalAlign: "-1px", marginRight: 4 }} />
          Talent Engineering & Operations @ Luma AI
        </div>

        <h1 style={{
          fontSize: "clamp(44px, 8vw, 80px)", fontWeight: 800, lineHeight: 1.02,
          letterSpacing: "-0.04em", margin: "0 0 24px",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease-out 0.2s",
          background: "linear-gradient(135deg, #0f172a 0%, #14532d 40%, #15803d 70%, #0f172a 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: isInView ? "shimmer 4s ease-in-out infinite" : "none",
        }}>
          Joshua Gill
        </h1>

        <p style={{
          fontSize: "clamp(18px, 2.5vw, 22px)", color: "#475569", lineHeight: 1.6, margin: "0 0 20px",
          maxWidth: 600, marginLeft: "auto", marginRight: "auto", fontWeight: 400,
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.7s ease-out 0.35s",
        }}>
          I architect the infrastructure that makes recruiting teams scale.
        </p>
        <p style={{
          fontSize: "clamp(15px, 1.8vw, 17px)", color: "#94a3b8", lineHeight: 1.6, margin: "0 0 44px",
          maxWidth: 520, marginLeft: "auto", marginRight: "auto",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.7s ease-out 0.45s",
        }}>
          12+ years turning people operations into systems engineering. Four countries. One mission: if a person is doing something a machine can do, that's a bug.
        </p>

        <div style={{
          display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease-out 0.55s",
        }}>
          <button onClick={() => scrollTo("work")} style={{
            padding: "16px 32px", borderRadius: 14, backgroundColor: "#15803d", color: "white",
            border: "none", cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "inherit",
            transition: "all 0.25s", boxShadow: "0 2px 8px rgba(21,128,61,0.3), 0 0 0 0 rgba(21,128,61,0)",
            position: "relative", overflow: "hidden",
          }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#166534"; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 4px 16px rgba(21,128,61,0.4), 0 0 0 0 rgba(21,128,61,0)"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "#15803d"; e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 2px 8px rgba(21,128,61,0.3), 0 0 0 0 rgba(21,128,61,0)"; }}
          >
            See what I've built
          </button>
          <button onClick={() => scrollTo("contact")} style={{
            padding: "16px 32px", borderRadius: 14, backgroundColor: "transparent", color: "#15803d",
            border: "1px solid #bbf7d0", cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "inherit",
            transition: "all 0.25s",
          }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#f0fdf4"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.transform = "translateY(0)"; }}
          >
            Get in touch
          </button>
        </div>

        <div style={{ marginTop: 60, opacity: isInView ? 1 : 0, transition: "opacity 1.2s ease-out 0.9s" }}>
          <button onClick={() => scrollTo("stats")} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", animation: "bounce 2s infinite" }}>
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ============================================
// ANIMATED STATS
// ============================================

function StatCard({ stat, index }) {
  const [ref, isInView] = useInView(0.3);
  const count = useCountUp(stat.value, 1800, isInView);
  const Icon = stat.icon;

  return (
    <div ref={ref} style={{
      textAlign: "center", padding: "32px 20px",
      opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.6s ease-out ${index * 0.1}s`,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14, margin: "0 auto 16px",
        background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid #bbf7d020",
      }}>
        <Icon size={22} color="#16a34a" />
      </div>
      <div style={{
        fontSize: "clamp(36px, 5vw, 48px)", fontWeight: 800, color: "#0f172a",
        letterSpacing: "-0.03em", lineHeight: 1,
      }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: 14, color: "#64748b", marginTop: 6, fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <section id="stats" style={{ padding: "60px 24px 40px", borderBottom: "1px solid #f1f5f9" }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
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
    <section id="about" ref={ref} style={{ padding: "100px 24px", backgroundColor: "#fafffe" }}>
      <div style={{
        maxWidth: 680, margin: "0 auto",
        opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease-out",
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>About</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 28 }}>
          I don't manage tools. I build the rails.
        </h2>
        <div style={{ fontSize: 16, color: "#475569", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0 }}>
            My career path tells the story. Sourcer to Recruiter to Ops Lead to People Systems owner. Every role taught me the same thing: the best recruiting teams aren't good because they work harder. They're running on systems that make good hiring the default.
          </p>
          <p style={{ margin: 0 }}>
            I sit at the intersection of Recruiting Strategy, Systems Engineering, and AI. I design agentic workflows that replace manual toil so recruiters can focus on work that actually requires a human. Interview quality programs, funnel analytics, process automation, enablement, internal tooling.
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: "#0f172a", fontSize: 17 }}>
            I call it Talent Engineering. If a person is doing something a machine can do, that's a bug.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32 }}>
          {["Recruiting Operations", "People Systems", "AI Automation", "People Analytics", "ATS/CRM/HRIS", "Process Engineering", "Interviewer Training", "Sourcing Strategy", "Agentic Workflows", "Talent Brand"].map((skill) => (
            <span key={skill} style={{
              padding: "6px 14px", borderRadius: 100, backgroundColor: "#f0fdf4", border: "1px solid #dcfce7",
              fontSize: 13, fontWeight: 500, color: "#166534",
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
          backgroundColor: isFeatured ? "#16a34a" : "#bbf7d0",
          border: isFeatured ? "3px solid #dcfce7" : "2px solid #f0fdf4",
          flexShrink: 0, marginTop: 6, transition: "all 0.3s",
        }} />
        <div style={{ width: 2, flex: 1, backgroundColor: "#e2e8f0", marginTop: 8 }} />
      </div>

      <div style={{
        flex: 1, paddingBottom: 8,
        ...(isFeatured ? {
          backgroundColor: "white", borderRadius: 16, padding: 28,
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
        } : {}),
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
          <span style={{ fontSize: isFeatured ? 18 : 16, fontWeight: 700, color: "#0f172a" }}>{exp.company}</span>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>{exp.period}</span>
        </div>
        <p style={{ fontSize: 14, fontWeight: 500, color: "#16a34a", margin: "0 0 4px" }}>{exp.role}</p>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={12} /> {exp.location}
        </p>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, margin: 0 }}>{exp.description}</p>

        {exp.highlights && (
          <ul style={{ margin: "14px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
            {exp.highlights.map((h, i) => (
              <li key={i} style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#86efac" }}>—</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {exp.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {exp.tags.map((tag) => (
              <span key={tag} style={{
                padding: "3px 10px", borderRadius: 100, backgroundColor: "#f0fdf4",
                fontSize: 11, fontWeight: 500, color: "#166534",
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
    <section id="journey" ref={ref} style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out", marginBottom: 48,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Journey</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 8 }}>
            Sourcer to Systems Architect
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
            12+ years. Four countries. One consistent thread: every role pushed me closer to treating recruiting operations as an engineering discipline.
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
// PORTFOLIO — WITH TILT + SCREENSHOTS
// ============================================

function PortfolioCard({ item, index }) {
  const [ref, isInView] = useInView();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const typeColors = { live: "#16a34a", concept: "#0284c7", system: "#7c3aed" };
  const typeLabels = { live: "Live", concept: "Framework", system: "System" };

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
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
        backgroundColor: "white", borderRadius: 20, padding: 0,
        border: isHovered ? "1px solid #bbf7d0" : "1px solid #f1f5f9",
        boxShadow: isHovered
          ? "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(34,197,94,0.08)"
          : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
        opacity: isInView ? 1 : 0, transform: isInView
          ? `translateY(0) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : "translateY(30px)",
        transition: isHovered
          ? "border 0.2s, box-shadow 0.2s, opacity 0.6s ease-out, transform 0.1s ease-out"
          : `border 0.2s, box-shadow 0.2s, opacity 0.6s ease-out ${index * 0.08}s, transform 0.6s ease-out ${index * 0.08}s`,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Screenshot placeholder */}
      <div style={{
        width: "100%", height: 180, backgroundColor: "#f8fafc",
        borderBottom: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: item.screenshot
          ? `url(${item.screenshot}) center/cover`
          : "linear-gradient(135deg, #f0fdf4 0%, #f8fafc 50%, #f0fdf4 100%)",
      }}>
        {!item.screenshot && (
          <div style={{ textAlign: "center", color: "#94a3b8" }}>
            <Image size={28} strokeWidth={1.5} />
            <p style={{ fontSize: 11, marginTop: 6, fontWeight: 500 }}>Screenshot placeholder</p>
          </div>
        )}
        {/* Type badge overlaid on image */}
        <span style={{
          position: "absolute", top: 12, left: 12,
          padding: "4px 12px", borderRadius: 100,
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          fontSize: 11, fontWeight: 600, color: typeColors[item.type],
          border: `1px solid ${typeColors[item.type]}25`,
        }}>
          {typeLabels[item.type]}
        </span>
      </div>

      <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{item.title}</h3>
          <p style={{ fontSize: 14, color: "#16a34a", fontWeight: 500, marginBottom: 10 }}>{item.subtitle}</p>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.description}</p>
          {item.impact && (
            <div style={{
              marginTop: 14, padding: "8px 14px", borderRadius: 10,
              backgroundColor: "#f0fdf4", border: "1px solid #dcfce7",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <BarChart3 size={14} color="#16a34a" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#15803d" }}>{item.impact}</span>
            </div>
          )}
        </div>
        {item.url && (
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 6, marginTop: 18,
            fontSize: 14, fontWeight: 600, color: "#15803d", textDecoration: "none",
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
    <section id="work" ref={ref} style={{ padding: "100px 24px", backgroundColor: "#fafffe" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out", marginBottom: 48,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Work</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 8 }}>
            Things I've built
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
            Systems, platforms, and frameworks. Each one replaced manual process with infrastructure. Builder over optimizer, always.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
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
// FAQ — AEO SECTION
// ============================================

function FAQItem({ question, answer, index }) {
  const [ref, isInView] = useInView();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div ref={ref} style={{
      borderBottom: "1px solid #f1f5f9",
      opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.5s ease-out ${index * 0.06}s`,
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%", textAlign: "left", padding: "20px 0",
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "inherit", display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 16,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>{question}</span>
        <ChevronRight
          size={18}
          color="#94a3b8"
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
            flexShrink: 0,
          }}
        />
      </button>
      <div style={{
        maxHeight: isOpen ? 300 : 0,
        overflow: "hidden",
        transition: "max-height 0.35s ease",
      }}>
        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

function FAQ() {
  const [sectionRef, isInView] = useInView();
  const faqs = [
    {
      question: "What is Talent Engineering?",
      answer: "Talent Engineering is the discipline of applying systems engineering, AI automation, and infrastructure thinking to recruiting operations. Instead of treating recruiting ops as admin work, it treats it as a technical discipline — designing agentic workflows, building internal platforms, and creating data-driven systems that make good hiring the default.",
    },
    {
      question: "What does a Recruiting Operations leader actually do?",
      answer: "A Recruiting Operations leader designs and manages the systems, processes, and technology that power a company's hiring function. This includes ATS/CRM administration, workflow automation, recruiting analytics, interviewer training programs, and vendor management. At the advanced level, it means building AI-powered automations and internal tools that eliminate manual work across the recruiting lifecycle.",
    },
    {
      question: "How does AI improve recruiting operations?",
      answer: "AI improves recruiting operations by automating repetitive tasks like candidate screening, interview scheduling, and pipeline management. Agentic workflows can handle intake-to-offer processes with minimal manual touchpoints. AI-powered sourcing platforms help teams find and reach talent at scale, while analytics systems predict hiring velocity and identify bottlenecks.",
    },
    {
      question: "What's the difference between Recruiting Ops and Talent Engineering?",
      answer: "Traditional Recruiting Ops focuses on process management and tool administration. Talent Engineering goes further — it treats the entire recruiting function as a system to be architected. That means building custom platforms, designing agentic AI workflows, creating self-service analytics, and applying software engineering principles to people operations.",
    },
    {
      question: "What tools and platforms does Josh work with?",
      answer: "Core platforms include Gem, Ashby, Greenhouse, Lever (ATS/CRM), along with automation tools like Zapier, n8n, and Python for custom integrations. For analytics: ThoughtSpot, Looker, and custom dashboards. For AI: agentic workflow frameworks, Metaview, and custom LLM integrations. The specific tools matter less than the systems thinking applied to them.",
    },
    {
      question: "Can Recruiting Operations scale without AI automation?",
      answer: "You can scale to a point, but you'll hit diminishing returns fast. Manual processes that work for 50 hires a year break at 500. AI automation removes the toil — scheduling, screening, data entry, reporting — so your team can focus on judgment-heavy work that actually needs a human. The companies hiring fastest in 2025+ are the ones that automated first.",
    },
  ];

  return (
    <section id="faq" ref={sectionRef} style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out", marginBottom: 40,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>FAQ</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 8 }}>
            Frequently asked questions
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
            About Talent Engineering, recruiting operations, and what I do.
          </p>
        </div>

        {faqs.map((faq, i) => (
          <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
        ))}
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
    { role: "bot", text: "Hey! I'm a mini version of Josh's brain. Ask me about his experience, skills, what Talent Engineering means, or what he's building at Luma AI." }
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
          backgroundColor: "#15803d", color: "white", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(21,128,61,0.35)",
          transition: "all 0.3s ease",
          transform: isOpen ? "scale(0)" : "scale(1)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#166534"; e.currentTarget.style.transform = isOpen ? "scale(0)" : "scale(1.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#15803d"; e.currentTarget.style.transform = isOpen ? "scale(0)" : "scale(1)"; }}
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
          padding: "16px 20px", borderBottom: "1px solid #f1f5f9",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backgroundColor: "#fafffe",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%", backgroundColor: "#f0fdf4",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid #dcfce7",
            }}>
              <Bot size={18} color="#16a34a" />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>Ask Josh's AI</p>
              <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>Powered by resume data</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat" style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
              <div style={{
                padding: "10px 14px", borderRadius: 14,
                backgroundColor: msg.role === "user" ? "#15803d" : "#f0fdf4",
                color: msg.role === "user" ? "white" : "#1e293b",
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

        <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 8 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            placeholder="Ask about Josh..."
            style={{
              flex: 1, padding: "10px 14px", borderRadius: 12,
              border: "1px solid #e2e8f0", fontSize: 13, fontFamily: "inherit",
              outline: "none", transition: "border-color 0.2s",
              backgroundColor: "#fafafa",
            }}
            onFocus={(e) => e.target.style.borderColor = "#86efac"}
            onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
          />
          <button onClick={handleSend} aria-label="Send message" style={{
            width: 40, height: 40, borderRadius: 12, backgroundColor: "#15803d",
            color: "white", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background-color 0.2s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#166534"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#15803d"}
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
    <section id="contact" ref={ref} style={{ padding: "100px 24px", backgroundColor: "#fafffe" }}>
      <div style={{
        maxWidth: 560, margin: "0 auto", textAlign: "center",
        opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s ease-out",
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Contact</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 16 }}>
          Let's talk
        </h2>
        <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.6, marginBottom: 36 }}>
          Whether you're building recruiting systems, exploring AI automation for people teams, or just want to nerd out about Talent Engineering.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:joshcorey2@gmail.com" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "16px 28px", borderRadius: 14, backgroundColor: "#15803d", color: "white",
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            transition: "all 0.25s", boxShadow: "0 2px 8px rgba(21,128,61,0.3)",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#166534"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#15803d"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Mail size={18} /> Email me
          </a>
          <a href="https://www.linkedin.com/in/gilljosh" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "16px 28px", borderRadius: 14, backgroundColor: "transparent", color: "#15803d",
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            border: "1px solid #bbf7d0", transition: "all 0.25s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0fdf4"; e.currentTarget.style.transform = "translateY(-2px)"; }}
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
    <footer style={{ padding: "32px 24px", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
      <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
        Joshua Gill · Talent Engineering · {new Date().getFullYear()}
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
    color: #0f172a;
    background-color: #ffffff;
  }

  ::selection {
    background-color: #dcfce7;
    color: #14532d;
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
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

  /* Responsive nav */
  @media (max-width: 640px) {
    nav div[style*="gap: 32"] { gap: 16px !important; }
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
        <Timeline />
        <Portfolio />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
