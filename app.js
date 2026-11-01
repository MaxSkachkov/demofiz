(() => {
  const form = document.getElementById("calculator-form");
  if (!form) return;

  const fields = {
    a: document.getElementById("value-a"),
    b: document.getElementById("value-b")
  };
  const labels = {
    a: document.getElementById("label-a"),
    b: document.getElementById("label-b")
  };
  const units = {
    a: document.getElementById("unit-a"),
    b: document.getElementById("unit-b")
  };
  const hints = {
    a: document.getElementById("hint-a"),
    b: document.getElementById("hint-b")
  };
  const resultValue = document.getElementById("result-value");
  const resultWorking = document.getElementById("result-working");
  const resultUnitLabel = document.getElementById("result-unit-label");
  const errorMessage = document.getElementById("error-message");
  const circuit = {
    current: document.getElementById("circuit-current"),
    resistance: document.getElementById("circuit-resistance"),
    voltage: document.getElementById("circuit-voltage")
  };
  const graph = {
    line: document.getElementById("graph-line"),
    point: document.getElementById("graph-point"),
    xName: document.getElementById("graph-x-name"),
    yName: document.getElementById("graph-y-name"),
    xMax: document.getElementById("graph-x-max"),
    yMax: document.getElementById("graph-y-max"),
    yMid: document.getElementById("graph-y-mid"),
    fixed: document.getElementById("graph-fixed"),
    pointText: document.getElementById("graph-current-point"),
    description: document.getElementById("graph-description"),
    svg: document.getElementById("relationship-graph")
  };

  const modes = {
    U: { a: "I", b: "R", result: "U", name: "napätie" },
    I: { a: "U", b: "R", result: "I", name: "prúd" },
    R: { a: "U", b: "I", result: "R", name: "odpor" }
  };
  const names = { U: "Napätie", I: "Prúd", R: "Odpor" };
  const unitNames = { U: "V", I: "A", R: "Ω" };
  const shortNames = { U: "napätie", I: "prúd", R: "odpor" };
  const values = { U: 20, I: 2, R: 10 };
  let mode = "U";

  function format(value) {
    if (!Number.isFinite(value)) return "—";
    return new Intl.NumberFormat("sk-SK", { maximumSignificantDigits: 4 }).format(value);
  }

  function setMode(nextMode) {
    mode = nextMode;
    const setup = modes[mode];
    [["a", setup.a], ["b", setup.b]].forEach(([slot, key]) => {
      labels[slot].textContent = names[key] + " " + key;
      units[slot].textContent = unitNames[key];
      hints[slot].textContent = "Zadaj hodnotu " + shortNames[key] + ".";
      fields[slot].value = values[key];
      fields[slot].setAttribute("aria-label", names[key] + " " + key + " v " + unitNames[key]);
    });
    document.querySelectorAll("[data-mode]").forEach(button => {
      const active = button.dataset.mode === mode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    calculate();
  }

  function compute(a, b) {
    if (mode === "U") return { U: a * b, I: a, R: b, equation: "U = I × R", substitution: format(a) + " A × " + format(b) + " Ω" };
    if (mode === "I") return { U: a, I: a / b, R: b, equation: "I = U ÷ R", substitution: format(a) + " V ÷ " + format(b) + " Ω" };
    return { U: a, I: b, R: a / b, equation: "R = U ÷ I", substitution: format(a) + " V ÷ " + format(b) + " A" };
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
    resultValue.textContent = "Doplň hodnoty";
    resultWorking.textContent = "";
    resultUnitLabel.textContent = "čaká na vstup";
    Object.values(circuit).forEach(node => { node.textContent = ""; });
    graph.point.style.display = "none";
  }

  function calculate(event) {
    if (event) event.preventDefault();
    const setup = modes[mode];
    const rawA = fields.a.value.trim();
    const rawB = fields.b.value.trim();
    if (rawA === "" || rawB === "") {
      showError("Zadaj obe známe hodnoty.");
      return;
    }
    const a = Number(rawA);
    const b = Number(rawB);
    if (!Number.isFinite(a) || !Number.isFinite(b) || a < 0 || b < 0) {
      showError("Použi čísla od 0 vyššie.");
      return;
    }
    if ((mode === "I" && b === 0) || (mode === "R" && b === 0)) {
      showError(mode === "I" ? "Odpor musí byť väčší ako 0 Ω." : "Prúd musí byť väčší ako 0 A.");
      return;
    }

    values[setup.a] = a;
    values[setup.b] = b;
    const result = compute(a, b);
    if (!Object.values(result).slice(0, 3).every(Number.isFinite)) {
      showError("Tieto hodnoty sa nedajú vypočítať. Skontroluj vstup.");
      return;
    }

    errorMessage.hidden = true;
    resultValue.textContent = names[setup.result] + " = " + format(result[setup.result]) + " " + unitNames[setup.result];
    resultUnitLabel.textContent = setup.name;
    resultWorking.innerHTML = "";
    const formula = document.createElement("span");
    formula.textContent = result.equation;
    const substitution = document.createElement("span");
    substitution.textContent = result.substitution + " = " + format(result[setup.result]) + " " + unitNames[setup.result];
    resultWorking.append(formula, substitution);

    circuit.current.textContent = "I = " + format(result.I) + " A";
    circuit.resistance.textContent = "R = " + format(result.R) + " Ω";
    circuit.voltage.textContent = "U = " + format(result.U) + " V";
    drawGraph(result);
  }

  function drawGraph(result) {
    const xKey = mode === "U" ? "I" : (mode === "I" ? "R" : "I");
    const yKey = modes[mode].result;
    const xUnit = unitNames[xKey];
    const yUnit = unitNames[yKey];
    const targetX = result[xKey];
    const maxX = Math.max(targetX * 1.6, 1);
    const startX = mode === "U" ? 0 : maxX / 24;
    const points = [];
    let maxY = Math.max(result[yKey], .001);
    for (let i = 0; i <= 24; i++) {
      const x = startX + (maxX - startX) * i / 24;
      let y;
      if (mode === "U") y = x * result.R;
      else if (mode === "I") y = result.U / x;
      else y = result.U / x;
      if (Number.isFinite(y)) {
        points.push([x, y]);
        maxY = Math.max(maxY, y);
      }
    }
    maxY = Math.max(maxY * 1.08, .001);
    const left = 42, top = 18, width = 304, height = 132;
    const coords = points.map(point => {
      const px = left + (point[0] / maxX) * width;
      const py = top + height - (point[1] / maxY) * height;
      return [px, py];
    });
    graph.line.setAttribute("d", coords.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" "));
    const px = left + Math.min(targetX / maxX, 1) * width;
    const py = top + height - Math.min(result[yKey] / maxY, 1) * height;
    graph.point.setAttribute("cx", px.toFixed(1));
    graph.point.setAttribute("cy", py.toFixed(1));
    graph.point.style.display = "";
    graph.xName.textContent = names[xKey] + " " + xKey + " (" + xUnit + ")";
    graph.yName.textContent = names[yKey] + " " + yKey + " (" + yUnit + ")";
    graph.xMax.textContent = format(maxX);
    graph.yMax.textContent = format(maxY);
    graph.yMid.textContent = format(maxY / 2);
    const fixedKey = mode === "U" ? "R" : "U";
    graph.fixed.textContent = "Pri " + shortNames[fixedKey] + " " + fixedKey + " = " + format(result[fixedKey]) + " " + unitNames[fixedKey];
    graph.pointText.textContent = "Teraz: " + format(targetX) + " " + xUnit + " → " + format(result[yKey]) + " " + yUnit;
    graph.description.textContent = "Graf ukazuje, ako sa mení " + shortNames[yKey] + " pri zmene " + shortNames[xKey] + ".";
    graph.svg.setAttribute("aria-label", "Graf: " + names[yKey] + " podľa " + shortNames[xKey] + ". Aktuálna hodnota " + format(targetX) + " " + xUnit + " dáva " + format(result[yKey]) + " " + yUnit + ".");
  }

  document.querySelectorAll("[data-mode]").forEach(button => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });
  fields.a.addEventListener("input", calculate);
  fields.b.addEventListener("input", calculate);
  form.addEventListener("submit", calculate);
  setMode("U");
})();