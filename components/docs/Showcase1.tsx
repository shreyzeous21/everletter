"use client";

import { useEffect, useState } from "react";

export default function Showcase1() {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRender = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/templates/shrey/render`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            variables: [
              { key: "title", value: "Shrey" },
              { key: "description", value: "Galgotian Buddy" },
              { key: "cta_text", value: "Galgotian Buddy" },
              { key: "cta_url", value: "https://www.google.com" },
            ],
          }),
        }
      );

      const data = await res.json();
      setHtml(data.html || "");
    } catch (error) {
      console.error("Error loading template:", error);
    }

    setLoading(false);
  };

  // ⬇️ Fetch automatically on mount
  useEffect(() => {
    handleRender();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Rendered Template</h1>

      {loading && <p>Loading template...</p>}

      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="border p-5 rounded-lg"
      />
    </div>
  );
}
