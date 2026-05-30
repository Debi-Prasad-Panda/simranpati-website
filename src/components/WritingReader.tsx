"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type WritingReaderProps = {
  title: string;
  excerpt: string;
  readingTime: number;
  publishedAt: string;
  coverImageUrl: string;
  htmlContent: string;
};

export default function WritingReader({
  title,
  excerpt,
  readingTime,
  publishedAt,
  coverImageUrl,
  htmlContent,
}: WritingReaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync state with HTML document element's classList
  const handleToggle = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Revert back to light mode when the user leaves the article page
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <div className="w-full py-12 px-6 md:px-0 rounded bg-transparent text-ink-sepia selection:bg-container-warm selection:text-ink-sepia">
      <div className="mx-auto max-w-[65ch]">
        {/* Localized Dark Mode Toggle */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={handleToggle}
            className="flex items-center gap-2 rounded-full border border-ink-sepia/20 text-ink-sepia hover:bg-ink-sepia hover:text-paper-foundation px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
          >
            {isDarkMode ? (
              <>
                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41z" />
                </svg>
                <span>Paper Mode</span>
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.6-.1 1.2.3 1.3.9.1.6-.2 1.2-.8 1.4-3.5 1.3-5.8 4.7-5.8 8.5 0 5 4 9 9 9 3.8 0 7.2-2.3 8.5-5.8.2-.6.8-.9 1.4-.8.6.1 1 .7.9 1.3-.9 4.7-5 8.2-9.8 8.3z" />
                </svg>
                <span>Ink Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Article Content */}
        <header className="text-center md:text-left">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] md:justify-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-container-warm border-outline-variant/30 text-on-surface-variant">
              <svg
                className="h-3.5 w-3.5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 13l-4.13-2.48c-.11-.07-.17-.18-.17-.3V7c0-.55.45-1 1-1s1 .45 1 1v4.72l3.6 2.16c.48.29.63.9.34 1.38s-.89.63-1.38.34z" />
              </svg>
              {readingTime} min read
            </span>
            <span className="text-on-surface-variant">
              {publishedAt}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight text-ink-sepia">
            {title}
          </h1>
          <p className="mt-4 text-lg italic text-on-surface-variant">
            {excerpt}
          </p>
        </header>

        <figure className="my-10 overflow-hidden rounded border border-outline-variant/30 bg-surface-variant/20 p-2 relative">
          <Image
            alt={title}
            src={coverImageUrl}
            width={800}
            height={450}
            className="w-full h-auto object-cover rounded opacity-95 transition-opacity hover:opacity-100 duration-500"
          />
        </figure>

        <div
          className="rich-text prose lg:prose-xl max-w-none text-ink-sepia"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
