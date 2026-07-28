"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "./PageTransition";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav shell" aria-label="Main navigation">
      <TransitionLink className="wordmark" href="/" onClick={closeMenu} aria-label="Home">Gal Nissan<span>.</span></TransitionLink>
      <div className={menuOpen ? "nav-links is-open" : "nav-links"}>
        {pathname === "/work" ? <span className="nav-current" aria-current="page">Work</span> : <TransitionLink href="/work" onClick={closeMenu}>Work</TransitionLink>}
        {pathname === "/gallery" ? <span className="nav-current" aria-current="page">Gallery</span> : <TransitionLink href="/gallery" onClick={closeMenu}>Gallery</TransitionLink>}
      </div>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
        <i /><i />
      </button>
    </nav>
  );
}
