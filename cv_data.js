/*
 * Academic CV Data
 *
 * Contains the structured information used to populate the
 * academic curriculum vitae.
 *
 * This file stores personal information, education, research
 * experience, technical skills, presentations, awards, and
 * other professional activities.
 *
 * The data are imported by cv_academic_generator.js, which
 * handles the document structure and formatting.
 *
 * Author: Luca Sclisizzo
 */

module.exports = {
    // ── PERSONAL ──────────────────────────────────────────────
    personal: {
    name: "LUCA SCLISIZZO",
    title: "M.Sc. Student in Applied Psychology",
    email: "luca.sclisizzo@gmail.com",
    phone: "+39 331 572 0791",
    location: "Trieste, Italy",
    github: "https://github.com/Luca-Sclisizzo",
    githubLabel: "github",
    linkedin: "https://www.linkedin.com/in/luca-sclisizzo-814b6a260/",
    linkedinLabel: "LinkedIn",
    orcid: "https://orcid.org/0009-0001-2757-4261",
    orcidLabel: "ORCID"
  },
  // ── RESEARCH INTERESTS ──────────────────────────────────────────────
  researchInterests: [
  "Behavioral Genetics",
  "Biological Psychiatry",
  "Developmental Transcriptomics",
  "Spatio-Temporal Transcriptomics",
  "Bayesian Modeling",
  "Polygenic Risk Scores",
  "Longitudinal Statistical Modeling"
  ],
  // ── EDUCATION ──────────────────────────────────────────────
  education: [
    {
      title: "M.Sc. in Applied Psychology",
      date: "Oct 2024 – Present",
      subtitle: "University of Trieste, Italy",
      bullets: [
        "Current GPA: 29.5/30",
        "Concentration in quantitative and computational methods for psychological research",
        "Coursework in Structural Equation Modeling (SEM), Bayesian modeling, and longitudinal data analysis",
        "Advanced training in probabilistic inference and MCMC methods",
        "EQF Level 7 | 120 ECTS"
      ]
    },
  
    {
      title: "B.Sc. in Psychology (Cum Laude)",
      date: "Aug 2021 – Sep 2024",
      subtitle: "University of Trieste, Italy",
      bullets: [
        "Thesis: “The well-being of the athlete: analysis of the literature, evolutionary models, and predictive models”",
        "EQF Level 6 | 180 ECTS"
      ]
    }
  ],
  // ── RESEARCH EXPERIENCES ──────────────────────────────────────────────
  researchExperience: [
    {
      title: "Research Assistant",
      date: "Aug – Nov 2025",
      subtitle:
        "Department of Psychiatry, Washington University School of Medicine, St. Louis, USA",
  
      description: [
        "Research conducted in the Behavior, Environment, and Genetics Laboratory (PI: Prof. Emma C. Johnson), focusing on behavioral genetics and biological psychiatry applied to psychosis spectrum disorders."
      ],
  
      subsections: [
        {
          title: "Genetics & Genomics",
          bullets: [
            "Applied multivariate genetic modeling (GenomicSEM) for complex trait decomposition and cross-trait genetic architecture analysis",
            "Post-GWAS functional annotation using MAGMA and stratified LD score regression (S-LDSC)",
            "Characterized gene expression trajectories across human brain developmental stages from high-throughput RNA-seq data",
            "Computed Polygenic Risk Scores via Bayesian shrinkage methods (SBayesRC)"
          ]
        },
  
        {
          title: "Longitudinal Modeling",
          bullets: [
            "Implemented longitudinal hierarchical models to examine executive functioning trajectories across development",
            "Survival analysis (Cox proportional hazards) applied to the COGA longitudinal cohort"
          ]
        },
  
        {
          title: "Computational Methods",
          bullets: [
            "Proficient in deploying and managing genomic pipelines on HPC clusters (SLURM, job arrays, parallel execution)",
            "Statistical programming in R and Python, using Bioconductor and GWASlab for genomic analyses"
          ]
        }
      ]
    }
  ],
  // ── TECHNICAL SKILLS ──────────────────────────────────────────────
  technicalSkills: [
    {
      category: "Statistical Software",
      skills: "R, Python, Stan/cmdstanr (Bayesian MCMC)",
      highlight: true
    },
    {
      category: "Genomics Tools",
      skills: "plink, GenomicSEM, MAGMA, stratified-LDSC, FUMA, SBayesRC, DESeq2, edgeR"
    },
    {
      category: "Statistical Methods",
      skills: "Bayesian hierarchical models, SEM, longitudinal mixed models, survival analysis (Cox), RNA-seq analysis, Polygenic Risk Scores, GWAS downstream analyses"
    },
    {
      category: "Computing",
      skills: "HPC cluster systems (SLURM), Linux/bash scripting, Git"
    }
  ],
  // ── CONFERENCE PRESENTATIONS ──────────────────────────────────────────────
  conferencePresentations: [
    {
      title: "Behavior Genetics Association (BGA) Annual Meeting",
      date: "Jun 2026",
      location: "Amsterdam, Netherlands",
  
      role: {
        label: "Role",
        value: "Symposium Chair & Speaker",
        highlight: true
      },
  
      symposium: {
        label: "Symposium",
        value: "Genes and Time: A Dive Into the Temporal Dynamics of Human Phenotypes"
      },
  
      discussant: {
        label: "Discussant",
        value: "Michael C. Neale"
      },
  
      presentation: {
        type: "Oral Presentation",
        title:
          "Dissecting the spectrum of psychosis: leveraging time and dimensionality to explore multiple, functionally separable sources of genetic risk."
      },
  
      authors: {
        name: "Sclisizzo L",
        coauthors:
          "Baranger DAA, Clapp Sullivan ML, Hatoum AS, Burnett C, Del Giudice M, Johnson EC.",
        affiliations:
          "Department of Life Sciences, University of Trieste, Italy; Department of Psychiatry, Washington University School of Medicine, St. Louis, Missouri, USA;	Department of Pharmacology and Toxicology, Medical College of Wisconsin, Milwaukee, Wisconsin, USA."
      }
    }
  ],
  // ── ONGOING PROJECTS ──────────────────────────────────────────────
  workInProgress: [
    {
      title:
        "Parsing the Functional Heterogeneity of the Psychosis Spectrum: A Clinically Informed Application of Genomic Structural Equation Modeling",
      status: "In preparation",
  
      subtitle:
        "Washington University School of Medicine, St. Louis, USA · University of Trieste, Italy",
  
      role: {
        label: "Role",
        value: "First author",
        highlight: true
      },
  
      description:
        "This manuscript investigates the dimensional structure of the psychosis continuum, aiming to use genetic data to disentangle the sources of heterogeneity across the psychotic disorders. The project draws on post-GWAS analytical frameworks and functional annotations to characterize transdiagnostic liability dimensions."
    },
  
    {
      title: "Longitudinal PheWAS in ABCD",
      status: "In preparation",
  
      subtitle:
        "Washington University School of Medicine, St. Louis, USA · University of Trieste, Italy",
  
      role: {
        label: "Role",
        value: "Co-author",
        highlight: true
      },
  
      description:
        "This work extends the Phenome-Wide Association Study (PheWAS) framework to a longitudinal setting, leveraging the ABCD (Adolescent Brain Cognitive Development) dataset. The project investigates the relationships between psychosis dimensionality at the genetic level and its phenotypic associations and developmental trajectories across childhood, and examines the degree of change and stability of genetic liability over time."
    }
  ],
  // ── AWARDS ──────────────────────────────────────────────
  awards: [
    {
      title: "BGA Travel Award",
      date: "2026",
      subtitle: "Behavior Genetics Association",
      description:
        "Travel award supporting attendance at the Behavior Genetics Association Annual Meeting in Amsterdam."
    }
  ],
  // ── CONFERENCES & WORKSHOPS ──────────────────────────────────────────────
  conferencesTraining: [
    {
      title: "Behavior Genetics Association Annual Meeting",
      date: "Jun 2026",
      subtitle: "Amsterdam, Netherlands",
      description:
        "Attended the annual international conference of the Behavior Genetics Association (BGA), featuring the latest research in behavioral genetics, statistical genetics, and genomics."
    },
  
    {
      title: "Evolutionary Psychiatry and Genetics Conference",
      date: "Jul 2024",
      subtitle: "Ettore Majorana Foundation, Erice, Italy",
      description:
        "Intensive course “Towards a new science of mental disorders: bridging evolution and genetics”. Interdisciplinary forum connecting evolutionary psychiatry, psychopathology, and recent findings in behavioral genetics and genomics."
    },
  
    {
      title: "21st European Conference on Personality (ECP21)",
      date: "Aug 2024",
      subtitle: "Berlin, Germany",
      description:
        "Biennial conference exploring the full spectrum of personality psychology, with emphasis on innovative assessment methods leveraging mobile sensing and AI technologies."
    }
  ],
  // ── OTHER WORKING EXPERIENCES ──────────────────────────────────────────────
  otherProfessionalExperience: [
    {
      title: "International Racing Service – Biathlon",
      date: "Nov 2023 – Mar 2025",
      subtitle: "Salomon S.A.S., Annecy, France",
      bullets: [
        "Provided high-performance technical support to multiple national biathlon teams at international competitions",
        "Collaborated with the R&D department to contribute product feedback and improve high-performance sport equipment",
        "Operated in demanding, high-pressure international environments requiring cultural adaptability and logistical resilience"
      ]
    },
  
    {
      title: "Competitive Alpine Skier – Italian National Team",
      date: "Oct 2019 – Oct 2022",
      subtitle:
        "Army’s Sport Center (Centro Sportivo Esercito), Courmayeur, Italy",
      bullets: [
        "Represented Italy in national and international alpine ski competitions",
        "3rd place finish at the World Championships; multiple European Cup podiums",
        "Collaborated with multidisciplinary performance teams (coaches, physiotherapists, sports psychologists)",
        "Demonstrated sustained high performance under competitive pressure and elite-level self-regulation"
      ]
    },
  
    {
      title: "Psychology Trainee – Sport Psychology Unit",
      date: "Nov 2022 – May 2023",
      subtitle:
        "FIGC (Italian Football Federation), Regional Center, Palmanova, Italy",
      bullets: [
        "Analyzed coach-athlete communication dynamics in youth development contexts (children and adolescents)",
        "Designed and delivered emotional awareness and regulation training programs for coaches and athletes",
        "Facilitated goal-setting processes tailored to individual and team performance objectives",
        "Led structured activities aimed at improving teamwork and team cohesion"
      ]
    }
  ],
  // ── LANGUAGE SKILLS ──────────────────────────────────────────────
  languages: [
    {
      language: "Italian",
      proficiency: "Native",
      highlight: true
    },
    {
      language: "English",
      proficiency:
        "Proficient (C1) – reading, writing, spoken production and interaction"
    },
    {
      language: "French",
      proficiency: "Basic (A1–A2)"
    }
  ],
};
