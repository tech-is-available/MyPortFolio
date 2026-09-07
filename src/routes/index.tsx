import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Award,
  Cloud,
  Code2,
  Cpu,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Network,
  Phone,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Terminal,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { NetworkBackground } from "@/components/NetworkBackground";
import { Reveal } from "@/components/Reveal";
import profilePhoto from "@/assets/geeta-portrait.jpg";

const TITLE = "Geeta Vajaram Choudhari — Networking · Linux · AWS Cloud Portfolio";
const DESC =
  "Portfolio of Geeta Vajaram Choudhari, B.Sc. Computer Science graduate with CCNA, RHEL and AWS training, building a career in cloud infrastructure and DevOps.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const EMAILJS_SERVICE_ID = "service_r0s8mo4";
const EMAILJS_TEMPLATE_ID = "template_u8mun2e";
const EMAILJS_PUBLIC_KEY = "_FKNatk3tlJxAXr7u";

const NAV = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Services", "#services"],
  ["Education", "#education"],
  ["Contact", "#contact"],
] as const;

const SKILLS = [
  {
    icon: Network,
    title: "Networking",
    items: [
      "TCP/IP",
      "OSI Model",
      "Subnetting",
      "DNS",
      "DHCP",
      "VLAN",
      "NAT",
      "ACL",
      "Routing",
      "Switching",
      "Basic Wireless",
    ],
  },
  {
    icon: Terminal,
    title: "Linux / RHEL",
    items: [
      "Users & Groups",
      "File Permissions",
      "SSH",
      "Firewalld",
      "LVM",
      "systemctl",
      "Cron Jobs",
      "Troubleshooting",
    ],
  },
  {
    icon: Cloud,
    title: "AWS Cloud",
    items: ["IAM", "EC2", "S3", "RDS", "VPC", "CloudWatch", "Lambda"],
  },
  {
    icon: Code2,
    title: "Programming & Database",
    items: ["C++", "Python (Basic)", "MySQL", "Appwrite (Basic)"],
  },
  { icon: Wrench, title: "Tools", items: ["GitHub", "MS Word", "MS Excel"] },
];

const CERTS = [
  { name: "Cisco Certified Network Associate (CCNA)", org: "NetTech India, Thane", icon: Network },
  { name: "Red Hat Enterprise Linux (RHEL)", org: "NetTech India, Thane", icon: Terminal },
  { name: "AWS Cloud", org: "NetTech India, Thane", icon: Cloud },
  { name: "Python Programming", org: "S.I.C.E.S. College, Ambernath", icon: Code2 },
];

const PROJECTS = [
  {
    icon: Network,
    title: "Networking Lab Setup — CCNA",
    desc: "Practiced network design and configuration in a lab environment, including VLANs, routing and switching, NAT, basic ACLs, and connectivity troubleshooting using tools such as ping and traceroute.",
    tags: ["CCNA", "Networking", "VLAN", "Routing", "Switching", "NAT", "ACL"],
    link: null,
  },
  {
    icon: Server,
    title: "Linux Server Configuration — Red Hat Linux",
    desc: "Configured and administered a Red Hat Linux server, including user accounts, permissions, services using systemctl, SSH access, Firewalld rules, and automated tasks using cron jobs.",
    tags: ["RHEL", "Linux", "SSH", "Firewalld", "LVM", "systemctl", "Cron"],
    link: null,
  },
  {
    icon: Cloud,
    title: "AWS Cloud Resource Setup",
    desc: "Explored AWS through a hands-on lab environment by launching and configuring an EC2 instance, creating an S3 bucket, managing access using IAM roles and policies, and connecting to an RDS database.",
    tags: ["AWS", "EC2", "S3", "IAM", "RDS", "CloudWatch"],
    link: null,
  },
  {
    icon: Database,
    title: "Smart Cloud Storage & File Sharing System",
    desc: "Developed a secure cloud-based file storage and sharing application with user authentication, file upload/download, folder management, and search functionality.",
    tags: ["Next.js", "React", "TypeScript", "Appwrite", "Tailwind CSS"],
    link: "https://github.com/tech-is-available/storage-management",
  },
];

const SERVICES = [
  { icon: Network, t: "Basic Network Configuration & Troubleshooting" },
  { icon: Terminal, t: "Linux / RHEL Server Administration" },
  { icon: Cloud, t: "AWS Cloud Setup & Fundamentals" },
  { icon: Server, t: "Cloud Resource Configuration" },
  { icon: MessageSquare, t: "Technical Support" },
];

const EDUCATION = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "S.I.C.E.S. College, University of Mumbai, Ambernath",
    year: "2023 – 2026",
  },
  { degree: "HSC — Science", school: "S.I.C.E.S. College, Ambernath", year: "2023" },
  { degree: "SSC", school: "New English High School, Badlapur", year: "2021" },
];

const ROADMAP = [
  { t: "Networking", d: "CCNA foundations, routing & switching", icon: Network },
  { t: "Linux / RHEL", d: "Server administration & automation", icon: Terminal },
  { t: "AWS Cloud", d: "Compute, storage, identity, networking", icon: Cloud },
  { t: "DevOps", d: "CI/CD, containers, infrastructure as code", icon: Cpu },
  { t: "Cloud & Infrastructure Engineer", d: "Long-term career goal", icon: Rocket },
];

const SOFT = [
  { t: "Problem Solving", icon: Sparkles },
  { t: "Teamwork", icon: Users },
  { t: "Communication", icon: MessageSquare },
  { t: "Quick Learner", icon: Rocket },
  { t: "Adaptability", icon: Shield },
];

const EMAIL = "geetachoudhari926@gmail.com";
const GITHUB = "https://github.com/tech-is-available";
const LINKEDIN = "https://www.linkedin.com/in/geeta-choudhari28b939274";

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-border bg-surface-2/60 px-3 py-1 text-xs font-medium text-lavender">
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {sub ? <p className="mt-4 text-muted-foreground">{sub}</p> : null}
    </Reveal>
  );
}

function Portfolio() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");

    setSending(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      );
      toast.success("Thanks for reaching out!", {
        description: `${name || "Your message"} — I'll reply to you shortly.`,
      });
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Something went wrong", {
        description: "Your message couldn't be sent. Please try again or email me directly.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Ambient purple glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="aurora -left-40 top-[-10rem] h-[28rem] w-[28rem]" />
        <div className="aurora right-[-12rem] top-[30rem] h-[26rem] w-[26rem] opacity-25" />
        <div className="aurora bottom-[-10rem] left-1/3 h-[24rem] w-[24rem] opacity-20" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              G
            </span>
            <span className="hidden sm:inline">Geeta<span className="text-gradient">.</span></span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-2/70 hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-ring transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Hire Me
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border text-foreground lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="border-t border-border/60 bg-background/95 px-5 py-3 lg:hidden">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface-2/70 hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <main className="relative">
        {/* HERO */}
        <section id="home" className="relative overflow-hidden px-5 py-20 sm:py-28">
          <NetworkBackground />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-lavender">
                <span className="h-2 w-2 rounded-full bg-accent" /> Available for immediate joining
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
                Hi, I&apos;m <span className="text-gradient">Geeta Vajaram Chaudhari</span>
              </h1>
              <p className="mt-5 font-display text-lg text-lavender sm:text-xl">
                B.Sc. Computer Science Graduate | CCNA | RHEL | AWS
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
Building my career in Networking, Linux, and Cloud Computing. I am a motivated fresher with knowledge of network configuration, Linux administration, and AWS cloud services. I am continuously improving my technical skills and building a strong foundation, with DevOps as a future career goal.

              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition-transform hover:scale-[1.03]"
                >
                  View My Projects <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Contact Me
                </a>
                <a
                  href={`mailto:${EMAIL}?subject=Resume%20request`}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Download className="h-4 w-4" /> Resume
                </a>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
                {[
                  ["4", "Certifications"],
                  ["4", "Hands-on Projects"],
                  ["3", "Core Tech Tracks"],
                ].map(([n, l]) => (
                  <div key={l} className="glass rounded-2xl px-4 py-3">
                    <dt className="font-display text-2xl font-bold text-gradient">{n}</dt>
                    <dd className="text-xs text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={150} className="flex justify-center">
              <div className="relative float-slow">
                <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-primary opacity-25 blur-3xl" />
                <div className="pulse-glow relative h-72 w-56 rounded-3xl border-2 border-accent/50 bg-surface/70 p-1.5 backdrop-blur-xl sm:h-96 sm:w-72">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] border border-border">
                    <img
                      src={profilePhoto}
                      alt="Professional portrait of Geeta Vajaram Choudhari"
                      className="h-full w-full object-cover object-center"
                      loading="eager"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-2 rounded-[1.25rem] shadow-[inset_0_0_40px_oklch(0.58_0.24_300/25%)]" />
                </div>
                <span className="absolute -right-4 top-10 rounded-full border border-border bg-surface/90 px-3 py-1.5 text-xs font-medium text-lavender backdrop-blur">
                  CCNA
                </span>
                <span className="absolute -left-5 bottom-20 rounded-full border border-border bg-surface/90 px-3 py-1.5 text-xs font-medium text-lavender backdrop-blur">
                  RHEL
                </span>
                <span className="absolute -bottom-2 right-6 rounded-full border border-border bg-surface/90 px-3 py-1.5 text-xs font-medium text-lavender backdrop-blur">
                  AWS
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="relative px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="About" title="Curious about infrastructure, serious about growth" />
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal className="glass glass-hover rounded-3xl p-8">
                <p className="text-muted-foreground">
                  I&apos;m a Computer Science graduate from Mumbai, Maharashtra, interested in networking, Linux, and cloud computing. My training at NetTech India has helped me develop a solid foundation in CCNA networking, Red Hat Linux administration, and AWS cloud services. I'm continuously enhancing my technical skills and aim to pursue DevOps as a future career path.

                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                    "Strong interest in networking & infrastructure",
                    "Learning AWS cloud services",
                    "CCNA knowledge",
                    "Quick learner",
                    "Strong communication & teamwork",
                    "Open to entry-level & junior roles",
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-surface-2/60 px-4 py-2 text-sm text-lavender">
                  <Sparkles className="h-4 w-4" /> Available for immediate joining
                </p>
              </Reveal>

              <Reveal delay={120} className="glass glass-hover rounded-3xl p-8">
                <h3 className="font-display text-lg font-semibold">Currently learning</h3>
                <p className="mt-1 text-sm text-muted-foreground">My career journey, step by step.</p>
                <ol className="mt-6 space-y-4">
                  {["CCNA", "Linux / RHEL", "AWS", "DevOps ( In Future )"].map((s, i) => (
                    <li key={s} className="flex items-center gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div className="flex-1 rounded-xl border border-border bg-surface-2/50 px-4 py-3 font-display text-sm font-semibold">
                        {s}
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="relative px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Skills"
              title="Technical toolkit"
              sub="Technologies and concepts I work with across networking, Linux, cloud and development."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((s, i) => (
                <Reveal key={s.title} delay={i * 80} className="glass glass-hover rounded-3xl p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <Tag key={it}>{it}</Tag>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="relative px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Certifications" title="Trained and certified" />
            <div className="grid gap-6 sm:grid-cols-2">
              {CERTS.map((c, i) => (
                <Reveal key={c.name} delay={i * 80} className="glass glass-hover rounded-3xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-accent/40 bg-surface-2/70 text-accent">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold">{c.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Award className="h-4 w-4" /> {c.org}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="relative px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Projects"
              title="Hands-on lab & development work"
              sub="Practical builds from my networking, Linux, cloud and application development practice."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              {PROJECTS.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 80}
                  as="article"
                  className="glass glass-hover flex flex-col rounded-3xl p-7"
                >
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-2/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                    >
                      <Github className="h-4 w-4" /> View on GitHub
                    </a>
                  ) : (
                    <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm text-muted-foreground">
                      Lab project — walkthrough on request
                    </span>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Capabilities"
              title="Technical Areas I Can Work With"
              sub="Currently building practical experience and continuously expanding my skills toward DevOps and cloud infrastructure."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <Reveal
                  key={s.t}
                  delay={i * 60}
                  className="glass glass-hover flex items-center gap-4 rounded-2xl p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent/40 bg-surface-2/70 text-accent">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-medium">{s.t}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="relative px-5 py-20">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="Education" title="Academic background" />
            <ol className="relative space-y-6 border-l border-border pl-8">
              {EDUCATION.map((e, i) => (
                <Reveal key={e.degree} delay={i * 90} as="li" className="glass glass-hover relative rounded-2xl p-6">
                  <span className="absolute -left-[2.6rem] top-7 grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                    <GraduationCap className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {e.year}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold">{e.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* WHAT'S NEXT */}
        <section className="relative px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Roadmap"
              title="What's Next?"
              sub="My long-term goal is to build expertise in cloud infrastructure, automation, networking, Linux administration and DevOps."
            />
            <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
              {ROADMAP.map((r, i) => (
                <Reveal key={r.t} delay={i * 80} className="glass glass-hover rounded-3xl p-6 text-center">
                  <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold">{r.t}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{r.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SOFT SKILLS */}
        <section className="relative px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Soft skills" title="How I work with a team" />
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {SOFT.map((s, i) => (
                <Reveal key={s.t} delay={i * 60} className="glass glass-hover rounded-2xl p-5 text-center">
                  <s.icon className="mx-auto h-6 w-6 text-accent" />
                  <p className="mt-3 text-sm font-semibold">{s.t}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Contact"
              title="Let's Build Something Together"
              sub="Have an opening, an internship or a question? I'd love to hear from you."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <Reveal className="glass rounded-3xl p-8">
                <ul className="space-y-4 text-sm">
                  {[
                    { icon: Phone, label: "8421155726", href: "tel:+918421155726" },
                    { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
                    { icon: MapPin, label: "Mumbai, Maharashtra, India", href: null },
                    { icon: Github, label: "github.com/tech-is-available", href: GITHUB },
                    { icon: Linkedin,
                        label: "linkedin.com/in/geeta-chaudhari-28b939274",
                        href: "https://www.linkedin.com/in/geeta-chaudhari-28b939274/",
                      },
                  ].map((c) => (
                    <li key={c.label} className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/40 bg-surface-2/70 text-accent">
                        <c.icon className="h-4 w-4" />
                      </span>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="break-all transition-colors hover:text-accent"
                        >
                          {c.label}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">{c.label}</span>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-ring"
                  >
                    <Mail className="h-4 w-4" /> Email Me
                  </a>
                 <a
                    href="https://www.linkedin.com/in/geeta-chaudhari-28b939274/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </div>
              </Reveal>

              <Reveal delay={120} className="glass rounded-3xl p-8">
                <form className="space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-input bg-surface-2/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-input bg-surface-2/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full resize-none rounded-xl border border-input bg-surface-2/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
                      placeholder="Tell me about the role or project…"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {sending ? "Sending…" : "Send Message"} <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* HIRING CTA */}
        <section className="relative px-5 py-20">
          <Reveal className="glass mx-auto max-w-4xl rounded-3xl p-10 text-center glow-ring">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Looking for an opportunity to{" "}
              <span className="text-gradient">learn, contribute, and grow.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              I&apos;m actively looking for entry-level opportunities in Networking, Linux, AWS
              Cloud, IT Infrastructure and DevOps.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Let&apos;s Connect <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="relative border-t border-border/60 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-semibold">Geeta Vajaram Chaudhari</p>
            <p className="text-sm text-muted-foreground">
              Networking • Linux • AWS • Future DevOps
            </p>
          </div>
          <div className="flex gap-3">
            {[
              { href: GITHUB, icon: Github, label: "GitHub" },
               {href: "https://www.linkedin.com/in/geeta-chaudhari-28b939274/",
                icon: Linkedin,
                label: "LinkedIn",
              },
              { href: `mailto:${EMAIL}`, icon: Mail, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
