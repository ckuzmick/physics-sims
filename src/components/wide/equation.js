import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function Equation({ text }) {
    return (
        <div
            className="equation-container"
            dangerouslySetInnerHTML={{
                __html: katex.renderToString(text, { 
                    throwOnError: false,
                    displayMode: true,
                    strict: false
                })
            }}
        />
    );
}

export function EquationInline({ text }) {
    return (
        <span
            className="equation-inline"
            dangerouslySetInnerHTML={{
                __html: katex.renderToString(text, { 
                    throwOnError: false,
                    displayMode: false,
                    strict: false
                })
            }}
        />
    );
}