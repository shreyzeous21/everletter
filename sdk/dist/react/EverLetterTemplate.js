/**
 * EverLetter React Component
 * Easy-to-use React component for rendering templates
 */
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { EverLetterSDK } from "../core";
export function EverLetterTemplate({ slug, variables = [], baseUrl, className = "", loadingComponent, errorComponent, onLoad, onError, autoLoad = true, }) {
    const [html, setHtml] = useState("");
    const [loading, setLoading] = useState(autoLoad);
    const [error, setError] = useState(null);
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
        }
        catch (err) {
            const errorObj = err;
            setError(errorObj);
            onError?.(errorObj);
        }
        finally {
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
        return (_jsx("div", { className: className, children: loadingComponent || _jsx("p", { children: "Loading template..." }) }));
    }
    if (error) {
        if (errorComponent) {
            return _jsx(_Fragment, { children: errorComponent(error) });
        }
        return (_jsx("div", { className: className, children: _jsxs("p", { style: { color: "red" }, children: ["Error: ", error.message, " (Status: ", error.status, ")"] }) }));
    }
    return (_jsx("div", { className: className, dangerouslySetInnerHTML: { __html: html } }));
}
// Export hook for manual control
export function useEverLetterTemplate(options) {
    const [html, setHtml] = useState("");
    const [loading, setLoading] = useState(options.autoLoad ?? true);
    const [error, setError] = useState(null);
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
        }
        catch (err) {
            const errorObj = err;
            setError(errorObj);
            throw errorObj;
        }
        finally {
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
