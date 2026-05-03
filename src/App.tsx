import React, { useEffect, useRef, useState } from 'react';

// ─── Scroll Animation ─────────────────────────────────────────────────────────

const useFadeIn = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeUp: React.FC<FadeUpProps> = ({ children, delay = 0, className = '' }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    number: '01',
    tags: ['React', 'Firebase', 'B2B / Web'],
    title: 'Hospital CAE — Real-Time Booking System',
    description:
      "Replaced a fragmented, paper-based legacy process with a real-time scheduling and analytics dashboard for a high-complexity hospital's Centro de Atención de Especialidades. Fully deployed in production — eliminating double-bookings and surfacing actionable stats for clinical management.",
    impact: ['Zero double-bookings post-launch', 'Deployed in a high-complexity hospital', 'Adopted by clinical staff on day one'],
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    number: '02',
    tags: ['Flutter', 'Supabase', 'Mobile'],
    title: 'Yoinn — Cross-Platform Mobile App',
    description:
      'Engineered the full frontend and backend architecture of a cross-platform mobile application from zero to deployment. Leveraged AI to compress a 6-month roadmap into weeks, demonstrating end-to-end product ownership.',
    impact: ['iOS + Android from a single codebase', 'Full-stack ownership', 'AI-accelerated delivery cycle'],
    gradient: 'from-violet-500 to-indigo-400',
  },
  {
    number: '03',
    tags: ['n8n', 'Claude API', 'B2B Agency'],
    title: 'LockedInWork — AI Automation Agency',
    description:
      'My B2B entity deploying AI-powered automation pipelines for operational bottlenecks. Built end-to-end workflows using n8n and API integrations that replace high-friction manual processes for clients.',
    impact: ['Automated multi-step workflows', 'B2B client delivery', 'AI-native architecture'],
    gradient: 'from-emerald-500 to-teal-400',
  },
];

const techStack = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Flutter', 'Tailwind CSS'] },
  { category: 'Backend & DB', items: ['Firebase', 'Supabase', 'Node.js', 'REST APIs'] },
  { category: 'AI & Automation', items: ['Claude API', 'OpenAI', 'n8n', 'LangChain'] },
  { category: 'DevOps & Tools', items: ['Git', 'Vercel', 'Figma', 'Vite'] },
];

const stats = [
  { label: 'Clinical Experience', value: '8 Years', sub: 'High-complexity hospitals' },
  { label: 'Products in Production', value: '3+', sub: 'Real users, real stakes' },
  { label: 'Target Market', value: 'Canada', sub: 'Calgary · Vancouver' },
  { label: 'Kettlebell Cert.', value: 'Level I & II', sub: 'Certified Instructor' },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl shadow-slate-950/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-lg tracking-tight">
          Miguel<span className="text-blue-400">Moreira</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {[['About', '#about'], ['Work', '#projects'], ['Stack', '#stack']].map(([label, href]) => (
            <a key={label} href={href} className="hover:text-white transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
        >
          Get in touch →
        </a>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero: React.FC = () => (
  <header className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-blue-600/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/5 w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>

    <div className="max-w-5xl mx-auto px-6 py-32 relative z-10">
      <FadeUp>
        <span className="inline-flex items-center gap-2.5 text-blue-400 font-semibold tracking-widest uppercase text-xs mb-8 border border-blue-500/25 bg-blue-500/10 px-4 py-2 rounded-full">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Clinical Full-Stack Builder · HealthTech & AI Operator
        </span>
      </FadeUp>

      <FadeUp delay={100}>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6">
          I build HealthTech<br className="hidden md:block" /> systems that{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400">
            actually ship.
          </span>
        </h1>
      </FadeUp>

      <FadeUp delay={200}>
        <p className="text-xl text-slate-400 max-w-2xl mb-4 leading-relaxed">
          8 years inside high-complexity hospital labs. Then I learned to code.
        </p>
        <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          The result: a builder who understands clinical workflows{' '}
          <span className="text-slate-300 font-medium">and</span> can ship production software in React,
          Flutter, and n8n — with no translation layer between medicine and engineering.
        </p>
      </FadeUp>

      <FadeUp delay={300}>
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            View Case Studies
          </a>
          <a
            href="https://www.linkedin.com/in/miguel-moreira-ampuero/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800/70 hover:bg-slate-800 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 border border-slate-700 hover:border-slate-500 backdrop-blur"
          >
            LinkedIn ↗
          </a>
        </div>
      </FadeUp>
    </div>
  </header>
);

// ─── About ───────────────────────────────────────────────────────────────────

const About: React.FC = () => (
  <section id="about" className="py-24 bg-slate-900/40 border-y border-slate-800/50">
    <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-16 items-start">
      <FadeUp className="md:col-span-3">
        <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-4">About</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
          Most devs have never stepped foot in a clinical lab.{' '}
          <span className="text-slate-400 font-normal">I spent 8 years in one.</span>
        </h2>
        <div className="space-y-4 text-slate-400 leading-relaxed text-[17px]">
          <p>
            I know what it feels like when a hospital system crashes at 3 AM during an emergency. I know the
            bureaucratic friction, the real bottlenecks, and what clinical staff{' '}
            <span className="text-slate-200 font-medium">actually need</span> from software — because I
            lived it as a Medical Laboratory Technologist for nearly a decade.
          </p>
          <p>
            That context is my unfair advantage. I don't need a product manager to translate medical workflows
            into specs. I write the specs. Then I ship the code using React, Flutter, Firebase, and Supabase,
            with AI compressing what used to take months into weeks.
          </p>
          <p>
            Outside the terminal: I'm a{' '}
            <span className="text-slate-200 font-medium">Certified Kettlebell Instructor (Level I & II)</span>{' '}
            and an avid snowboarder. The same discipline required to coach others physically is what drives me
            to ship products without cutting corners.
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={180} className="md:col-span-2">
        <div className="space-y-3 pt-10 md:pt-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 backdrop-blur transition-colors duration-200"
            >
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  </section>
);

// ─── Case Studies ─────────────────────────────────────────────────────────────

const CaseStudies: React.FC = () => (
  <section id="projects" className="bg-slate-950 py-24">
    <div className="max-w-5xl mx-auto px-6">
      <FadeUp>
        <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">Proof of Work</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-14">Case Studies</h2>
      </FadeUp>

      <div className="space-y-5">
        {projects.map((project, i) => (
          <FadeUp key={project.number} delay={i * 90}>
            <div className="group relative bg-slate-900/50 border border-slate-800 hover:border-slate-600/80 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-900/80 overflow-hidden">
              <div
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="shrink-0 select-none">
                  <span
                    className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b ${project.gradient} opacity-20 group-hover:opacity-50 transition-opacity duration-300`}
                  >
                    {project.number}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-800 text-slate-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6 text-[15px] md:text-base">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {project.impact.map((item) => (
                      <span key={item} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} shrink-0`} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const TechStack: React.FC = () => (
  <section id="stack" className="py-24 border-t border-slate-800/50">
    <div className="max-w-5xl mx-auto px-6">
      <FadeUp>
        <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-3">Toolbox</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-14">Tech Stack</h2>
      </FadeUp>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {techStack.map((group, i) => (
          <FadeUp key={group.category} delay={i * 75}>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 h-full hover:border-slate-700 transition-colors duration-200">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                {group.category}
              </p>
              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-medium text-slate-300 bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/40 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-200 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ─── LinkedIn Card ────────────────────────────────────────────────────────────

const LinkedInCard: React.FC = () => (
  <a
    href="https://www.linkedin.com/in/miguel-moreira-ampuero/"
    target="_blank"
    rel="noopener noreferrer"
    className="group block bg-slate-900/80 border border-slate-800 hover:border-[#0A66C2]/60 rounded-2xl overflow-hidden transition-all duration-300 w-full hover:shadow-2xl hover:shadow-[#0A66C2]/10 hover:-translate-y-0.5"
  >
    {/* Banner */}
    <div className="h-20 bg-gradient-to-br from-[#0A66C2] to-[#004182] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full -mb-8 -mr-8" />
    </div>

    {/* Body */}
    <div className="px-5 pb-5">
      {/* Avatar */}
      <div className="-mt-9 mb-3">
        <div className="w-16 h-16 rounded-full border-[3px] border-slate-900 bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xl font-black text-white select-none shadow-lg">
          MM
        </div>
      </div>

      <h3 className="text-[15px] font-bold text-white mb-0.5">Miguel Moreira</h3>
      <p className="text-xs text-slate-400 leading-snug mb-3">
        Clinical Full-Stack Builder · Medical Technologist & AI Operator
      </p>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        Santiago, Chile · Open to Canada
      </div>

      {/* Stats row */}
      <div className="flex gap-3 text-xs text-slate-500 mb-4 border-t border-slate-800 pt-3 mt-3">
        <span><span className="text-slate-300 font-semibold">500+</span> connections</span>
        <span className="text-slate-700">·</span>
        <span><span className="text-slate-300 font-semibold">8</span> yrs experience</span>
      </div>

      {/* CTA Button */}
      <div className="flex items-center justify-center gap-2 w-full bg-[#0A66C2] group-hover:bg-[#0958a8] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-200">
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        View LinkedIn Profile
      </div>
    </div>
  </a>
);

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact: React.FC = () => (
  <section id="contact" className="bg-slate-950 py-28 border-t border-slate-800/50">
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-5 gap-12 items-center">

        {/* Left: CTA copy + buttons */}
        <div className="md:col-span-3">
          <FadeUp>
            <p className="text-blue-400 font-semibold text-xs uppercase tracking-widest mb-5">Let's Work</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
              Need a builder who speaks{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                clinical?
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              If your HealthTech startup needs someone who understands medical workflows and can ship fast —
              let's get on a call.
            </p>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* ← Replace href with your real Calendly link */}
              <a
                href="https://calendly.com/tu-usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a 30-min Call
              </a>

              <a
                href="mailto:letsgo@yoinn.cl"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-800/80 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 border border-slate-700 hover:border-slate-500 backdrop-blur"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send an Email
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={220}>
            <p className="mt-6 text-sm text-slate-600">
              Open to remote contracts & full-time roles · Calgary & Vancouver preferred
            </p>
          </FadeUp>
        </div>

        {/* Right: LinkedIn Card */}
        <FadeUp delay={200} className="md:col-span-2">
          <LinkedInCard />
        </FadeUp>

      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer: React.FC = () => (
  <footer className="border-t border-slate-800/50 py-8 bg-slate-950">
    <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
      <p>
        © {new Date().getFullYear()}{' '}
        <span className="text-slate-400 font-medium">Miguel Moreira</span> · Clinical Full-Stack Builder
      </p>
      <div className="flex gap-6">
        <a href="https://www.linkedin.com/in/miguel-moreira-ampuero/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors duration-200">
          LinkedIn
        </a>
        <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors duration-200">
          GitHub
        </a>
        <a href="mailto:letsgo@yoinn.cl" className="hover:text-slate-300 transition-colors duration-200">
          Email
        </a>
      </div>
    </div>
  </footer>
);

// ─── Root ─────────────────────────────────────────────────────────────────────

const Portfolio: React.FC = () => (
  <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white antialiased">
    <Navbar />
    <Hero />
    <About />
    <CaseStudies />
    <TechStack />
    <Contact />
    <Footer />
  </div>
);

export default Portfolio;
