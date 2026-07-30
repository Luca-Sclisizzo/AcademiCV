/*
 * Configuration file for the Academic CV Generator.
 *
 * Defines the output directory and filename used to save
 * the generated Microsoft Word document and the HTML.
 */

const path = require("path");

module.exports = {
  outputDirectory: "./CV_academic",                               // Output folder - MODIFY!
  fileNameDocx: "CV_Sclisizzo.docx",                              // Output filename (Word) - MODIFY!
  fileNameHtml: "CV_Sclisizzo.html",                              // Output filename (HTML) - MODIFY!
  quarto_folder: '/Users/lucasclisizzo/lsclisizzo.com/files/',     // Quarto folder (if needed) - MODIFY!

  get outputPathDocx() {
    return path.join(this.outputDirectory, this.fileNameDocx);
  },

  get outputPathHtml() {
    return path.join(this.outputDirectory, this.fileNameHtml);
  }
};
