const experience = [
  {
    company: "Navy Federal Credit Union",
    role: "Junior Data Analyst",
    dates: "Current",
    current: true,
    highlights: [
      "Create and configure Splunk indexes to organize log data by application, environment, and retention requirements.",
      "Investigate application outages by analyzing Splunk logs and troubleshooting services, processes, and connectivity on Linux servers.",
      "Resolve missing and delayed log issues by tracing data through the Splunk ingestion pipeline and confirming successful indexing.",
    ],
  },
  {
    company: "UnitedHealth Group",
    role: "Junior Data Analyst",
    dates: "May 2024 – Aug 2025",
    highlights: [
      "Conducted terabyte-scale log analysis to identify abnormal ingestion patterns and troubleshoot data quality issues across enterprise sources.",
      "Identified and removed redundant Splunk sourcetypes, reducing unnecessary data ingestion and associated storage costs.",
      "Resolved onboarding blockers for 12+ architects by correcting Splunk inputs.conf and props.conf configurations across HEC and Syslog."
    ],
  },
  {
    company: "Bank of Montreal",
    role: "SOC Analyst Intern",
    dates: "May 2024 – Oct 2024",
    highlights: [
      "Centralized vulnerability data from multiple Mac OS versions into a single, dynamic Excel dashboard for real‑time visibility.",
      "Improved prioritization by integrating Qualys PoC results to rank vulnerabilities by severity and business impact.",
      "Accelerated remediation by clearly defining next‑step actions, reducing resolution timelines and improving security posture.",
    ],
  },
];

export default function WorkPage() {
  return (
    <main className="work-page shell">
      <header className="work-page-intro reveal">
        <h1>Building with<br /> <em>purpose</em><span className="hero-period">.</span></h1>
        <br />
        <p>I like finding the small details that make everything click. 
          <br />Each project is another chance to learn and improve.</p>
      </header>

      <section className="experience-section" aria-labelledby="experience-heading">
        <div className="experience-heading">
        </div>

        <div className="experience-list">
          {experience.map((job) => (
            <article className="experience-item" key={`${job.company}-${job.role}`}>
              <div className={`experience-dates${job.current ? " experience-current" : ""}`}>{job.dates}</div>
              <div className="experience-details">
                <div className="experience-title-row">
                  <div>
                    <h3>{job.company}</h3>
                    <p className="experience-role">{job.role}</p>
                  </div>
                </div>
                <ul>
                  {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
