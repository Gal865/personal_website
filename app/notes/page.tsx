const notes = [
  {
    title: "Why Essence?",
    content: `Many people use dating apps like a game. Some call it "Hot or Not." Others fill their profiles with meaningless prompts and a shirtless photo, chasing validation instead of connection. But what about the people who don't want to waste time on empty conversations and validation? That's why I built Essence.

Modern dating apps already provide thoughtful features like prompts and voice notes, yet they're often overshadowed by profile photos. People swipe as if a portrait can tell them everything they need to know. It can't. Building matches primarily on appearance creates two problems:

1. You keep searching for someone slightly better. Conversations end before they begin, people ghost each other, and everyone is left wondering why they weren't enough.
2. Your matches become little more than dopamine hits without any real foundation. Generic prompts lead to generic conversations that begin the same way and end the same way.

"So Essence is Tinder without photos?"
Not at all. No one expects you to meet someone you've never seen.

Instead, Essence delays selfies until after you've matched and discovered that you genuinely enjoy talking to each other. Matching is based on thoughtful prompt responses and photos of everything except yourself, offering a small peek into how you see the world. Without portraits competing for attention, your personality has room to come first. When photos are finally revealed, they're no longer the reason you matched. They're simply another part of getting to know someone.`,
  }
];

export default function NotesPage() {
  return (
    <main className="notes-page shell">
      <h1>
        <span className="thought-quote-mark">"</span>Happiness is something you choose.<span className="thought-quote-mark">"</span>
        <span className="thought-source">(The Courage to Be Disliked)</span>
      </h1>
      <p>For those who want to know me better</p>
      <section className="thought-notes" aria-label="Thoughts">
        {notes.map((note) => (
          <details className="thought-note" key={note.title}>
            <summary>
              <span>{note.title}</span>
              <span className="thought-note-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </summary>
            <div className="thought-note-content">
              <p>{note.content}</p>
            </div>
          </details>
        ))}
      </section>
    </main>
  );
}
