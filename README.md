# DEMOFIZ

**DEMOFIZ** is a small Slovak-language collection of interactive physics tools. Each tool helps learners explore one relationship by changing values and seeing what changes.

The first tool demonstrates **Ohm's law** in a simple resistor circuit.

## Try it

Open the [DEMOFIZ catalogue](https://maxskachkov.github.io/demofiz/) or go directly to the [Ohm's law simulator](https://maxskachkov.github.io/demofiz/ohmov-zakon.html).

No account, installation, or server is needed. The project is a static website and runs in a modern browser.

## Learning flow

1. Choose the quantity to calculate: voltage, current, or resistance.
2. Enter the two known values.
3. Read the result and see the circuit and relationship graph update.

The current model is limited to the basic relationship **U = I × R** for a simple resistor circuit. It does not model alternating current, changing resistance, or more complex circuits.

## Project structure

- `index.html` — tool catalogue and project homepage
- `ohmov-zakon.html` — Ohm's law simulator
- `styles.css` — shared visual design and responsive layout
- `app.js` — calculation, circuit labels, and graph
- `DESIGN_SYSTEM.md` — design rules for future tools

## Run locally

Open `index.html` in a browser. No package installation or build step is required.

## Findability and sharing

The pages include Slovak titles and descriptions, canonical URLs, Open Graph metadata, a sitemap, and a robots file. GitHub Pages serves this project from the current repository path.

Suggested GitHub topics: `physics`, `education`, `interactive-learning`, `ohms-law`, `simulation`, `slovak`.

## Roadmap

New tools should be added only when their model and learning goal can be explained in a few simple steps. Possible areas include mechanics, electricity, and optics; each future simulator needs its own clear scope and correct units.

## Design system

Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) before changing the interface or adding a new simulator.

## License

The software is released under the MIT License. See [LICENSE](./LICENSE).
