/**
 * EverLetter SDK Types
 */
export interface TemplateVariable {
    key: string;
    value: string;
}
export interface RenderTemplateOptions {
    slug: string;
    variables?: TemplateVariable[];
    baseUrl?: string;
}
export interface RenderTemplateResponse {
    slug: string;
    name: string;
    html: string;
}
export interface RenderTemplateError {
    message: string;
    status: number;
}
export interface EverLetterSDKConfig {
    baseUrl?: string;
}
//# sourceMappingURL=types.d.ts.map