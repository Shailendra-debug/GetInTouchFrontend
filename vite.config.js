import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectDirectory = dirname(fileURLToPath(import.meta.url));
const pageFiles = [
  "index.html",
  "contact.html",
  "notes.html",
  "live-quiz.html",
  "practice-quiz.html",
  "profile.html",
  "quiz.html",
  "reset-password.html",
  "payment.html",
  "PrivacyPolicy.html",
  "TermsAndCondition.html",
];

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: Object.fromEntries(pageFiles.map((page) => [page, resolve(projectDirectory, page)])),
    },
  },
});
