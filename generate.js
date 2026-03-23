import fs from "fs";
import path from "path";
import asciidoctorFactory from "asciidoctor";

const asciidoctor = asciidoctorFactory();
const dir = "./src/pages/contributors";
const output = "./data/contributors.json";

const getAttr = (attr, key) => attr[`page-${key}`] || "";

function generateContributorsJSON() {
  try {
    const files = fs.readdirSync(dir);

    const contributors = files
      .filter(f => f.endsWith(".adoc"))
      .map(f => {
        const content = fs.readFileSync(path.join(dir, f), "utf-8");
        const doc = asciidoctor.load(content);
        const attr = doc.getAttributes();

        const qa = doc.getSections().map(sec => ({
          question: sec.getTitle(),
          answer: sec.getBlocks().map(b => b.getSource()).join("\n\n")
        }));

        return {
          slug: f.replace(".adoc", ""),
          name: getAttr(attr, "name"),
          github: getAttr(attr, "github"),
          linkedin: getAttr(attr, "linkedin"),
          twitter: getAttr(attr, "twitter"),
          location: getAttr(attr, "location"),
          firstcommit: getAttr(attr, "firstcommit"),
          image: getAttr(attr, "image"),
          intro: getAttr(attr, "intro"),
          qa
        };
      })
      .sort((a, b) => a.slug.localeCompare(b.slug));

    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, JSON.stringify(contributors, null, 2));

    console.log("Contributors.json generated successfully!");
  } catch (err) {
    console.error("Error generating contributors.json:", err);
  }
}

generateContributorsJSON();