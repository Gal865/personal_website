"use client";

import { createContext, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionContextValue = { navigate: (href: string) => void; prefetch: (href: string) => void };

const TransitionContext = createContext<TransitionContextValue | null>(null);
const transitionDuration = 120;

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"entering" | "idle" | "exiting">("entering");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setPhase("entering");
    const enterTimer = window.setTimeout(() => setPhase("idle"), transitionDuration);
    return () => window.clearTimeout(enterTimer);
  }, [pathname]);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    const prefetchTimer = window.setTimeout(() => {
      ["/", "/work", "/gallery"].forEach((route) => router.prefetch(route));
    }, 300);
    return () => window.clearTimeout(prefetchTimer);
  }, [router]);

  const navigate = (href: string) => {
    if (phase === "exiting") return;
    setPhase("exiting");
    timer.current = window.setTimeout(() => {
      const destination = href.startsWith("#") ? `${pathname}${href}` : href;
      router.push(destination);
      timer.current = null;
    }, transitionDuration);
  };

  const prefetch = (href: string) => {
    if (href.startsWith("/")) router.prefetch(href);
  };

  return <TransitionContext.Provider value={{ navigate, prefetch }}><div className={`page-transition page-transition--${phase}`}>{children}</div></TransitionContext.Provider>;
}

export function TransitionLink({ href, onClick, onFocus, onMouseEnter, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const transition = useContext(TransitionContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !transition || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank" || href.startsWith("http") || href.startsWith("mailto:")) return;
    event.preventDefault();
    transition.navigate(href);
  };

  const prefetch = () => transition?.prefetch(href);

  return <a href={href} onClick={handleClick} onFocus={(event) => { onFocus?.(event); prefetch(); }} onMouseEnter={(event) => { onMouseEnter?.(event); prefetch(); }} {...props} />;
}
