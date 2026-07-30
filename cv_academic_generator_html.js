const fs = require("fs");
const path = require("path");
const config = require("./config");   // same configuration file
const cv = require("./cv_data");       // same data file

if (!fs.existsSync(config.outputDirectory)) {
  fs.mkdirSync(config.outputDirectory, { recursive: true });
}

// ============================================================
// COLORI (stessi usati nella versione DOCX)
// ============================================================
const BLUE = "#1F4E79";
const DARK = "#1a1a1a";
const GRAY = "#555555";
const LINE = "#CCCCCC";

// ============================================================
// UTILS DI ESCAPE (for safety)
// ============================================================
function esc(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ============================================================
// HTML COMPONENTS
// ============================================================
function sectionHeader(text) {
  return `<h2 class="section-header">${esc(text).toUpperCase()}</h2>`;
}

function entryTitle(title, dateRange) {
  return `
    <div class="entry-title">
      <span class="title">${esc(title)}</span>
      <span class="date">${esc(dateRange)}</span>
    </div>`;
}

function entrySubtitle(text) {
  return `<div class="entry-subtitle">${esc(text)}</div>`;
}

function bodyText(text) {
  return `<p class="body-text">${esc(text)}</p>`;
}

function subheading(text) {
  return `<div class="subheading">${esc(text)}</div>`;
}

function bulletList(items) {
  if (!items || !items.length) return "";
  return `<ul class="bullets">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

function kvLine(key, value, highlight = false) {
  return `
    <div class="kv-line${highlight ? " highlight" : ""}">
      <span class="key">${esc(key)}</span>
      <span class="value">${esc(value)}</span>
    </div>`;
}

function link(href, label) {
  return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
}

// ============================================================
// CV SECTIONS
// ============================================================
function buildHeader() {
  return `
    <header class="cv-header">
      <h1>${esc(cv.personal.name)}</h1>
      <div class="subtitle">${esc(cv.personal.title)}</div>
      <div class="contact-line">
        ${esc(cv.personal.email)} &nbsp;|&nbsp;
        ${esc(cv.personal.phone)} &nbsp;|&nbsp;
        ${esc(cv.personal.location)} &nbsp;|&nbsp;
        ${link(cv.personal.linkedin, cv.personal.linkedinLabel)} &nbsp;|&nbsp;
        ${link(cv.personal.github, cv.personal.githubLabel)} &nbsp;|&nbsp;
        ${link(cv.personal.orcid, cv.personal.orcidLabel)}
      </div>
    </header>`;
}

function buildResearchInterests() {
  return `
    <section>
      ${sectionHeader("Research Interests")}
      <p class="body-text">${cv.researchInterests.map(esc).join(" &middot; ")}</p>
    </section>`;
}

function buildEducation() {
  return `
    <section>
      ${sectionHeader("Education")}
      ${cv.education.map(edu => `
        ${entryTitle(edu.title, edu.date)}
        ${entrySubtitle(edu.subtitle)}
        ${bulletList(edu.bullets)}
      `).join("")}
    </section>`;
}

function buildResearchExperience() {
  return `
    <section>
      ${sectionHeader("Research Experience")}
      ${cv.researchExperience.map(exp => `
        ${entryTitle(exp.title, exp.date)}
        ${entrySubtitle(exp.subtitle)}
        ${exp.description.map(bodyText).join("")}
        ${exp.subsections.map(sec => `
          ${subheading(sec.title)}
          ${bulletList(sec.bullets)}
        `).join("")}
      `).join("")}
    </section>`;
}

function buildTechnicalSkills() {
  return `
    <section>
      ${sectionHeader("Technical Skills")}
      ${cv.technicalSkills.map(skill =>
        kvLine(`${skill.category}:`, skill.skills, skill.highlight)
      ).join("")}
    </section>`;
}

function buildConferencePresentations() {
  return `
    <section>
      ${sectionHeader("Conference Presentations")}
      ${cv.conferencePresentations.map(conf => `
        ${entryTitle(conf.title, conf.date)}
        ${entrySubtitle(conf.location)}
        ${kvLine(`${conf.role.label}:`, conf.role.value, conf.role.highlight)}
        ${kvLine(`${conf.symposium.label}:`, conf.symposium.value)}
        ${kvLine(`${conf.discussant.label}:`, conf.discussant.value)}
        <div class="presentation-type">${esc(conf.presentation.type)}:</div>
        <div class="presentation-title">${esc(conf.presentation.title)}</div>
        <div class="authors">
          <span class="authors-name">${esc(conf.authors.name)}</span>, ${esc(conf.authors.coauthors)}
          <span class="affiliations">${esc(conf.authors.affiliations)}</span>
        </div>
      `).join("")}
    </section>`;
}

function buildWorkInProgress() {
  return `
    <section>
      ${sectionHeader("Ongoing Projects")}
      ${cv.workInProgress.map(project => `
        ${entryTitle(project.title, project.status)}
        ${entrySubtitle(project.subtitle)}
        ${kvLine(`${project.role.label}:`, project.role.value, project.role.highlight)}
        ${bodyText(project.description)}
      `).join("")}
    </section>`;
}

function buildAwards() {
  return `
    <section>
      ${sectionHeader("Awards")}
      ${cv.awards.map(award => `
        ${entryTitle(award.title, award.date)}
        ${entrySubtitle(award.subtitle)}
        ${bodyText(award.description)}
      `).join("")}
    </section>`;
}

function buildConferencesTraining() {
  return `
    <section>
      ${sectionHeader("Conferences and Workshops")}
      ${cv.conferencesTraining.map(event => `
        ${entryTitle(event.title, event.date)}
        ${entrySubtitle(event.subtitle)}
        ${bodyText(event.description)}
      `).join("")}
    </section>`;
}

function buildOtherProfessionalExperience() {
  return `
    <section>
      ${sectionHeader("Other Professional Experience")}
      ${cv.otherProfessionalExperience.map(exp => `
        ${entryTitle(exp.title, exp.date)}
        ${entrySubtitle(exp.subtitle)}
        ${bulletList(exp.bullets)}
      `).join("")}
    </section>`;
}

function buildLanguages() {
  return `
    <section>
      ${sectionHeader("Languages")}
      ${cv.languages.map(lang =>
        kvLine(`${lang.language}:`, lang.proficiency, lang.highlight)
      ).join("")}
    </section>`;
}

function buildFooter() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  return `
    <footer class="cv-footer">
      Last updated ${esc(lastUpdated)}
    </footer>`;
}

// ============================================================
// CSS
// ============================================================
const css = `
  :root {
    --blue: ${BLUE};
    --dark: ${DARK};
    --gray: ${GRAY};
    --line: ${LINE};
  }
  * { box-sizing: border-box; }
  body {
    font-family: "Calibri", "Segoe UI", Arial, sans-serif;
    color: var(--dark);
    background: #ffffff;
    max-width: 850px;
    margin: 0 auto;
    padding: 40px 30px 60px;
    line-height: 1.45;
  }
  .cv-header { text-align: center; margin-bottom: 20px; }
  .cv-header h1 {
    color: var(--blue);
    font-size: 28pt;
    margin: 0 0 6px;
  }
  .cv-header .subtitle {
    color: var(--gray);
    font-style: italic;
    font-size: 11pt;
    margin-bottom: 8px;
  }
  .cv-header .contact-line {
    color: var(--gray);
    font-size: 10pt;
  }
  .cv-header .contact-line a {
    color: var(--blue);
    text-decoration: underline;
  }
  section { margin-bottom: 16px; }
  .section-header {
    color: var(--blue);
    font-size: 12pt;
    font-weight: bold;
    border-bottom: 1.5px solid var(--blue);
    padding-bottom: 4px;
    margin: 22px 0 8px;
    letter-spacing: 0.5px;
  }
  .entry-title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 14px;
  }
  .entry-title .title {
    font-weight: bold;
    font-size: 11pt;
    color: var(--dark);
  }
  .entry-title .date {
    font-style: italic;
    font-size: 10pt;
    color: var(--gray);
    white-space: nowrap;
    margin-left: 12px;
  }
  .entry-subtitle {
    font-style: italic;
    font-size: 10pt;
    color: var(--gray);
    margin: 2px 0 4px;
  }
  .body-text {
    font-size: 10pt;
    margin: 4px 0;
  }
  .subheading {
    font-weight: bold;
    font-size: 10pt;
    margin: 8px 0 3px;
  }
  ul.bullets {
    margin: 2px 0 4px;
    padding-left: 20px;
  }
  ul.bullets li {
    font-size: 10pt;
    margin-bottom: 3px;
  }
  .kv-line {
    font-size: 10pt;
    margin: 3px 0;
  }
  .kv-line .key { font-weight: bold; margin-right: 4px; }
  .kv-line.highlight .value { color: var(--blue); font-weight: 600; }
  .presentation-type {
    font-weight: bold;
    font-size: 10pt;
    margin-top: 6px;
  }
  .presentation-title {
    font-style: italic;
    font-size: 10pt;
    margin: 2px 0 6px;
  }
  .authors {
    font-size: 10pt;
    margin-bottom: 8px;
  }
  .authors-name { font-weight: bold; }
  .authors .affiliations { color: var(--gray); font-style: italic; }
  .cv-footer {
    text-align: center;
    font-size: 8pt;
    font-style: italic;
    color: var(--gray);
    border-top: 1px solid var(--line);
    margin-top: 30px;
    padding-top: 8px;
  }
  @media print {
    body { padding: 0; max-width: 100%; }
  }
`;

// ============================================================
// DOCUMENT ASSEMBLY
// ============================================================
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${esc(cv.personal.name)} — CV</title>
<style>${css}</style>
</head>
<body>
  ${buildHeader()}
  ${buildResearchInterests()}
  ${buildEducation()}
  ${buildResearchExperience()}
  ${buildTechnicalSkills()}
  ${buildConferencePresentations()}
  ${buildWorkInProgress()}
  ${buildAwards()}
  ${buildConferencesTraining()}
  ${buildOtherProfessionalExperience()}
  ${buildLanguages()}
  ${buildFooter()}
</body>
</html>`;

// ============================================================
// EXPORT
// ============================================================
// Use config.outputPathHtml as a saving path
const outputPath = config.outputPathHtml

fs.writeFileSync(outputPath, html, "utf8");
console.log(`Creating the HTML CV...`)
console.log(` `);
console.log(`Done! CV generated @ ${outputPath}`);
console.log(` `);
console.log(`Checking the hyperlinks (if specified):`);
console.log(cv.personal.linkedinLabel);
console.log(cv.personal.linkedin);
console.log(cv.personal.githubLabel);
console.log(cv.personal.github);
console.log(cv.personal.orcidLabel);
console.log(cv.personal.orcid);
