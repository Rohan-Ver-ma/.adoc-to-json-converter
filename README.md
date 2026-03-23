# AsciiDoc to JSON Converter

A build-time Node.js utility that converts contributor profiles written in AsciiDoc (`.adoc`) format into a structured JSON dataset. This project serves as a proof-of-concept for transforming static content into a format that can be directly consumed by a React-based frontend.

---

## 🚀 Overview

This script parses `.adoc` files using **asciidoctor.js** (the official AsciiDoc parser) and extracts:

- Contributor metadata (name, GitHub, location, etc.)
- Structured question–answer sections
- Clean, frontend-ready JSON output

The generated `contributors.json` file can be used as a static data source in modern frontend frameworks like React.

---

## ⚙️ How It Works

1. Reads all `.adoc` files from the contributors directory  
2. Parses content using `asciidoctor.js.`  
3. Extracts metadata using the `page-*` attribute schema  
4. Converts section headings into structured Q&A pairs  
5. Generates a sorted `contributors.json` file  

---

## 📦 Installation

```bash
npm install asciidoctor
```
---

## Usage
Run the Script

```bash
node generate.js
