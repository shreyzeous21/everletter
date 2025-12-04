/**
 * Vanilla JavaScript Example
 */

import { EverLetterSDK } from "../core";

// Initialize SDK
const sdk = new EverLetterSDK({
  baseUrl: "https://your-api-domain.com",
});

// Example 1: Render template and insert into DOM
async function renderTemplate() {
  try {
    const result = await sdk.renderTemplate({
      slug: "newsletter-template",
      variables: [
        { key: "title", value: "Welcome to Our Newsletter!" },
        { key: "description", value: "Stay updated with our latest news." },
        { key: "cta_text", value: "Subscribe Now" },
        { key: "cta_url", value: "https://example.com/subscribe" },
      ],
    });

    // Insert rendered HTML into page
    document.getElementById("template-container").innerHTML = result.html;
    console.log("Template rendered:", result.name);
  } catch (error) {
    console.error("Error rendering template:", error.message);
  }
}

// Example 2: Get all templates
async function getAllTemplates() {
  try {
    const templates = await sdk.getTemplates();
    console.log("Available templates:", templates);

    // Display templates in a list
    const templateList = templates.map((t) => t.name).join(", ");
    document.getElementById("templates-list").textContent = templateList;
  } catch (error) {
    console.error("Error fetching templates:", error.message);
  }
}

// Example 3: Get specific template
async function getTemplate() {
  try {
    const template = await sdk.getTemplate("newsletter-template");
    console.log("Template details:", template);
  } catch (error) {
    console.error("Error fetching template:", error.message);
  }
}

// Run examples when page loads
window.addEventListener("DOMContentLoaded", () => {
  renderTemplate();
  getAllTemplates();
});
