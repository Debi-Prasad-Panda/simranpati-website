import { buildMetadata } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Send an inquiry or schedule a call with Simran.",
});

export default function ContactPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-16 relative">
      {/* Background/Ambient Doodle or Header decor */}
      <div className="mb-16 text-center max-w-2xl mx-auto relative z-10">
        <h1 className="font-display text-5xl md:text-6xl text-ink-sepia">Let&apos;s Connect</h1>
        <p className="mt-4 text-lg text-on-surface-variant leading-relaxed">
          Whether you have a project in mind, want to discuss a potential role, or just want to say hello, I&apos;m always open to new conversations.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 relative z-10">
        {/* Left Column: Inquiry Form */}
        <div className="bg-container-warm p-8 md:p-12 rounded-xl border border-outline-variant/30">
          <h2 className="font-display text-3xl text-ink-sepia mb-6">
            Send a Message
          </h2>
          <ContactForm />
          
          <div className="mt-8 pt-6 border-t border-outline-variant/30">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Direct Contact</h3>
            <a className="inline-flex items-center gap-2 text-ink-sepia hover:text-accent-doodle transition-colors text-sm font-semibold" href="mailto:simranpati28@gmail.com">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              simranpati28@gmail.com
            </a>
          </div>
        </div>

        {/* Right Column: Calendar Booking */}
        <div className="bg-container-deep p-2 rounded-xl border border-outline-variant/30">
          {calendlyUrl ? (
            <div className="w-full h-[550px] overflow-hidden rounded-lg bg-paper-foundation border border-outline-variant/20">
              <iframe
                src={`${calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Scheduler"
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-lg bg-paper-foundation p-10 text-center border border-outline-variant/30">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Calendar
              </span>
              <h2 className="mt-4 font-display text-3xl text-ink-sepia">
                Schedule a Call
              </h2>
              <p className="mt-4 text-sm text-on-surface-variant max-w-[30ch] leading-relaxed">
                Prefer a face-to-face chat? Select a slot that works for you once the scheduler is connected.
              </p>
              <div className="mt-8 px-6 py-3 border border-dashed border-outline-variant text-xs text-on-surface-variant rounded bg-container-warm">
                Calendly integration coming soon (set <code>NEXT_PUBLIC_CALENDLY_URL</code>)
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
