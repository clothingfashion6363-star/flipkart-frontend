"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { HomeIcon, CategoriesIcon, MallIcon, HelpIcon, ProfileIcon } from "./Icons";

export default function BottomNav() {
  const { activeTab, handleTabChange } = useAppContext();

  const tabs = [
    { id: "home", label: "Home", icon: HomeIcon },
    { id: "categories", label: "Categories", icon: CategoriesIcon },
    { id: "mall", label: "Mall", icon: MallIcon },
    { id: "help", label: "Help", icon: HelpIcon },
    { id: "account", label: "Account", icon: ProfileIcon },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`nav-tab ${isActive ? "active" : ""}`}
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full transition-colors">
               <Icon filled={isActive} className="w-5 h-5" />
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
