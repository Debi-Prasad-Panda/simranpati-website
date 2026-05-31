"use client";

import { useState } from "react";
import SiteSettingsForm from "./SiteSettingsForm";
import AdminInventory from "./AdminInventory";
import WritingPostForm from "./WritingPostForm";
import DesignProjectForm from "./DesignProjectForm";
import { SiteSettings } from "@/lib/content";

type AdminDashboardTabsProps = {
  settings: SiteSettings;
};

type TabId = "settings" | "inventory" | "writing" | "design";

export default function AdminDashboardTabs({ settings }: AdminDashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("settings");

  const tabs = [
    {
      id: "settings" as TabId,
      name: "Site Configuration",
      desc: "Hero copy, about photo, resume, socials, and timeline.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: "inventory" as TabId,
      name: "Existing Content",
      desc: "Manage, view, and delete published writing posts and designs.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      id: "writing" as TabId,
      name: "New Writing Post",
      desc: "Draft and publish new long-form articles in Markdown.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      id: "design" as TabId,
      name: "New Design Case Study",
      desc: "Add visual design projects, metadata, and galleries.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Navigation Tab Bar / Sidebar */}
      <div className="lg:col-span-3 space-y-2 lg:sticky lg:top-28">
        <div className="bg-paper-foundation border border-outline-variant/60 rounded p-2 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded text-xs uppercase tracking-wider font-semibold transition-all duration-300 w-full whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-accent-doodle text-paper-foundation shadow-sm font-bold"
                    : "text-on-surface-variant hover:bg-surface-variant hover:text-ink-sepia"
                }`}
              >
                <span className={isActive ? "text-paper-foundation animate-pulse" : "text-on-surface-variant/70"}>
                  {tab.icon}
                </span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:block p-4 border border-outline-variant/30 rounded bg-surface-variant/40 text-xs text-on-surface-variant italic">
          Currently managing: <br />
          <strong className="text-ink-sepia not-italic mt-1 block">
            {tabs.find((t) => t.id === activeTab)?.name}
          </strong>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="lg:col-span-9">
        <div className="bg-paper-foundation border border-outline-variant rounded p-6 md:p-8 shadow-sm transition-all duration-300">
          <div className="border-b border-outline-variant/30 pb-4 mb-6">
            <h2 className="font-display text-2xl text-ink-sepia">
              {tabs.find((t) => t.id === activeTab)?.name}
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              {tabs.find((t) => t.id === activeTab)?.desc}
            </p>
          </div>

          <div className="animate-[fadeIn_0.3s_ease-out]">
            {activeTab === "settings" && <SiteSettingsForm initial={settings} />}
            {activeTab === "inventory" && <AdminInventory />}
            {activeTab === "writing" && <WritingPostForm />}
            {activeTab === "design" && <DesignProjectForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
