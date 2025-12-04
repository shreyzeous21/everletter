/**
 * EverLetter SDK
 * Main entry point for the SDK
 */

export { EverLetterSDK } from "./core";
export { EverLetterTemplate, useEverLetterTemplate } from "./react/EverLetterTemplate";
export type {
  TemplateVariable,
  RenderTemplateOptions,
  RenderTemplateResponse,
  RenderTemplateError,
  EverLetterSDKConfig,
} from "./types";

// Default export for convenience
import { EverLetterSDK } from "./core";
export default EverLetterSDK;

