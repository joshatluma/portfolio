import { useState, useEffect, useRef, useCallback } from "react";
import { Mail, Linkedin, Globe, Send, X, MessageCircle, Briefcase, ArrowDown, ExternalLink, MapPin, ChevronRight, Bot, ArrowUpRight, Menu, XCircle } from "lucide-react";

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
    description: "Designed and shipped from scratch. The primary entry point for all candidates considering Luma AI.",
    url: "https://lumalabs.ai/careers",
    type: "live",
  },
  {
    title: "Talent Engineering Blueprint",
    subtitle: "The operating system for recruiting",
    description: "My framework for treating recruiting operations as infrastructure, not admin. Systems architecture applied to people teams.",
    type: "concept",
  },
  {
    title: "Recruiting Lifecycle Automations",
    subtitle: "Intake to offer, automated",
    description: "End-to-end workflow automations built with Zapier, Python, and API integrations. From intake form to offer letter with minimal manual touchpoints.",
    type: "system",
  },
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
// COMPONENTS
// ============================================

function Navigation() {
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 60;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
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
        <button onClick={() => scrollTo("hero")} style={{ fontWeight: 700, fontSize: 18, color: "#14532d", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "-0.02em" }}>
          JG
        </button>
        <div className="hidden md:flex" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["About", "about"], ["Journey", "journey"], ["Work", "work"], ["Contact", "contact"]].map(([label, id]) => (
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
    <section id="hero" ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 24px 80px" }}>
      {/* Decorative orbs */}
      <div style={{
        position: "absolute", top: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        animation: "float 8s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", left: "0%", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)",
        animation: "float 10s ease-in-out infinite reverse", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 720, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block", padding: "6px 16px", borderRadius: 100, backgroundColor: "#f0fdf4",
          border: "1px solid #dcfce7", marginBottom: 24, fontSize: 13, fontWeight: 500, color: "#15803d",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out 0.1s",
        }}>
          Talent Engineering & Operations @ Luma AI
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.05,
          letterSpacing: "-0.03em", margin: "0 0 20px",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease-out 0.2s",
        }}>
          Joshua Gill
        </h1>

        <p style={{
          fontSize: "clamp(17px, 2.2vw, 20px)", color: "#64748b", lineHeight: 1.6, margin: "0 0 40px",
          maxWidth: 540, marginLeft: "auto", marginRight: "auto",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(25px)",
          transition: "all 0.7s ease-out 0.35s",
        }}>
          I architect the infrastructure that makes recruiting teams scale. 12+ years turning people operations into systems engineering.
        </p>

        <div style={{
          display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease-out 0.5s",
        }}>
          <button onClick={() => scrollTo("journey")} style={{
            padding: "14px 28px", borderRadius: 12, backgroundColor: "#15803d", color: "white",
            border: "none", cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "inherit",
            transition: "all 0.2s", boxShadow: "0 1px 3px rgba(21,128,61,0.3)",
          }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#166534"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "#15803d"; e.target.style.transform = "translateY(0)"; }}
          >
            See my journey
          </button>
          <button onClick={() => scrollTo("contact")} style={{
            padding: "14px 28px", borderRadius: 12, backgroundColor: "transparent", color: "#15803d",
            border: "1px solid #bbf7d0", cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "inherit",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#f0fdf4"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.transform = "translateY(0)"; }}
          >
            Get in touch
          </button>
        </div>

        <div style={{
          marginTop: 60, opacity: isInView ? 1 : 0, transition: "opacity 1.2s ease-out 0.8s",
        }}>
          <button onClick={() => scrollTo("about")} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", animation: "bounce 2s infinite" }}>
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

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
          <p style={{margin: 0}}>
            My career path tells the story. Sourcer to Recruiter to Ops Lead to People Systems owner. Every role taught me the same thing: the best recruiting teams aren't good because they work harder. They're running on systems that make good hiring the default.
          </p>
          <p style={{margin: 0}}>
            I sit at the intersection of Recruiting Strategy, Systems Engineering, and AI. I design agentic workflows that replace manual toil so recruiters can focus on work that actually requires a human. Interview quality programs, funnel analytics, process automation, enablement, internal tooling.
          </p>
          <p style={{margin: 0}}>
            I call it Talent Engineering. It's the merge of Recruiting, Systems Engineering, Automation, and AI. If a person is doing something a machine can do, that's a bug.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32 }}>
          {["Recruiting Operations", "People Systems", "AI Automation", "People Analytics", "ATS/CRM/HRIS", "Process Engineering", "Interviewer Training", "Sourcing Strategy"].map((skill) => (
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

function TimelineCard({ exp, index }) {
  const [ref, isInView] = useInView(0.1);
  const isFeatured = exp.type === "featured";

  return (
    <div ref={ref} style={{
      display: "flex", gap: 24, marginBottom: isFeatured ? 48 : 32,
      opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.6s ease-out ${index * 0.05}s`,
    }}>
      {/* Timeline dot and line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 20 }}>
        <div style={{
          width: isFeatured ? 14 : 10, height: isFeatured ? 14 : 10, borderRadius: "50%",
          backgroundColor: isFeatured ? "#16a34a" : "#bbf7d0",
          border: isFeatured ? "3px solid #dcfce7" : "2px solid #f0fdf4",
          flexShrink: 0, marginTop: 6, transition: "all 0.3s",
        }} />
        <div style={{ width: 2, flex: 1, backgroundColor: "#e2e8f0", marginTop: 8 }} />
      </div>

      {/* Content */}
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

function PortfolioCard({ item, index }) {
  const [ref, isInView] = useInView();
  const typeColors = { live: "#16a34a", concept: "#0284c7", system: "#7c3aed" };
  const typeLabels = { live: "Live", concept: "Framework", system: "System" };

  return (
    <div ref={ref} style={{
      backgroundColor: "white", borderRadius: 16, padding: 28,
      border: "1px solid #f1f5f9",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
      opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(25px)",
      transition: `all 0.6s ease-out ${index * 0.1}s`,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{
            padding: "3px 10px", borderRadius: 100,
            backgroundColor: typeColors[item.type] + "12",
            fontSize: 11, fontWeight: 600, color: typeColors[item.type],
            border: `1px solid ${typeColors[item.type]}25`,
          }}>
            {typeLabels[item.type]}
          </span>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{item.title}</h3>
        <p style={{ fontSize: 14, color: "#16a34a", fontWeight: 500, marginBottom: 12 }}>{item.subtitle}</p>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.description}</p>
      </div>
      {item.url && (
        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20,
          fontSize: 14, fontWeight: 600, color: "#15803d", textDecoration: "none",
          transition: "gap 0.2s",
        }}
          onMouseEnter={(e) => e.target.style.gap = "10px"}
          onMouseLeave={(e) => e.target.style.gap = "6px"}
        >
          Visit site <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  );
}

function Portfolio() {
  const [ref, isInView] = useInView();
  return (
    <section id="work" ref={ref} style={{ padding: "100px 24px", backgroundColor: "#fafffe" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-out", marginBottom: 48,
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Work</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 8 }}>
            Things I've built
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
            Systems, platforms, and frameworks. Builder over optimizer, always.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          gap: 20,
        }}>
          {PORTFOLIO_ITEMS.map((item, i) => (
            <PortfolioCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

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
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 100,
          width: 56, height: 56, borderRadius: "50%",
          backgroundColor: "#15803d", color: "white", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(21,128,61,0.35)",
          transition: "all 0.3s ease",
          transform: isOpen ? "scale(0)" : "scale(1)",
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#166534"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#15803d"}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat panel */}
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
        {/* Header */}
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
          <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
            }}>
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

        {/* Input */}
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
          <button onClick={handleSend} style={{
            width: 40, height: 40, borderRadius: 12, backgroundColor: "#15803d",
            color: "white", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background-color 0.2s",
          }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#166534"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#15803d"}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function Contact() {
  const [ref, isInView] = useInView();
  return (
    <section id="contact" ref={ref} style={{ padding: "100px 24px" }}>
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
            padding: "14px 24px", borderRadius: 12, backgroundColor: "#15803d", color: "white",
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            transition: "all 0.2s", boxShadow: "0 1px 3px rgba(21,128,61,0.3)",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#166534"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#15803d"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Mail size={18} /> Email me
          </a>
          <a href="https://www.linkedin.com/in/gilljosh" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 24px", borderRadius: 12, backgroundColor: "transparent", color: "#15803d",
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            border: "1px solid #bbf7d0", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0fdf4"; e.currentTarget.style.transform = "translateY(-1px)"; }}
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
      padding: "32px 24px", borderTop: "1px solid #f1f5f9", textAlign: "center",
    }}>
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

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
`;

// ============================================
// APP
// ============================================

export default function App() {
  return (
    <div>
      <style>{globalStyles}</style>
      <Navigation />
      <Hero />
      <About />
      <Timeline />
      <Portfolio />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}
