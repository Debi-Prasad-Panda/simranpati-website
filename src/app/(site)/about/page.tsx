import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/content";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn more about Simran and the editorial philosophy behind Art & Words.",
});

export default async function AboutPage() {
  const settings = await getSiteSettings();
  
  const timeline = settings.timelineData || [];
  const workEntries = timeline.filter((item) => item.type === "work");
  const educationEntries = timeline.filter((item) => item.type === "education");

  return (
    <div className="relative pt-6">
      {/* Hero Section: Editorial Split */}
      <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Portrait Canvas */}
          <div className="col-span-1 md:col-span-5 order-2 md:order-1">
            <div className="relative max-w-sm mx-auto md:mx-0">
              <div className="bg-container-warm p-4 transform -rotate-2 relative z-10 border border-outline-variant/30 group">
                <Image
                  alt="Portrait of Simran"
                  height={520}
                  src={settings.aboutPhotoUrl || "/simran.jpg"}
                  width={480}
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out rounded-sm"
                />
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink-sepia/70">
                    Hand-crafted with ink &amp; pixels
                  </span>
                </div>
              </div>
              {/* Decorative outline card behind */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-outline-variant z-0 transform rotate-1"></div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="col-span-1 md:col-span-7 order-1 md:order-2">
            <div className="max-w-[65ch]">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-doodle">
                About Simran
              </span>
              <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-ink-sepia leading-tight">
                Connecting words, culture, and digital media.
              </h1>
              <div className="mt-6 border-l-4 border-accent-doodle pl-6 text-lg italic text-ink-sepia">
                &ldquo;I believe that storytelling is the thread that connects art, culture, and human experiences.&rdquo;
              </div>
              <div className="mt-6 text-lg text-on-surface-variant space-y-4">
                <p>
                  {settings.aboutText || "Hello. I'm Simran, a postgraduate English student and writer who finds harmony in the intersection of literature, storytelling, and digital media. I enjoy turning abstract concepts into engaging, accessible, and structured copy. My goal is to use digital platforms to make art, culture, and personal reflections more relatable and meaningful for everyone."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Philosophy & Stack */}
      <section className="mx-auto max-w-[1280px] px-6 pb-12 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Philosophy Card */}
          <div className="col-span-1 md:col-span-2 bg-surface-variant p-8 rounded border border-outline-variant/30 relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
              <svg className="w-12 h-12 text-accent-doodle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.97-8.97L15 9l-5.187 6.904z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-3xl text-ink-sepia mb-6">Creative Philosophy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-on-surface-variant">
                <div>
                  <h3 className="font-display text-xl text-primary mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-doodle"></span>
                    Marginalia
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Embracing the imperfect. Custom doodles and organic textures add a necessary human touch to sterile digital environments.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-primary mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-doodle"></span>
                    Narrative Structure
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Artistic expression must rest on a solid foundation. Rigorous narrative systems ensure content hierarchy and storytelling clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Focus Card */}
          <div className="col-span-1 bg-container-warm p-8 rounded border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink-sepia mb-6 border-b border-outline-variant/30 pb-2">Core Focus</h2>
              <ul className="space-y-3.5 text-on-surface-variant font-medium">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent-doodle"></span>
                  <span className="text-sm">Storytelling &amp; Narratives</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent-doodle"></span>
                  <span className="text-sm">Content &amp; Copywriting</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent-doodle"></span>
                  <span className="text-sm">Editing &amp; Proofreading</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent-doodle"></span>
                  <span className="text-sm">Audience Engagement</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent-doodle"></span>
                  <span className="text-sm">Digital Communication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Row 2: Expanded Skills & Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Design Toolkit Card */}
          <div className="bg-surface p-8 rounded border border-outline-variant/30 flex flex-col justify-between hover:border-accent-doodle/50 transition-all duration-300 group hover:shadow-md">
            <div>
              <h2 className="font-display text-xl text-ink-sepia mb-4 pb-2 border-b border-outline-variant/20 flex items-center justify-between">
                <span>Design &amp; Writing Tools</span>
                <svg className="w-4 h-4 text-on-surface-variant group-hover:text-accent-doodle transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </h2>
              <ul className="space-y-3 text-on-surface-variant font-medium text-sm">
                <li className="flex items-center justify-between">
                  <span>Canva</span>
                  <span className="text-[9px] uppercase tracking-widest text-accent-doodle font-bold">Marketing Design</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Video Editing (basic)</span>
                  <span className="text-[9px] uppercase tracking-widest text-accent-doodle font-bold">Media Content</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Figma &amp; FigJam</span>
                  <span className="text-[9px] uppercase tracking-widest text-accent-doodle font-bold">Layouts / UI</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Adobe Photoshop</span>
                  <span className="text-[9px] uppercase tracking-widest text-accent-doodle font-bold">Editing</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Google Suite &amp; Markdown</span>
                  <span className="text-[9px] uppercase tracking-widest text-accent-doodle font-bold">Documenting</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Creative Mediums Card */}
          <div className="bg-surface p-8 rounded border border-outline-variant/30 flex flex-col justify-between hover:border-accent-doodle/50 transition-all duration-300 group hover:shadow-md">
            <div>
              <h2 className="font-display text-xl text-ink-sepia mb-4 pb-2 border-b border-outline-variant/20 flex items-center justify-between">
                <span>Creative Mediums</span>
                <svg className="w-4 h-4 text-on-surface-variant group-hover:text-accent-doodle transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </h2>
              <ul className="space-y-3 text-on-surface-variant font-medium text-sm">
                <li className="flex items-center justify-between">
                  <span>Independent Blogging</span>
                  <span className="text-[9px] uppercase tracking-widest text-accent-doodle font-bold">Medium / Blogs</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Research</span>
                  <span className="text-[9px] uppercase tracking-widest text-accent-doodle font-bold">Narratives</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Teaching &amp; Public Speaking</span>
                  <span className="text-[9px] uppercase tracking-widest text-accent-doodle font-bold">Communication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section className="mx-auto max-w-[1280px] px-6 pb-24 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-outline-variant/30 pt-16">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-doodle">
              Journey
            </span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink-sepia">
              Experience &amp; Education
            </h2>
            <p className="mt-4 text-sm text-on-surface-variant max-w-[30ch] leading-relaxed">
              A timeline of my professional growth, academic foundations, and creative exploration.
            </p>
            
            {/* Resume and Socials CTA in the left sidebar on desktop */}
            <div className="mt-8 hidden lg:flex flex-col gap-4">
              <a
                href={settings.resumeUrl || "/resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink-sepia text-ink-sepia hover:bg-ink-sepia hover:text-paper-foundation transition-all duration-300 rounded font-medium text-sm w-fit"
              >
                <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume (PDF)
              </a>
              
              <div className="flex items-center gap-4 mt-2">
                <a href={settings.linkedinUrl || "https://www.linkedin.com/in/simran-pati-9b02aa247"} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-accent-doodle transition-colors" title="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href={`mailto:${settings.contactEmail || "simranpati01@gmail.com"}`} className="text-on-surface-variant hover:text-accent-doodle transition-colors" title="Email Contact">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Experience Timeline */}
            <div>
              <h3 className="font-display text-2xl text-ink-sepia mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-doodle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Work Experience
              </h3>
              <div className="relative border-l border-outline-variant/40 pl-6 space-y-10">
                {workEntries.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-outline-variant border-4 border-paper-foundation group-hover:bg-accent-doodle group-hover:scale-125 transition-all duration-300"></div>
                    <span className="text-xs font-mono text-accent-doodle">{item.period}</span>
                    <h4 className="font-display text-lg text-primary mt-1">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant font-medium">{item.organization}</p>
                    <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
                {workEntries.length === 0 && (
                  <p className="text-sm text-on-surface-variant italic">No experience entries listed.</p>
                )}
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <h3 className="font-display text-2xl text-ink-sepia mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-doodle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Education
              </h3>
              <div className="relative border-l border-outline-variant/40 pl-6 space-y-10">
                {educationEntries.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-outline-variant border-4 border-paper-foundation group-hover:bg-accent-doodle group-hover:scale-125 transition-all duration-300"></div>
                    <span className="text-xs font-mono text-on-surface-variant">{item.period}</span>
                    <h4 className="font-display text-lg text-primary mt-1">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant font-medium">{item.organization}</p>
                    <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
                {educationEntries.length === 0 && (
                  <p className="text-sm text-on-surface-variant italic">No education entries listed.</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Resume and Socials CTA for mobile/tablet screens */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 md:gap-10 border-t border-outline-variant/30 pt-8 w-full lg:hidden">
            <a
              href={settings.resumeUrl || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink-sepia text-ink-sepia hover:bg-ink-sepia hover:text-paper-foundation transition-all duration-300 rounded font-medium text-sm w-full sm:w-auto"
            >
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume (PDF)
            </a>
            
            <div className="flex items-center gap-6 mt-2 sm:mt-0">
              <a href={settings.linkedinUrl || "https://www.linkedin.com/in/simran-pati-9b02aa247"} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-accent-doodle transition-colors" title="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href={`mailto:${settings.contactEmail || "simranpati01@gmail.com"}`} className="text-on-surface-variant hover:text-accent-doodle transition-colors" title="Email Contact">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
