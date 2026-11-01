# DEMOFIZ design system

This is the shared visual and interaction reference for DEMOFIZ. Keep it current as new simulators are added. The supplied references inform the warm neomorphic surfaces, measured diagrams, generous whitespace, and step-by-step learning flow. Use these principles consistently; do not copy another product's logo or interface.

## Product principle

A learner should be able to start within a few seconds and understand what to change and what changed. Each tool teaches one physical relationship at a time. Put the formula, inputs, result, and visual model in a clear order. Avoid unexplained specialist terms and decorative elements that compete with the experiment.

## Visual tokens

- Page background: warm paper `#F3EFE6`.
- Main surface: soft ivory `#F8F5ED`; inset areas: `#EEE9DE`.
- Main text: graphite green `#25312E`; supporting text: `#64716D`.
- Action and diagram accent: deep teal `#176E68`; hover: `#105A55`.
- Highlight: pale teal `#DCEBE6`; error: muted brick `#9D463C`.
- Use system sans-serif fonts. Use tabular numerals for quantities and keep units visible.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64 px.
- Corner radii: 11–14 px for controls, 16–20 px for panels, up to 24 px for large surfaces.

## Surface and elevation

Use soft raised and inset shadows to group content, with no heavy outlines. A small number of surfaces should carry the page. Keep text and inputs readable in both raised and pressed states. Neomorphism is decorative support only: maintain clear contrast, visible focus, and conventional controls.

## Page structure

1. Compact header with DEMOFIZ mark and simple navigation.
2. Clear page title and one short sentence about the physical relationship.
3. Inputs grouped by their labels and units.
4. A prominent result with the formula substitution.
5. A lightweight diagram or graph with axes, units, scale, and a current-value marker.
6. A short note on the model's scope when that prevents a misconception.

The catalogue shows only tools that work. A planned tool may be described as planned, but must not look interactive until it exists.

## Interaction rules

- Start with a useful example only when the values are physically valid; explain that the values can be changed.
- Keep the active choice obvious and keyboard accessible.
- Update the result and visualisation when an input changes; keep the explicit calculate action available.
- Explain invalid or incomplete values next to the result in plain language.
- Never divide by zero or silently reinterpret a missing or invalid value.
- Use correct SI units and show units with values, labels, axes, and graph points.
- Respect reduced-motion settings. Use visible focus rings and semantic headings and labels.
- Do not introduce accounts, tracking, external fonts, or backend services without a clear product need.

## Reusable components

- `brand`: DEMOFIZ wordmark with a quiet raised initial mark.
- `button-primary`: teal action with a clear verb.
- `button-secondary`: neutral raised action.
- `mode-switch`: three or fewer options, with a clear pressed state.
- `input-wrap`: inset number field with a separate visible unit.
- `result-card`: answer, unit, and substitution in that order.
- `circuit-card` / `graph-card`: minimal diagram with explicit quantities and labels.
- `tool-card`: category, name, one-sentence purpose, formula, and one action.

## Extending the catalogue

For every new physical rule, document: the intended learner, the exact supported model, required values and units, valid ranges, limitations, and what the diagram measures. Build a dedicated page and add one catalogue card only after the calculations and labels are coherent.
