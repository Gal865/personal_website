"use client";

import Image from "next/image";
import { TransitionLink } from "./components/PageTransition";
import essenceScreenshot from "../assets/pictures/Essence.webp";

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <section className="hero shell" id="top">
        <div className="hero-copy">
          <h1 className="hero-title reveal delay-1">Part builder<span className="hero-punctuation">,</span> part explorer<span className="hero-punctuation">,</span><br />
            <span className="hero-last-line">living with <em>intention</em><span className="hero-period">.</span></span>
          </h1>
        </div>
      </section>

      <section className="work-section shell" id="work">
        <div className="section-heading work-heading">
          <p className="eyebrow">Current Project</p>
          <p className="section-note">Building what I believe in.</p>
        </div>

        <article className="project featured" id="essence">
          <div className="project-visual essence-visual">
            <Image
              className="essence-screenshot"
              src={essenceScreenshot}
              alt="Essence app coming soon screen"
              loading="lazy"
            />
            <div className="orb orb-one" /><div className="orb orb-two" />
          </div>
          <div className="project-copy">
            <h2 className="essence-title">Essence</h2>
            <p>Rethinking online dating with one simple principle: connection over validation.</p>
            <div className="tags">
              <div className="tag-row"><span className="tag--expo">Expo</span><span className="tag--react-native">React Native</span><span className="tag--supabase">Supabase</span></div>
              <div className="tag-row"><span className="tag--aws">AWS</span><span className="tag--ux-research">UX Research</span><span className="tag--typescript">TypeScript</span></div>
            </div>
          </div>
        </article>

      </section>

    </main>
  );
}
