# AcademiCV

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)

Programmatic generator for an academic curriculum vitae in **Microsoft Word (.docx)** and **HTML** format, built with **Node.js** and the [`docx`](https://github.com/dolanmiu/docx) library.

The CV is generated from structured data and a reusable document template, allowing rapid updates, consistent formatting, and easy customization for different academic purposes (PhD applications, research positions, fellowships, conferences, etc.).

## Table of Contents

- [Preview](#preview)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Output](#output)
- [Customization](#customization)
- [Technology Stack](#technology-stack)
- [Why a Programmatic CV?](#why-a-programmatic-cv)
- [License](#license)
- [Author](#author)

## Preview

An example of the generated CV with this template:

<img src="assets/cv_preview.png" alt="Example page of an academic CV generated with this tool" width="650">

------------------------------------------------------------------------

## Requirements

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

------------------------------------------------------------------------

## Getting Started

### Clone the repository

Clone the repository from GitHub:

``` bash
git clone https://github.com/Luca-Sclisizzo/AcademiCV.git
```

Move into the project directory:

``` bash
cd AcademiCV
```

### Install dependencies

``` bash
npm install
```

This uses the `package.json` and `package-lock.json` files (included in the repository) to install the required packages and ensure reproducible dependency versions.

### Generate the CV

Run the generator script:

``` bash
./create_CV.sh
```

A new `.docx` and `.html` file will be generated automatically in the configured output directory.

Running the script again will recreate the documents using the current data and overwrite the previous files with the same name.

> **Note:** If `./create_CV.sh` fails to run due to permission issues, grant execute permission first:
> ``` bash
> chmod +x ./create_CV.sh
> ```

------------------------------------------------------------------------

## Project Structure

``` text
academic_cv_generator/
├── assets/                         # CV preview folder
├── create_CV.sh                    # Script to run both generators (HTML & DOCX)
├── cv_academic_generator_docx.js   # Main generator: document structure and formatting for docx
├── cv_academic_generator_html.js   # Main generator: document structure and formatting for html
├── cv_data.js                      # CV content: personal information, education, research, etc.
├── config.js                       # Output configuration (filename and directory)
├── package.json                    # Project dependencies
├── package-lock.json
└── CV_academic/                    # Output folder, generated CV files
```

------------------------------------------------------------------------

## How It Works

The generator separates **CV content** from **document formatting**.

### `cv_data.js`

Contains all information included in the CV:

- personal information;
- research interests;
- education;
- research experience;
- conference presentations;
- work in progress;
- awards;
- technical skills;
- professional experience;
- languages.

Example structure:

``` javascript
module.exports = {
  personalInfo: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    website: "janedoe.com"
  },
  education: [
    {
      degree: "M.Sc. in Applied Psychology",
      institution: "University of Example",
      year: "2024–2026"
    }
  ],
  // ...research interests, experience, awards, etc.
};
```

Updating the CV only requires modifying this file.

### `cv_academic_generator_docx.js` & `cv_academic_generator_html.js`

Contains the document generation logic:

- page layout;
- typography and styles;
- section formatting;
- reusable formatting functions;
- conversion of structured data into a Word document or HTML page.

Each file generates a separate output for its respective format.

### `config.js`

Controls the output settings:

- output directory;
- separate filenames for the HTML and DOCX files.

Example:

``` javascript
module.exports = {
  outputDirectory: "./CV_academic",
  fileName: "CV_MyName.docx"
};
```

------------------------------------------------------------------------

## Output

The generated documents are saved according to the configuration specified in `config.js`. By default, they are written to the `CV_academic/` directory:

``` text
CV_academic/
├── CV_MyName.docx
└── CV_MyName.html
```

Running the generator again (`./create_CV.sh`) will recreate the documents using the current data and overwrite the previous files with the same name.

------------------------------------------------------------------------

## Customization

To update the CV:

1. Modify the content in `cv_data.js`.
2. Adjust the output settings in `config.js` if needed.
3. Run:

``` bash
./create_CV.sh
```

The updated `.docx` and `.html` files will be generated automatically.

Different CV versions can be created by using alternative data files while keeping the same generator, for example:

``` text
cv_data_phd.js
cv_data_postdoc.js
cv_data_industry.js
```

------------------------------------------------------------------------

## Technology Stack

| Component           | Details                          |
|----------------------|----------------------------------|
| Language             | JavaScript (Node.js)             |
| Document generation   | [`docx`](https://github.com/dolanmiu/docx) (^9.7.1) |
| Output formats        | Microsoft Word (.docx), HTML     |
| Module system         | CommonJS (`require`)             |

------------------------------------------------------------------------

## Why a Programmatic CV?

Maintaining an academic CV as code provides several advantages:

- reproducible formatting across versions;
- fast updates without manually editing Word documents;
- consistent structure and typography;
- easy creation of tailored CV versions;
- version control through Git;
- separation between content and presentation.

This approach is particularly useful for academic careers, where research activities, publications, conferences, grants, and collaborations evolve frequently.

------------------------------------------------------------------------

## License

This project is licensed under the [MIT License](LICENSE).

------------------------------------------------------------------------

## Author

**Luca Sclisizzo**

- Website: [lsclisizzo.com](https://lsclisizzo.com)
- GitHub: [@Luca-Sclisizzo](https://github.com/Luca-Sclisizzo)