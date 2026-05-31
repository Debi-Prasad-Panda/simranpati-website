import { sql } from "@/lib/db";
import { estimateReadingTime } from "@/lib/reading-time";

export type WritingPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImageUrl: string;
  readingTime: number;
  publishedAt: string;
};

export type DesignProject = {
  id: string;
  title: string;
  slug: string;
  overview: string;
  role: string;
  tools: string[];
  year: string;
  coverImageUrl: string;
  galleryImages: string[];
};

export type DbDesignProject = {
  id: string;
  title: string;
  slug: string;
  overview: string;
  role: string;
  tools: string[] | string;
  year: string;
  coverImageUrl: string;
  galleryImages: string[] | string | null;
};

export type TimelineItem = {
  id: string;
  type: "work" | "education";
  period: string;
  title: string;
  organization: string;
  description: string;
};

export type SiteSettings = {
  heroTitle: string;
  heroTagline: string;
  aboutText: string;
  contactEmail: string;
  aboutPhotoUrl?: string | null;
  resumeUrl?: string | null;
  linkedinUrl?: string | null;
  timelineData?: TimelineItem[] | null;
};

const fallbackWriting: WritingPost[] = [
  {
    id: "1",
    title: "The Architecture of Silence in Modern UI",
    slug: "the-architecture-of-silence-in-modern-ui",
    excerpt:
      "As interfaces become increasingly crowded with notifications, micro-interactions, and artificial urgency, the deliberate use of negative space and 'silence' has transitioned from a purely aesthetic choice to an ethical imperative for digital well-being.",
    body: `As interfaces become increasingly crowded with notifications, micro-interactions, and artificial urgency, the deliberate use of negative space and 'silence' has transitioned from a purely aesthetic choice to an ethical imperative for digital well-being.

True mastery lies in understanding the architecture of the spaces we leave untouched. When we translate this to digital experiences, the concept of 'paper' becomes metaphorical. A screen has no physical edge, no tactile grain. But the psychological need for spaciousness remains.

A crowded layout induces cognitive claustrophobia. By consciously employing generous gutters, padded containers, and deep, tonal layering, we can simulate the comforting, structured precision of a high-end physical journal.

In my practice, I treat white space not as an absence of content, but as a deliberate structural element. It is the mortar that holds the bricks of our typography together. Without it, the wall collapses into an unreadable mess of noise.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600",
    readingTime: 8,
    publishedAt: "2024-10-24",
  },
  {
    id: "2",
    title: "Why We Crave Skeuomorphism Again",
    slug: "why-we-crave-skeuomorphism-again",
    excerpt:
      "A look into the cyclical nature of design trends, and why the sterility of flat design is giving way to tactile, imperfect digital materials.",
    body: `A look into the cyclical nature of design trends, and why the sterility of flat design is giving way to tactile, imperfect digital materials.

In our rush to optimize, digitize, and flatten everything, we lost the sensory anchor. Flat design was clean, but it was also sterile. It lacked context, warmth, and the friction of the real world.

Now, we crave tactile boundaries. Subtle gradients, textured cards, and hand-drawn doodles are making a comeback. Not because we want to mimic physical leather or metal literalism, but because we seek interface humanity. We need visual cues that feel alive, responsive, and crafted by human hands.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600",
    readingTime: 5,
    publishedAt: "2024-08-15",
  },
  {
    id: "3",
    title: "Ghosts in the Machine: Navigating Legacy Code",
    slug: "ghosts-in-the-machine-navigating-legacy-code",
    excerpt:
      "An anecdotal journey through the undocumented logic of an old system, and the humanity embedded in forgotten functions.",
    body: `An anecdotal journey through the undocumented logic of an old system, and the humanity embedded in forgotten functions.

Every legacy codebase is a library of human decisions, compromises, and constraints. When we inherit an old system, we are not just inheriting lines of code; we are inheriting history. We trace paths written by engineers who have long since moved on, reading their comments like marginalia in an old book.

There is beauty in these forgotten functions. They represent moments of problem-solving under pressure, clever workarounds, and elegant architectures that held up for years. By respecting these ghosts in the machine, we build better bridges to the future.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600",
    readingTime: 12,
    publishedAt: "2024-06-10",
  },
  {
    id: "4",
    title: "Typography as Tone of Voice",
    slug: "typography-as-tone-of-voice",
    excerpt:
      "How serif selection and tracking manipulate reader perception before a single word is comprehended.",
    body: `How serif selection and tracking manipulate reader perception before a single word is comprehended.

Before a word is read, its shape is perceived. The serif, the tracking, the weight—they all convey an immediate emotional frequency. A clean, high-contrast serif communicates editorial authority, reminding the reader of traditional print journalism. A minimal sans-serif speaks to modern utility and swift accessibility.

In design, typography is our voice. We sculpt the silent spaces around our letters, choosing tracking tolerances and scale to orchestrate a sense of premium craft and intentional reading.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600",
    readingTime: 6,
    publishedAt: "2024-04-05",
  },
  {
    id: "5",
    title: "The Architecture of Empty Spaces",
    slug: "the-art-of-seeing",
    excerpt:
      "Exploring how the white space between our words holds as much meaning as the ink itself.",
    body: `There is a specific kind of silence that exists only on an empty page. Before the pen touches down, the paper is an expanse of possibility, a landscape waiting to be mapped. As designers and writers, we often obsess over the marks we make—the typography, the color palettes, the clever turns of phrase. Yet, true mastery lies in understanding the architecture of the spaces we leave untouched.

Consider the margins. In classical typesetting, the margins were generous, framing the text like a painting in a gallery. This wasn't merely an aesthetic choice; it was functional. Wide margins provided room for the reader's thumbs, space for marginalia, and most importantly, visual breathing room for the eyes to rest after tracking lines of dense ink.

> "We sculpt with silence. The letters are just the tools we use to carve shapes into the vastness of the paper."

When we translate this to digital experiences, the concept of 'paper' becomes metaphorical. A screen has no physical edge, no tactile grain. But the psychological need for spaciousness remains. A crowded layout induces cognitive claustrophobia. By consciously employing generous gutters, padded containers, and deep, tonal layering, we can simulate the comforting, structured precision of a high-end physical journal.

In my practice, I treat white space—or in our case, the warm, organic texture of #FFEDDB—not as an absence of content, but as a deliberate structural element. It is the mortar that holds the bricks of our typography together. Without it, the wall collapses into an unreadable mess of noise.`,
    coverImageUrl:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600",
    readingTime: 4,
    publishedAt: "2023-10-24",
  },
];

const fallbackDesign: DesignProject[] = [
  {
    id: "1",
    title: "Coincidence & Fate",
    slug: "coincidence-fate",
    overview:
      "An exploration of serendipity through visual poetry. This project translates abstract concepts of chance encounters into a structured, editorial layout that feels simultaneously chaotic and deliberate. By combining rigorous grid systems with spontaneous, hand-drawn marginalia, the design mirrors the unpredictability of fate.",
    role: "Art Direction, Grid Development, Custom Illustration",
    tools: ["Figma", "InDesign", "Procreate"],
    year: "2023",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600",
    galleryImages: [
      "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600",
    ],
  },
  {
    id: "2",
    title: "The Botanical Quarterly",
    slug: "botanical-quarterly",
    overview:
      "A print editorial series using negative space and botanical marginalia to create a serene rhythm. Each layout behaves like a physical page, balancing delicate illustration details with structured typography blocks.",
    role: "Editorial Design, Typography System",
    tools: ["InDesign", "Illustrator"],
    year: "2024",
    coverImageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600",
    galleryImages: [],
  },
  {
    id: "3",
    title: "Lumina Roasters",
    slug: "lumina-roasters",
    overview:
      "A premium brand identity presentation featuring minimalist packaging for a boutique coffee roaster. It utilizes a quirky editorial aesthetic with artisanal, hand-drawn vector doodle accents to convey warmth and quality.",
    role: "Brand Identity, Packaging Design",
    tools: ["Illustrator", "Photoshop"],
    year: "2024",
    coverImageUrl:
      "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=600",
    galleryImages: [],
  },
  {
    id: "4",
    title: "Atelier E-Commerce",
    slug: "atelier-e-commerce",
    overview:
      "A modern web design mockup showcasing a minimalist editorial layout with large intentional margins, a fixed grid system, and subtle interactive gestures for a boutique clothing brand.",
    role: "UI/UX Design, Web Interface Mockup",
    tools: ["Figma", "React"],
    year: "2023",
    coverImageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600",
    galleryImages: [],
  },
  {
    id: "5",
    title: "Exhibition Monograph",
    slug: "exhibition-monograph",
    overview:
      "An artistic poster design featuring bold, structural typography layered over abstract, organic shapes. The design balances human brushstrokes with rigorous fixed-grid precision.",
    role: "Typography, Poster Design",
    tools: ["Illustrator", "InDesign"],
    year: "2023",
    coverImageUrl:
      "https://images.unsplash.com/photo-1507208773393-401966772d2b?q=80&w=600",
    galleryImages: [],
  },
  {
    id: "6",
    title: "Maison Art Kit",
    slug: "maison-art-kit",
    overview:
      "A high-end stationery suite packaging design utilizing custom vector doodles as marginalia to provide a warm human touch to structured visual collateral elements.",
    role: "Collateral Design, Stationery",
    tools: ["InDesign", "Photoshop"],
    year: "2024",
    coverImageUrl:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600",
    galleryImages: [],
  },
];

const fallbackSettings: SiteSettings = {
  heroTitle: "Turning complex ideas into engaging narratives.",
  heroTagline:
    "A postgraduate English literature student with a focus on digital storytelling, copywriting, and content writing. I explore the space where words, culture, and digital media connect.",
  aboutText:
    "Hello. I'm Simran, a postgraduate English student and writer who finds harmony in the intersection of literature, storytelling, and digital media. I enjoy turning abstract concepts into engaging, accessible, and structured copy. My goal is to use digital platforms to make art, culture, and personal reflections more relatable and meaningful for everyone.\n\nWith experience spanning editorial blogging, content creation for NGOs, and teaching communication skills, I bring a thoughtful and adaptable approach to crafting digital narratives.",
  contactEmail: "simranpati01@gmail.com",
  aboutPhotoUrl: "/simran.jpg",
  resumeUrl: "/resume.pdf",
  linkedinUrl: "https://www.linkedin.com/in/simran-pati-9b02aa247",
  timelineData: [
    {
      id: "w1",
      type: "work",
      period: "Feb 2025 — Mar 2025",
      title: "Intern - Content Writer",
      organization: "InAmigos",
      description: "Created audience-focused digital content to communicate the NGO's mission across platforms. Translated social initiatives into engaging narratives to increase relatability and outreach."
    },
    {
      id: "w2",
      type: "work",
      period: "2023 — 2024",
      title: "Communication & English Instructor",
      organization: "Tanusri's Art and Craft Academy",
      description: "Designed and conducted interactive online sessions to improve students' communication skills. Used storytelling, visual aids, and performance-based techniques to enhance engagement."
    },
    {
      id: "w3",
      type: "work",
      period: "Apr 2023 — Jun 2023",
      title: "Intern - Web Content Writer",
      organization: "Webify Hub",
      description: "Produced blog content across diverse topics using AI-assisted research and prompt engineering. Edited and refined content for clarity, coherence, and reader engagement."
    },
    {
      id: "e1",
      type: "education",
      period: "2025 — Present",
      title: "MA in English Literature",
      organization: "St. Xavier's University, Kolkata",
      description: "Pursuing post-graduate studies with a focus on narrative structures, language history, and modern literary critiques."
    },
    {
      id: "e2",
      type: "education",
      period: "2021 — 2024",
      title: "BA in English Literature (Honours)",
      organization: "Calcutta University",
      description: "Graduated with honours. Ranked among the top scorers of the undergraduate batch at the University of Calcutta."
    },
    {
      id: "e3",
      type: "education",
      period: "Graduated 2021",
      title: "Class XII (ISC)",
      organization: "Auxilium Convent School",
      description: "Graduated with a score of 90.5%. Member of the school Reporting Club (2022-2024) and Event Planner (2016-2020)."
    }
  ]
};

export async function getSiteSettings() {
  if (!process.env.DATABASE_URL) {
    return fallbackSettings;
  }

  try {
    // Run an automatic migration check
    await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS about_photo_url TEXT`;
    await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS resume_url TEXT`;
    await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS linkedin_url TEXT`;
    await sql`ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS timeline_data JSONB`;

    const { rows } = await sql<any>`
      SELECT 
        hero_title AS "heroTitle", 
        hero_tagline AS "heroTagline", 
        about_text AS "aboutText", 
        contact_email AS "contactEmail",
        about_photo_url AS "aboutPhotoUrl",
        resume_url AS "resumeUrl",
        linkedin_url AS "linkedinUrl",
        timeline_data AS "timelineData"
      FROM site_settings
      WHERE id = 1
      LIMIT 1
    `;

    if (rows.length === 0) {
      const timelineJson = JSON.stringify(fallbackSettings.timelineData);
      await sql`
        INSERT INTO site_settings (id, hero_title, hero_tagline, about_text, contact_email, about_photo_url, resume_url, linkedin_url, timeline_data)
        VALUES (1, ${fallbackSettings.heroTitle}, ${fallbackSettings.heroTagline}, ${fallbackSettings.aboutText}, ${fallbackSettings.contactEmail}, ${fallbackSettings.aboutPhotoUrl}, ${fallbackSettings.resumeUrl}, ${fallbackSettings.linkedinUrl}, ${timelineJson})
      `;
      return fallbackSettings;
    }

    const settings = rows[0];
    return {
      heroTitle: settings.heroTitle,
      heroTagline: settings.heroTagline,
      aboutText: settings.aboutText,
      contactEmail: settings.contactEmail,
      aboutPhotoUrl: settings.aboutPhotoUrl ?? fallbackSettings.aboutPhotoUrl,
      resumeUrl: settings.resumeUrl ?? fallbackSettings.resumeUrl,
      linkedinUrl: settings.linkedinUrl ?? fallbackSettings.linkedinUrl,
      timelineData: Array.isArray(settings.timelineData) ? settings.timelineData : fallbackSettings.timelineData,
    } as SiteSettings;
  } catch (error) {
    console.error("Failed to load site settings", error);
    return fallbackSettings;
  }
}

export async function getWritingPosts() {
  if (!process.env.DATABASE_URL) {
    return fallbackWriting.map((post) => ({
      ...post,
      readingTime: estimateReadingTime(post.body),
    }));
  }

  try {
    const { rows } = await sql<WritingPost>`
      SELECT id, title, slug, excerpt, body, cover_image_url AS "coverImageUrl", published_at AS "publishedAt"
      FROM writing_posts
      WHERE is_published = true
      ORDER BY published_at DESC
    `;

    if (rows.length === 0) {
      for (const post of fallbackWriting) {
        await sql`
          INSERT INTO writing_posts (title, slug, excerpt, body, cover_image_url, reading_time, is_published, published_at)
          VALUES (${post.title}, ${post.slug}, ${post.excerpt}, ${post.body}, ${post.coverImageUrl}, ${estimateReadingTime(post.body)}, true, ${post.publishedAt})
          ON CONFLICT (slug) DO NOTHING
        `;
      }
      return fallbackWriting.map((post) => ({
        ...post,
        readingTime: estimateReadingTime(post.body),
      }));
    }

    return rows.map((row) => ({
      ...row,
      readingTime: estimateReadingTime(row.body),
    }));
  } catch (error) {
    console.error("Failed to load writing posts", error);
    return fallbackWriting.map((post) => ({
      ...post,
      readingTime: estimateReadingTime(post.body),
    }));
  }
}

export async function getWritingPostBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    return fallbackWriting.find((post) => post.slug === slug) ?? null;
  }

  try {
    const { rows } = await sql<WritingPost>`
      SELECT id, title, slug, excerpt, body, cover_image_url AS "coverImageUrl", published_at AS "publishedAt"
      FROM writing_posts
      WHERE slug = ${slug} AND is_published = true
      LIMIT 1
    `;

    if (!rows[0]) {
      return fallbackWriting.find((post) => post.slug === slug) ?? null;
    }

    return {
      ...rows[0],
      readingTime: estimateReadingTime(rows[0].body),
    };
  } catch (error) {
    console.error("Failed to load writing post", error);
    return fallbackWriting.find((post) => post.slug === slug) ?? null;
  }
}

export async function getDesignProjects() {
  if (!process.env.DATABASE_URL) {
    return fallbackDesign;
  }

  try {
    const { rows } = await sql<DbDesignProject>`
      SELECT id, title, slug, overview, role, tools, year, cover_image_url AS "coverImageUrl", gallery_images AS "galleryImages"
      FROM design_projects
      WHERE is_published = true
      ORDER BY year DESC
    `;

    if (rows.length === 0) {
      for (const project of fallbackDesign) {
        const toolsStr = `{${project.tools.map((t) => `"${t}"`).join(",")}}`;
        const galleryImagesStr = `{${project.galleryImages.map((img) => `"${img}"`).join(",")}}`;
        await sql`
          INSERT INTO design_projects (title, slug, overview, role, tools, year, cover_image_url, gallery_images, is_published)
          VALUES (${project.title}, ${project.slug}, ${project.overview}, ${project.role}, ${toolsStr}::text[], ${project.year}, ${project.coverImageUrl}, ${galleryImagesStr}::text[], true)
          ON CONFLICT (slug) DO NOTHING
        `;
      }
      return fallbackDesign;
    }

    return rows.map((row: DbDesignProject) => ({
      ...row,
      tools: Array.isArray(row.tools)
        ? row.tools
        : String(row.tools).split(","),
      galleryImages: Array.isArray(row.galleryImages)
        ? row.galleryImages
        : typeof row.galleryImages === "string"
          ? row.galleryImages.split(",")
          : [],
    })) as DesignProject[];
  } catch (error) {
    console.error("Failed to load design projects", error);
    return fallbackDesign;
  }
}

export async function getDesignProjectBySlug(slug: string) {
  if (!process.env.DATABASE_URL) {
    return fallbackDesign.find((project) => project.slug === slug) ?? null;
  }

  try {
    const { rows } = await sql<DbDesignProject>`
      SELECT id, title, slug, overview, role, tools, year, cover_image_url AS "coverImageUrl", gallery_images AS "galleryImages"
      FROM design_projects
      WHERE slug = ${slug} AND is_published = true
      LIMIT 1
    `;

    if (!rows[0]) {
      return fallbackDesign.find((project) => project.slug === slug) ?? null;
    }

    const row = rows[0];
    return {
      ...row,
      tools: Array.isArray(row.tools)
        ? row.tools
        : String(row.tools).split(","),
      galleryImages: Array.isArray(row.galleryImages)
        ? row.galleryImages
        : typeof row.galleryImages === "string"
          ? row.galleryImages.split(",")
          : [],
    } as DesignProject;
  } catch (error) {
    console.error("Failed to load design project", error);
    return fallbackDesign.find((project) => project.slug === slug) ?? null;
  }
}
