/**
 * EverLetter React Component
 * Easy-to-use React component for rendering templates
 */
import React from "react";
import type { RenderTemplateOptions, RenderTemplateError } from "../types";
export interface EverLetterTemplateProps extends RenderTemplateOptions {
    className?: string;
    loadingComponent?: React.ReactNode;
    errorComponent?: (error: RenderTemplateError) => React.ReactNode;
    onLoad?: (html: string) => void;
    onError?: (error: RenderTemplateError) => void;
    autoLoad?: boolean;
}
export declare function EverLetterTemplate({ slug, variables, baseUrl, className, loadingComponent, errorComponent, onLoad, onError, autoLoad, }: EverLetterTemplateProps): import("react/jsx-runtime").JSX.Element;
export declare function useEverLetterTemplate(options: RenderTemplateOptions & {
    autoLoad?: boolean;
}): {
    html: string;
    loading: boolean;
    error: RenderTemplateError | null;
    loadTemplate: () => Promise<import("..").RenderTemplateResponse>;
    reload: () => Promise<import("..").RenderTemplateResponse>;
};
//# sourceMappingURL=EverLetterTemplate.d.ts.map