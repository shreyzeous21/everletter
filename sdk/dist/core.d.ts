/**
 * EverLetter SDK Core
 * Core functionality for rendering templates
 */
import type { RenderTemplateOptions, RenderTemplateResponse, EverLetterSDKConfig } from "./types";
export declare class EverLetterSDK {
    private baseUrl;
    constructor(config?: EverLetterSDKConfig);
    /**
     * Render a template with variables
     * @param options - Template slug and variables
     * @returns Promise with rendered HTML
     */
    renderTemplate(options: RenderTemplateOptions): Promise<RenderTemplateResponse>;
    /**
     * Get all available templates
     * @param baseUrl - Optional base URL override
     * @returns Promise with templates array
     */
    getTemplates(baseUrl?: string): Promise<any[]>;
    /**
     * Get a template by slug
     * @param slug - Template slug
     * @param baseUrl - Optional base URL override
     * @returns Promise with template object
     */
    getTemplate(slug: string, baseUrl?: string): Promise<any>;
}
//# sourceMappingURL=core.d.ts.map