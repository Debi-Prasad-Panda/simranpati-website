import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/content";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn more about Simran and the editorial philosophy behind Art & Words.",
});

export default async function AboutPage() {
  const settings = await getSiteSettings();

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
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"
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
                Weaving narratives through design.
              </h1>
              <div className="mt-6 border-l-4 border-accent-doodle pl-6 text-lg italic text-ink-sepia">
                &ldquo;I believe the best digital experiences feel as intentional and tactile as a well-bound book.&rdquo;
              </div>
              <div className="mt-6 text-lg text-on-surface-variant space-y-4">
                <p>
                  {settings.aboutText || "Hello. I'm Simran, a multidisciplinary designer and writer who finds harmony in the intersection of structured grids and organic storytelling. My practice is rooted in the belief that every pixel should serve a purpose, and every word should earn its place on the page."}
                </p>
                <p>
                  With a background spanning editorial illustration to complex UX architecture, I approach projects with a &ldquo;quirky editorial&rdquo; mindset—seeking to inject moments of artisanal delight into functional, high-performing interfaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Philosophy & Stack */}
      <section className="mx-auto max-w-[1280px] px-6 pb-20 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Philosophy Card */}
          <div className="col-span-1 md:col-span-2 bg-surface-variant p-8 rounded-lg border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
              <svg className="w-12 h-12 text-accent-doodle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.97-8.97L15 9l-5.187 6.904z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707" />
              </svg>
            </div>
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
                  Structural Precision
                </h3>
                <p className="text-sm leading-relaxed">
                  Artistic expression must rest on a solid foundation. Rigorous grid systems ensure content hierarchy is never compromised.
                </p>
              </div>
            </div>
          </div>

          {/* Tool Stack Card */}
          <div className="col-span-1 bg-container-warm p-8 rounded-lg border border-outline-variant/30 flex flex-col justify-center">
            <h2 className="font-display text-2xl text-ink-sepia mb-6 border-b border-outline-variant/30 pb-2">The Workbench</h2>
            <ul className="space-y-4 text-on-surface-variant font-medium">
              <li className="flex items-center justify-between group cursor-default">
                <span className="text-sm">Figma / FigJam</span>
                <span className="text-[10px] uppercase tracking-widest text-accent-doodle opacity-0 group-hover:opacity-100 transition-opacity">Design</span>
              </li>
              <li className="flex items-center justify-between group cursor-default">
                <span className="text-sm">Adobe Creative Suite</span>
                <span className="text-[10px] uppercase tracking-widest text-accent-doodle opacity-0 group-hover:opacity-100 transition-opacity">Visuals</span>
              </li>
              <li className="flex items-center justify-between group cursor-default">
                <span className="text-sm">HTML / CSS (Tailwind)</span>
                <span className="text-[10px] uppercase tracking-widest text-accent-doodle opacity-0 group-hover:opacity-100 transition-opacity">Web</span>
              </li>
              <li className="flex items-center justify-between group cursor-default">
                <span className="text-sm">Fountain Pen &amp; Ink</span>
                <span className="text-[10px] uppercase tracking-widest text-accent-doodle opacity-0 group-hover:opacity-100 transition-opacity">Doodles</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
