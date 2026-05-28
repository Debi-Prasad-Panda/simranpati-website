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

export type SiteSettings = {
  heroTitle: string;
  heroTagline: string;
  aboutText: string;
  contactEmail: string;
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1dEr9s1CHZNCHIo6wA_bnmC1AhEofzLLtNzwWJXBw7Zbt9RO_B_tG8azp_4FQlYXBYc-t733xMg3JrM8pXfW-1R7KPtUEYihszLs_4A-eFE4XkqF3an8O27v35b4nKMZZsB2SuakgT2CnbVNg0RFb1j0VptHh52ZBHa-qI_kcR_anucZjOnzpJK-vjVy_KcJWlrSnWomlM-SJWOaeePzJ91T4HSD5_OamMtWhB9647WYQ3z85HtdVfT3IsaKs-l_NQRU_AZW65qE",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkppePsPkaCNjWWLUw90kH9XQN_aSX6tO5PajE03__dx0-usbScnPbUQTCqVbEh6nqn3w51BmiLzjXoih5Kz69rbPToknMcAdCtRsiGQ22jEYbhaQbtKZ4_Hm2_EOAAvdotIf9HIKzFFzLk9G7uyluwAedUjxIH3FVrm-nxkkkHkGHyoRwX82ET9PuW9A99FkZFFDhT5eTRmitfAJS5wBWvu2mBSn1HIQbNzwChzc1XNX2AOEQzS_QdfW8lcahbaJJAYYqQCzma28",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOoIUKi1MMNIjFsH6AC1rIHeMXaqy-bG036JT1ls9oU-_qbeM1XEaWyE01KKef8R-ZaYIOugFPtySewN1Cc0GEtGVEDFvw4YNv-fXorWli8MVEc3ArjFkJl7qVBgo_vRUsA5IheDm-nfX7VUJxDlyXKa-oipdkNKGovFf0wfqM6PX9oC1LeSksFMCbgvJ5YGa96478POqVLmykowSZ43fpphzyKt30OsdrnnCskXcQTJ96m9TN_pUIRfgX6p0B_u--bsW_V27AXTk",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8RJScz_yAY__3NqRIM567Rrz3jTtIv8-mrTWRHP5cuuj-ow4J0FMsBzEAmzDyPSEszBmIqOSqEgKU2WGvxlI4OXAcr5V9EWMLdPrgiSN8eqYIM7a790O_GmmZPuDru-qBczpmV3pzlU2IXRR9TZCpQo5gtw0DuU-NYDFZCY8pGMtuvJrEtNE5oye0rgI6ERQQr5ebgf9X47H7r_NC7xDveyeJTF0GlLjsqC05BxDHlLmNJzglzsjfrPiAR_N1k9zkXvN4AnK9HRc",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw_3IADf_wg8-Hcs1IOLFC6ph_UZ418nrkdnwM3hpZcw_oe1hy_-y6IUiSMxr8RacW8LArKrtlcV5Xfg82ivndjOO68I7ovHj0rzuCh0pSDNpmhw72EHWXRMh6GHPAcDtQK_WWh8DHSEcmt-mcTl8drBP7F4ZG7vVAZhmIdZbj6rZYVoCV3Kzcg3nqgrIridAZbHWjbDiYjXXvWfYqQI0oQH2MumoFsLIzPZHhDv1YDiQTU91FUlU1xKWFdfb8BYBlsS8O2_pBFKg",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIBH5fb-zA_pGfXr3hRrkUf9S6sARSQCpeA7AEwp3X0zBI6_UsAYbulDSwM0yx6Z8RjaGNrhmAOuigl4k2JN0o3J4sbAfp9CCAAFaEOu_YbwEzf1i1b-cCdsMj_gW3NCAhXuvfyHy3xOAFcE33EHJuu-tAIgTGPGEk_52DIeeUfIYSWS7zuKXfl2P28M2Jg1ysIfqVNnA9WgWmzQDTYR8OWSoaJ6Zzn0EYrtKnggXpWIOfDqZ6-uMD4SnDrUPklmrykwOkC2ey39M",
    galleryImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBd5zY8x4ujF0thl4w_FaSmClWLvQk4TzlIZ8_39M7BXHdRulZxT6uPA2JYIuB8W_eC0gfLUHyS8OCu4tdkl_Rc6eC2dw0QuAUwPFqj5QLhy0kKYnqqSvov4L8bDI8HjywWwwbYNDdGa4e9CP3xru2WKUP1S2ZUmNyv13cTVW-r4JzXKewsqFSN6a9QoRUQ4dc7WMtvFRTo1dMaYeOFzamu4kjoIBwSseNvlxyfPIGUTWjL0Wc7zjQ4u5vZq26w01mHtzhs87ONu4",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1dEr9s1CHZNCHIo6wA_bnmC1AhEofzLLtNzwWJXBw7Zbt9RO_B_tG8azp_4FQlYXBYc-t733xMg3JrM8pXfW-1R7KPtUEYihszLs_4A-eFE4XkqF3an8O27v35b4nKMZZsB2SuakgT2CnbVNg0RFb1j0VptHh52ZBHa-qI_kcR_anucZjOnzpJK-vjVy_KcJWlrSnWomlM-SJWOaeePzJ91T4HSD5_OamMtWhB9647WYQ3z85HtdVfT3IsaKs-l_NQRU_AZW65qE",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOoIUKi1MMNIjFsH6AC1rIHeMXaqy-bG036JT1ls9oU-_qbeM1XEaWyE01KKef8R-ZaYIOugFPtySewN1Cc0GEtGVEDFvw4YNv-fXorWli8MVEc3ArjFkJl7qVBgo_vRUsA5IheDm-nfX7VUJxDlyXKa-oipdkNKGovFf0wfqM6PX9oC1LeSksFMCbgvJ5YGa96478POqVLmykowSZ43fpphzyKt30OsdrnnCskXcQTJ96m9TN_pUIRfgX6p0B_u--bsW_V27AXTk",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkppePsPkaCNjWWLUw90kH9XQN_aSX6tO5PajE03__dx0-usbScnPbUQTCqVbEh6nqn3w51BmiLzjXoih5Kz69rbPToknMcAdCtRsiGQ22jEYbhaQbtKZ4_Hm2_EOAAvdotIf9HIKzFFzLk9G7uyluwAedUjxIH3FVrm-nxkkkHkGHyoRwX82ET9PuW9A99FkZFFDhT5eTRmitfAJS5wBWvu2mBSn1HIQbNzwChzc1XNX2AOEQzS_QdfW8lcahbaJJAYYqQCzma28",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8RJScz_yAY__3NqRIM567Rrz3jTtIv8-mrTWRHP5cuuj-ow4J0FMsBzEAmzDyPSEszBmIqOSqEgKU2WGvxlI4OXAcr5V9EWMLdPrgiSN8eqYIM7a790O_GmmZPuDru-qBczpmV3pzlU2IXRR9TZCpQo5gtw0DuU-NYDFZCY8pGMtuvJrEtNE5oye0rgI6ERQQr5ebgf9X47H7r_NC7xDveyeJTF0GlLjsqC05BxDHlLmNJzglzsjfrPiAR_N1k9zkXvN4AnK9HRc",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqZAzzwtUsJTmvUWkG01faXfopN6J3BpdCiwNnUPNJhifmNIeF9ZCwpzQfl04NWvym5nDpmqFy-OWOBCzsW0lBkJkIjI8ESD0IxKUac8ZFP1X3QN0GtaRAkD4PKZWXpXrqDPQ9jwd6P4Xg8YAVd1iFVl-P2SZ5C5Qe1IrKFecMkoytf7K0v3ZD5yWxvCpc6VOLsK02kKPwPXHzE0VP4heQuGQTnLAhUCV5LE0A_PKSa6III7v4otNUgMTJoMP4zV-GHwbq1VwMX40",
    galleryImages: [],
  },
];

const fallbackSettings: SiteSettings = {
  heroTitle: "Crafting clarity through ink and pixels.",
  heroTagline:
    "A curious blend of strategic editorial writing and structural design thinking. I build interfaces that read well and write copy that looks beautiful.",
  aboutText:
    "Hello. I'm Simran, a multidisciplinary designer and writer who finds harmony in the intersection of structured grids and organic storytelling. My practice is rooted in the belief that every pixel should serve a purpose, and every word should earn its place on the page.\n\nWith a background spanning editorial illustration to complex UX architecture, I approach projects with a \"quirky editorial\" mindset—seeking to inject moments of artisanal delight into functional, high-performing interfaces.",
  contactEmail: "simranpati28@gmail.com",
};

export async function getSiteSettings() {
  if (!process.env.DATABASE_URL) {
    return fallbackSettings;
  }

  try {
    const { rows } = await sql<SiteSettings>`
      SELECT hero_title AS "heroTitle", hero_tagline AS "heroTagline", about_text AS "aboutText", contact_email AS "contactEmail"
      FROM site_settings
      WHERE id = 1
      LIMIT 1
    `;

    if (rows.length === 0) {
      await sql`
        INSERT INTO site_settings (id, hero_title, hero_tagline, about_text, contact_email)
        VALUES (1, ${fallbackSettings.heroTitle}, ${fallbackSettings.heroTagline}, ${fallbackSettings.aboutText}, ${fallbackSettings.contactEmail})
      `;
      return fallbackSettings;
    }

    return rows[0] ?? fallbackSettings;
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
    const { rows } = await sql<any>`
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

    return rows.map((row: any) => ({
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
    const { rows } = await sql<any>`
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
