/**
 * React Example - Using EverLetterTemplate Component
 */

import { EverLetterTemplate } from "../react/EverLetterTemplate";

export function NewsletterExample() {
  return (
    <EverLetterTemplate
      slug="newsletter-template"
      variables={[
        { key: "title", value: "Welcome to Our Newsletter!" },
        {
          key: "description",
          value: "Stay updated with our latest news and updates.",
        },
        { key: "cta_text", value: "Subscribe Now" },
        { key: "cta_url", value: "https://example.com/subscribe" },
      ]}
      baseUrl="https://everletter.vercel.app"
      className="newsletter-container"
      onLoad={(html) => console.log("Template loaded:", html)}
      onError={(error) => console.error("Error:", error)}
    />
  );
}

/**
 * React Example - Using useEverLetterTemplate Hook
 */

import { useEverLetterTemplate } from "../react/EverLetterTemplate";

export function NewsletterWithHook() {
  const { html, loading, error, reload } = useEverLetterTemplate({
    slug: "newsletter-template",
    variables: [{ key: "title", value: "Welcome!" }],
    baseUrl: "https://your-api-domain.com",
    autoLoad: true,
  });

  if (loading) return <div>Loading template...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={reload}>Reload Template</button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
