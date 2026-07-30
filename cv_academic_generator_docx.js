/*
 * Academic CV Generator
 *
 * Generates a Microsoft Word (.docx) academic curriculum vitae
 * using Node.js and the docx library.
 *
 * The document structure and formatting are defined in this file,
 * while CV information is loaded from cv_data.js and output
 * configuration is handled by config.js.
 *
 * Author: Luca Sclisizzo
 */

// ============================================================
// IMPORTS
// ============================================================
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  LevelFormat, TabStopType, ExternalHyperlink, Footer, PageNumber
} = require('docx');

const fs = require("fs");
const config = require("./config"); // Loading the config file
const cv = require("./cv_data"); // Loading the cv data file

if (!fs.existsSync(config.outputDirectory)) { // create the output directory if it does not exist
  fs.mkdirSync(config.outputDirectory, { recursive: true });
}

// ============================================================
// DOCUMENT FUNCTIONS & SETUP
// ============================================================
const BLUE = "1F4E79";
const DARK = "1a1a1a";
const GRAY = "555555";

function sectionHeader(text) {
  return new Paragraph({
    spacing: { before: 320, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 4 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 24, color: BLUE, font: "Calibri" })]
  });
}

function entryTitle(title, dateRange) {
  return new Paragraph({
    spacing: { before: 220, after: 50 },
    tabStops: [{ type: TabStopType.RIGHT, position: 9026 }],
    children: [
      new TextRun({ text: title, bold: true, size: 22, font: "Calibri", color: DARK }),
      new TextRun({ text: "\t" + dateRange, size: 20, font: "Calibri", color: GRAY, italics: true }),
    ]
  });
}

function entrySubtitle(text) {
  return new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text, italics: true, size: 20, font: "Calibri", color: GRAY })]
  });
}

function bodyText(text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 20, font: "Calibri", color: DARK })]
  });
}

function subheading(text) {
  return new Paragraph({
    spacing: { before: 100, after: 50 },
    children: [new TextRun({ text, bold: true, size: 20, font: "Calibri", color: DARK })]
  });
}

function bulletItem(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 0, after: 50 },
    children: [new TextRun({ text, size: 20, font: "Calibri", color: DARK })]
  });
}

function kvLine(key, value, firstItem = false) {
  return new Paragraph({
    spacing: { before: firstItem ? 80 : 0, after: 60 },
    children: [
      new TextRun({ text: key + "  ", bold: true, size: 20, font: "Calibri", color: DARK }),
      new TextRun({ text: value, size: 20, font: "Calibri", color: DARK }),
    ]
  });
}

function spacer(size = 80) {
  return new Paragraph({ spacing: { before: 0, after: size }, children: [new TextRun("")] });
}

// ============================================================
// DOCUMENT CREATION
// ============================================================
const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "\u2013",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 480, hanging: 240 } } }
      }]
    }]
  },
  styles: { default: { document: { run: { font: "Calibri", size: 20 } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1080, right: 1134, bottom: 1080, left: 1134 }
      }
    },
    footers: {
    default: new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
        tabStops: [{ type: TabStopType.RIGHT, position: 9026 }],
        children: [
          new TextRun({
            text: `Last updated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`,
            size: 16,
            font: "Calibri",
            color: GRAY,
            italics: true
          }),
          new TextRun({
            text: "\t",
            size: 16,
            font: "Calibri",
            color: GRAY
          }),
          new TextRun({
            children: ["Page ", PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES],
            size: 16,
            font: "Calibri",
            color: GRAY,
            italics: true
            })
          ]
        })
      ]
    })
  },
    children: [

      // ── HEADER ──────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [
          new TextRun({
            text: cv.personal.name,
            bold: true,
            size: 56,
            font: "Calibri",
            color: BLUE
          })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [
          new TextRun({
            text: cv.personal.title,
            size: 22,
            font: "Calibri",
            color: GRAY,
            italics: true
          })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 120 },
        children: [
          new TextRun({
            text:
              `${cv.personal.email}  |  ${cv.personal.phone}  |  ${cv.personal.location}  |  `,
            size: 20,
            font: "Calibri",
            color: GRAY
          }),
      
          new ExternalHyperlink({
            link: cv.personal.linkedin,
            children: [
              new TextRun({
                text: cv.personal.linkedinLabel,
                size: 20,
                font: "Calibri",
                color: BLUE,
                underline: { type: "single" }
              })
            ]
          }),
      
          new TextRun({
            text: "  |  ",
            size: 20,
            font: "Calibri",
            color: GRAY
          }),
      
          new ExternalHyperlink({
            link: cv.personal.github,
            children: [
              new TextRun({
                text: cv.personal.githubLabel,
                size: 20,
                font: "Calibri",
                color: BLUE,
                underline: { type: "single" }
              })
            ]
          }),
      
          new TextRun({
            text: "  |  ",
            size: 20,
            font: "Calibri",
            color: GRAY
          }),
      
          new ExternalHyperlink({
            link: cv.personal.orcid,
            children: [
              new TextRun({
                text: cv.personal.orcidLabel,
                size: 20,
                font: "Calibri",
                color: BLUE,
                underline: { type: "single" }
              })
            ]
          })
        ]
      }),
      spacer(120),

      // ── RESEARCH INTERESTS ──────────────────────────────────
      sectionHeader("Research Interests"),
      new Paragraph({
        spacing: { before: 80, after: 60 },
        children: [
          new TextRun({
            text: cv.researchInterests.join("  ·  "),
            size: 20,
            font: "Calibri",
            color: DARK
          })
        ]
      }),
      spacer(),
      
      // ── EDUCATION ───────────────────────────────────────────
      sectionHeader("Education"),
      ...cv.education.flatMap(edu => [
        entryTitle(edu.title, edu.date),
        entrySubtitle(edu.subtitle),
        ...edu.bullets.map(bullet => bulletItem(bullet)),
        spacer()
      ]),

      // ── RESEARCH EXPERIENCE ─────────────────────────────────
      sectionHeader("Research Experience"),
      ...cv.researchExperience.flatMap(exp => [
        entryTitle(exp.title, exp.date),
        entrySubtitle(exp.subtitle),
        ...exp.description.map(text =>
          bodyText(text)
        ),
        ...exp.subsections.flatMap(section => [
          subheading(section.title),
          ...section.bullets.map(item =>
            bulletItem(item)
          )
        ]),
        spacer()
      ]),
      
      // ── TECHNICAL SKILLS ────────────────────────────────────
      sectionHeader("Technical Skills"),
      ...cv.technicalSkills.map(skill =>
        kvLine(
          `${skill.category}:`,
          skill.skills,
          skill.highlight || false
        )
      ),
      spacer(),
      
      // ── CONFERENCE PRESENTATIONS ────────────────────────────
      sectionHeader("Conference Presentations"),
      ...cv.conferencePresentations.flatMap(conf => [
        entryTitle(conf.title, conf.date),
        entrySubtitle(conf.location),
        kvLine(
          `${conf.role.label}:`,
          conf.role.value,
          conf.role.highlight
        ),
        kvLine(
          `${conf.symposium.label}:`,
          conf.symposium.value
        ),
        kvLine(
          `${conf.discussant.label}:`,
          conf.discussant.value
        ),
        new Paragraph({
          spacing: { before: 80, after: 50 },
          children: [
            new TextRun({
              text: `${conf.presentation.type}:`,
              bold: true,
              size: 20,
              font: "Calibri",
              color: DARK
            })
          ]
        }),
        new Paragraph({
          spacing: { before: 0, after: 50 },
          children: [
            new TextRun({
              text: conf.presentation.title,
              size: 20,
              font: "Calibri",
              color: DARK,
              italics: true
            })
          ]
        }),
        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            new TextRun({
              text: conf.authors.name,
              bold: true,
              size: 20,
              font: "Calibri",
              color: DARK
            }),
            new TextRun({
              text: `, ${conf.authors.coauthors}`,
              size: 20,
              font: "Calibri",
              color: DARK
            }),
            new TextRun({
              text: ` ${conf.authors.affiliations}`,
              size: 20,
              font: "Calibri",
              color: GRAY,
              italics: true
            })
          ]
        }),
        spacer()
      ]),

      // ── ONGOING PROJECTS ────────────────────────────────────
      sectionHeader("Ongoing Projects"),
      ...cv.workInProgress.flatMap(project => [
        entryTitle(project.title, project.status),
        entrySubtitle(project.subtitle),
        kvLine(
          `${project.role.label}:`,
          project.role.value,
          project.role.highlight
        ),
        bodyText(project.description),
        spacer()
      ]),      
      
      // ── AWARDS ──────────────────────────────
      sectionHeader("Awards"),
      ...cv.awards.flatMap(award => [
        entryTitle(award.title, award.date),
        entrySubtitle(award.subtitle),
        bodyText(award.description),
        spacer()
      ]),
      
      // ── CONFERENCES AND TRAINING ──────────────────────────────
      sectionHeader("Conferences and Workshops"),
      ...cv.conferencesTraining.flatMap(event => [
        entryTitle(event.title, event.date),
        entrySubtitle(event.subtitle),
        bodyText(event.description),
        spacer()
      ]),

      // ── OTHER PROFESSIONAL EXPERIENCE ───────────────────────
      sectionHeader("Other Professional Experience"),
      ...cv.otherProfessionalExperience.flatMap(exp => [
        entryTitle(exp.title, exp.date),
        entrySubtitle(exp.subtitle),
        
        ...exp.bullets.map(item =>
          bulletItem(item)
        ),
        spacer()
      ]),

      // ── LANGUAGES ───────────────────────────────────────────
      sectionHeader("Languages"),
      ...cv.languages.map(lang =>
        kvLine(
          `${lang.language}:`,
          lang.proficiency,
          lang.highlight || false
        )
      ),
          ]
  }]
});

// ============================================================
// EXPORT
// ============================================================
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(
    config.outputPathDocx,
    buffer
  );
  console.log(`Creating the DOCX CV...`)
  console.log(`Done! CV generated @ ${config.outputPathDocx}`);
  console.log(` `);
  console.log(`Checking the hyperlinks (if specified):`)
  // Linkedin
  console.log(cv.personal.linkedinLabel);
  console.log(cv.personal.linkedin);
  // github
  console.log(cv.personal.githubLabel);
  console.log(cv.personal.github);
  // ORDIC
  console.log(cv.personal.orcidLabel);
  console.log(cv.personal.orcid);
});
