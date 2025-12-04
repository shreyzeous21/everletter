/**
 * EverLetter SDK Core
 * Core functionality for rendering templates
 */
export class EverLetterSDK {
    constructor(config = {}) {
        this.baseUrl = config.baseUrl ||
            (typeof window !== "undefined"
                ? window.location.origin
                : "https://your-domain.com");
    }
    /**
     * Render a template with variables
     * @param options - Template slug and variables
     * @returns Promise with rendered HTML
     */
    async renderTemplate(options) {
        const { slug, variables = [] } = options;
        const baseUrl = options.baseUrl || this.baseUrl;
        try {
            const response = await fetch(`${baseUrl}/api/templates/${slug}/render`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ variables }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw {
                    message: data.message || "Failed to render template",
                    status: response.status,
                };
            }
            return data;
        }
        catch (error) {
            if (error && typeof error === "object" && "status" in error) {
                throw error;
            }
            throw {
                message: "Network error or template not found",
                status: 500,
            };
        }
    }
    /**
     * Get all available templates
     * @param baseUrl - Optional base URL override
     * @returns Promise with templates array
     */
    async getTemplates(baseUrl) {
        const url = baseUrl || this.baseUrl;
        try {
            const response = await fetch(`${url}/api/templates`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw {
                    message: data.message || "Failed to get templates",
                    status: response.status,
                };
            }
            return data.data || [];
        }
        catch (error) {
            if (error && typeof error === "object" && "status" in error) {
                throw error;
            }
            throw {
                message: "Network error",
                status: 500,
            };
        }
    }
    /**
     * Get a template by slug
     * @param slug - Template slug
     * @param baseUrl - Optional base URL override
     * @returns Promise with template object
     */
    async getTemplate(slug, baseUrl) {
        const url = baseUrl || this.baseUrl;
        try {
            const response = await fetch(`${url}/api/templates/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw {
                    message: data.message || "Template not found",
                    status: response.status,
                };
            }
            return data;
        }
        catch (error) {
            if (error && typeof error === "object" && "status" in error) {
                throw error;
            }
            throw {
                message: "Network error",
                status: 500,
            };
        }
    }
}
