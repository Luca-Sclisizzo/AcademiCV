/*
 * Configuration file for the Academic CV Generator.
 *
 * Defines the output directory and filename used to save
 * the generated Microsoft Word document.
 */

const path = require("path");

module.exports = {
  outputDirectory: "./CV_academic",       // Output folder, change if needed
  fileNameDocx: "CV_Sclisizzo.docx",      // Output filename (Word)
  fileNameHtml: "CV_Sclisizzo.html",      // Output filename (HTML)

  get outputPathDocx() {
    return path.join(this.outputDirectory, this.fileNameDocx);
  },

  get outputPathHtml() {
    return path.join(this.outputDirectory, this.fileNameHtml);
  }
};
