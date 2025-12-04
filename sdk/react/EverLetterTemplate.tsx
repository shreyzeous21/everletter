/**
 * EverLetter React Component
 * Easy-to-use React component for rendering templates
 */

"use client";

import React, { useEffect, useState } from "react";
import { EverLetterSDK } from "../core";
import type { RenderTemplateOptions, RenderTemplateError } from "../types";

export interface EverLetterTemplateProps extends RenderTemplateOptions {
  className?: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: RenderTemplateError) => React.ReactNode;
  onLoad?: (html: string) => void;
  onError?: (error: RenderTemplateError) => void;
  autoLoad?: boolean;
}

export function EverLetterTemplate({
  slug,
  variables = [],
  baseUrl,
  className = "",
  loadingComponent,
  errorComponent,
  onLoad,
  onError,
  autoLoad = true,
}: EverLetterTemplateProps) {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(autoLoad);
  const [error, setError] = useState<RenderTemplateError | null>(null);

  const sdk = new EverLetterSDK({ baseUrl });

  const loadTemplate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await sdk.renderTemplate({
        slug,
        variables,
        baseUrl,
      });

      setHtml(response.html);
      onLoad?.(response.html);
    } catch (err) {
      const errorObj = err as RenderTemplateError;
      setError(errorObj);
      onError?.(errorObj);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      loadTemplate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, JSON.stringify(variables), baseUrl]);

  if (loading) {
    return (
      <div className={className}>
        {loadingComponent || <p>Loading template...</p>}
      </div>
    );
  }

  if (error) {
    if (errorComponent) {
      return <>{errorComponent(error)}</>;
    }
    return (
      <div className={className}>
        <p style={{ color: "red" }}>
          Error: {error.message} (Status: {error.status})
        </p>
      </div>
    );
  }

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

// Export hook for manual control
export function useEverLetterTemplate(
  options: RenderTemplateOptions & { autoLoad?: boolean }
) {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(options.autoLoad ?? true);
  const [error, setError] = useState<RenderTemplateError | null>(null);

  const sdk = new EverLetterSDK({ baseUrl: options.baseUrl });

  const loadTemplate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await sdk.renderTemplate({
        slug: options.slug,
        variables: options.variables,
        baseUrl: options.baseUrl,
      });

      setHtml(response.html);
      return response;
    } catch (err) {
      const errorObj = err as RenderTemplateError;
      setError(errorObj);
      throw errorObj;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.autoLoad !== false) {
      loadTemplate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.slug, JSON.stringify(options.variables), options.baseUrl]);

  return {
    html,
    loading,
    error,
    loadTemplate,
    reload: loadTemplate,
  };
}
