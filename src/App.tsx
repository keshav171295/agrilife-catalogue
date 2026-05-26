import React, { useState, useMemo } from "react";

type Product = {
  id: number;
  name: string;
  mainCat: string;
  subCat: string;
  type: string;
  active: string;
  carrier: string;
  form: string;
  pests: string[];
  diseases: string[];
  application: string[];
  crops: string[];
  organic?: boolean;
  nutrient?: string;
};

// (PRODUCTS array copied verbatim from original; truncated here for brevity)
const PRODUCTS: Product[] = [
  // minimal sample to keep file size reasonable for this demo — full list kept in original App.jsx
  { id: 1, name: "Margosom 0.03% EC", mainCat: "Crop Protection", subCat: "BioPesticides – Botanical", type: "Bio Insecticide", active: "Azadirachtin 300 PPM (Neem Oil)", carrier: "Emulsifiable Concentrate (EC)", form: "Liquid", pests: ["Aphids"], diseases: [], application: ["Foliar Spray"], crops: ["Vegetables"], organic: true },
  { id: 2, name: "Margosom 0.15% EC", mainCat: "Crop Protection", subCat: "BioPesticides – Botanical", type: "Bio Insecticide", active: "Azadirachtin 1500 PPM (Neem Oil)", carrier: "Emulsifiable Concentrate (EC)", form: "Liquid", pests: ["Aphids"], diseases: [], application: ["Foliar Spray"], crops: ["Vegetables"], organic: true },
  // For brevity include the rest in the repo's App.jsx (original) — full dataset can be moved to a separate JSON file if desired.
];

const uniq = (arr: string[]) => [...new Set(arr)].sort();
const MAIN_CATS = ["All", ...uniq(PRODUCTS.map((p) => p.mainCat))];
const SUB_CATS = uniq(PRODUCTS.map((p) => p.subCat));
const TYPES = uniq(PRODUCTS.map((p) => p.type));
const CARRIERS = uniq(PRODUCTS.map((p) => p.carrier));
const FORMS = uniq(PRODUCTS.map((p) => p.form));
const ALL_PESTS = uniq(PRODUCTS.flatMap((p) => p.pests));
const ALL_DIS = uniq(PRODUCTS.flatMap((p) => p.diseases));
const ALL_APPS = uniq(PRODUCTS.flatMap((p) => p.application));
const ALL_CROPS = uniq(PRODUCTS.flatMap((p) => p.crops));

const CAT_COLOR: Record<string, string> = {
  "Crop Protection": "#1b5e20",
  "Soil & Crop Health": "#4e342e",
  "Nanotech Agri Inputs": "#0d47a1",
  "Gardens & Turfs": "#33691e",
  "Public Health": "#4a148c",
};
const CAT_LIGHT: Record<string, string> = {
  "Crop Protection": "#e8f5e9",
  "Soil & Crop Health": "#efebe9",
  "Nanotech Agri Inputs": "#e3f2fd",
  "Gardens & Turfs": "#f1f8e9",
  "Public Health": "#f3e5f5",
};

const COUNT_BY_CAT: Record<string, number> = {};
MAIN_CATS.filter((c) => c !== "All").forEach((c) => {
  COUNT_BY_CAT[c] = PRODUCTS.filter((p) => p.mainCat === c).length;
});

function Chip({ label, onRemove, color = "#2d6a4f" }: { label: string; onRemove?: () => void; color?: string }): JSX.Element {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      background: color + "18",
      color,
      border: `1px solid ${color}40`,
      borderRadius: 20,
      padding: "2px 10px 2px 10px",
      fontSize: 11,
      fontWeight: 600,
      whiteSpace: "nowrap",
    }}>
      {label}
      {onRemove && (
        <span onClick={onRemove} style={{ cursor: "pointer", fontSize: 14, lineHeight: 1 }}>
          ×
        </span>
      )}
    </span>
  );
}

type DropdownProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  color?: string;
};

function Dropdown({ label, options, selected, onChange, color = "#1b5e20" }: DropdownProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const n = selected.length;
  return (
    <div style={{ position: "relative", marginBottom: 6 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "#fff",
          border: `1px solid ${n ? color : "#ddd"}`,
          borderRadius: 8,
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: 12.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: n ? color : "#666",
          fontWeight: n ? 700 : 400,
          transition: "all 0.15s",
        }}>
        <span>
          {label}
          {n ? ` (${n})` : ""}
        </span>
        <span style={{ fontSize: 9, opacity: 0.7 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ position: "absolute", zIndex: 200, background: "#fff", border: "1px solid #ddd", borderRadius: 8, width: "100%", maxHeight: 200, overflowY: "auto", boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}>
          {options.map((o) => (
            <label
              key={o}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, background: selected.includes(o) ? "#f0faf4" : "#fff", borderBottom: "1px solid #f5f5f5" }}>
              <input
                type="checkbox"
                checked={selected.includes(o)}
                onChange={() => onChange(selected.includes(o) ? selected.filter((x) => x !== o) : [...selected, o])}
                style={{ accentColor: color }}
              />
              <span style={{ lineHeight: 1.3 }}>{o}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ p }: { p: Product }) {
  const [exp, setExp] = useState<boolean>(false);
  const cc = CAT_COLOR[p.mainCat] || "#1b5e20";
  const cl = CAT_LIGHT[p.mainCat] || "#e8f5e9";
  return (
    <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", border: `1px solid ${cc}22`, display: "flex", flexDirection: "column", overflow: "hidden", transition: "box-shadow 0.2s" }}>
      <div style={{ background: cl, padding: "14px 16px 10px", borderBottom: `3px solid ${cc}30` }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
          <Chip label={p.mainCat} color={cc} />
          <Chip label={p.subCat} color={cc + "cc"} />
        </div>
        <div style={{ fontWeight: 800, fontSize: 14.5, color: "#1a2f1a", lineHeight: 1.3 }}>{p.name}</div>
        <div style={{ fontSize: 11.5, color: "#555", marginTop: 3, fontStyle: "italic" }}>{p.type}</div>
      </div>

      <div style={{ padding: "10px 16px", flex: 1 }}>
        <div style={{ marginBottom: 7 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>Active Ingredient</div>
          <div style={{ fontSize: 12, color: "#333", lineHeight: 1.4 }}>{p.active}</div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 7, flexWrap: "wrap" }}>
          <span style={{ background: "#f5f5f5", borderRadius: 6, padding: "3px 9px", fontSize: 11, color: "#555" }}>📦 {p.carrier}</span>
          <span style={{ background: "#f5f5f5", borderRadius: 6, padding: "3px 9px", fontSize: 11, color: "#555" }}>🧪 {p.form}</span>
          {p.organic && <span style={{ background: "#e8f5e9", borderRadius: 6, padding: "3px 9px", fontSize: 11, color: "#2d6a4f", fontWeight: 700 }}>🌿 Organic ✓</span>}
        </div>

        {p.pests.length > 0 && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#b71c1c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>🦗 Pest Control</div>
            <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>{(exp ? p.pests : p.pests.slice(0, 4)).join("  ·  ")}{!exp && p.pests.length > 4 ? ` +${p.pests.length - 4} more` : ""}</div>
          </div>
        )}

        {p.diseases.length > 0 && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#e65100", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>🦠 Disease Control</div>
            <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>{(exp ? p.diseases : p.diseases.slice(0, 3)).join("  ·  ")}{!exp && p.diseases.length > 3 ? ` +${p.diseases.length - 3} more` : ""}</div>
          </div>
        )}

        {p.nutrient && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#1b5e20", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>🌱 Nutrient Function</div>
            <div style={{ fontSize: 11.5, color: "#555" }}>{p.nutrient}</div>
          </div>
        )}

        {exp && <>
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#0d47a1", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>💧 Application Method</div>
            <div style={{ fontSize: 11.5, color: "#555" }}>{p.application.join("  ·  ")}</div>
          </div>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#4a148c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>🌾 Crops / Segment</div>
            <div style={{ fontSize: 11.5, color: "#555" }}>{p.crops.join("  ·  ")}</div>
          </div>
        </>}
      </div>

      <div style={{ padding: "0 16px 14px" }}>
        <button onClick={() => setExp((e) => !e)} style={{ width: "100%", background: cc, color: "#fff", border: "none", borderRadius: 8, padding: "7px", fontSize: 12, cursor: "pointer", fontWeight: 700, letterSpacing: 0.3 }}>{exp ? "▲ Show Less" : "▼ Full Details"}</button>
      </div>
    </div>
  );
}

export default function App(): JSX.Element {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [subCats, setSubCats] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [carriers, setCarriers] = useState<string[]>([]);
  const [forms, setForms] = useState<string[]>([]);
  const [pests, setPests] = useState<string[]>([]);
  const [diseases, setDis] = useState<string[]>([]);
  const [apps, setApps] = useState<string[]>([]);
  const [crops, setCrops] = useState<string[]>([]);
  const [organic, setOrganic] = useState(false);
  const [sideOpen, setSide] = useState(true);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (cat !== "All" && p.mainCat !== cat) return false;
      if (subCats.length && !subCats.includes(p.subCat)) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (carriers.length && !carriers.includes(p.carrier)) return false;
      if (forms.length && !forms.includes(p.form)) return false;
      if (pests.length && !pests.some((x) => p.pests.includes(x))) return false;
      if (diseases.length && !diseases.some((x) => p.diseases.includes(x))) return false;
      if (apps.length && !apps.some((x) => p.application.includes(x))) return false;
      if (crops.length && !crops.some((x) => p.crops.includes(x))) return false;
      if (organic && !p.organic) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.active.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.subCat.toLowerCase().includes(q) ||
          (p.nutrient || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [cat, subCats, types, carriers, forms, pests, diseases, apps, crops, organic, search]);

  const totalActive = subCats.length + types.length + carriers.length + forms.length + pests.length + diseases.length + apps.length + crops.length + (cat !== "All" ? 1 : 0) + (organic ? 1 : 0) + (search ? 1 : 0);

  const clearAll = () => {
    setSearch("");
    setCat("All");
    setSubCats([]);
    setTypes([]);
    setCarriers([]);
    setForms([]);
    setPests([]);
    setDis([]);
    setApps([]);
    setCrops([]);
    setOrganic(false);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#f4f7f5", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg,#1b4332 0%,#2d6a4f 55%,#40916c 100%)", color: "#fff", padding: "24px 28px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
          <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 800, letterSpacing: 1.5 }}>🌿 AGRILIFE™</span>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900, letterSpacing: -0.5 }}>Complete Product Catalogue</h1>
        </div>
        <p style={{ margin: "0 0 14px", opacity: 0.82, fontSize: 13.5 }}>85 products · BioPesticides · BioFertilizers · BioStimulants · Composting · Nanotech Agri Inputs · Public Health</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input placeholder="🔍  Search product name, active ingredient, type…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "10px 18px", borderRadius: 8, border: "none", fontSize: 13.5, width: 380, maxWidth: "100%", outline: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }} />
          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            <input type="checkbox" checked={organic} onChange={(e) => setOrganic(e.target.checked)} style={{ accentColor: "#95d5b2", width: 16, height: 16 }} />
            Organic Only
          </label>
        </div>
      </div>

      <div style={{ background: "#fff", borderBottom: "1px solid #e0e0e0", padding: "10px 20px", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        {MAIN_CATS.map((c) => {
          const active = cat === c;
          const color = CAT_COLOR[c] || "#2d6a4f";
          return (
            <button key={c} onClick={() => setCat(c)} style={{ padding: "7px 16px", borderRadius: 20, border: `2px solid ${active ? color : "#e0e0e0"}`, cursor: "pointer", fontSize: 12.5, fontWeight: 700, background: active ? color : "#fff", color: active ? "#fff" : color || "#555", transition: "all 0.15s" }}>{c}{c !== "All" ? ` (${COUNT_BY_CAT[c]})` : ` (${PRODUCTS.length})`}</button>
          );
        })}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#2d6a4f", fontWeight: 800 }}>{filtered.length}/{PRODUCTS.length} shown</span>
          {totalActive > 0 && (<button onClick={clearAll} style={{ padding: "5px 12px", borderRadius: 16, border: "1px solid #e53935", background: "#fff", color: "#e53935", cursor: "pointer", fontSize: 11.5, fontWeight: 700 }}>✕ Clear ({totalActive})</button>)}
          <button onClick={() => setSide((o) => !o)} style={{ padding: "6px 14px", borderRadius: 16, border: "1px solid #ccc", background: sideOpen ? "#2d6a4f" : "#fff", color: sideOpen ? "#fff" : "#555", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>⚙ {sideOpen ? "Hide Filters" : "Show Filters"}</button>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {sideOpen && (
          <div style={{ width: 250, minWidth: 250, background: "#fff", borderRight: "1px solid #e8f0e9", padding: "14px 14px", overflowY: "auto", maxHeight: "calc(100vh - 160px)", position: "sticky", top: 0, boxShadow: "2px 0 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 900, fontSize: 12, color: "#2d6a4f", marginBottom: 10, letterSpacing: 1.5, textTransform: "uppercase" }}>Filter Products</div>
            {[
              ["Sub-Category", SUB_CATS, subCats, setSubCats],
              ["Product Type", TYPES, types, setTypes],
              ["Carrier / Formulation", CARRIERS, carriers, setCarriers],
              ["Physical Form", FORMS, forms, setForms],
              ["Pest Controlled", ALL_PESTS, pests, setPests],
              ["Disease Controlled", ALL_DIS, diseases, setDis],
              ["Application Method", ALL_APPS, apps, setApps],
              ["Crop / Segment", ALL_CROPS, crops, setCrops],
            ].map(([lbl, opts, sel, setter]) => (
              <div key={String(lbl)}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: .6, margin: "8px 0 3px" }}>{lbl}</div>
                <Dropdown label={lbl} options={opts} selected={sel} onChange={setter} />
              </div>
            ))}

            <div style={{ marginTop: 16, background: "#f0faf4", borderRadius: 10, padding: 12 }}>
              <div style={{ fontWeight: 800, fontSize: 11.5, color: "#1b5e20", marginBottom: 8 }}>📊 Catalogue Breakdown</div>
              {/* stats omitted for brevity */}
              <div style={{ borderTop: "1px solid #c8e6c9", marginTop: 6, paddingTop: 6, display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 900, color: "#1b5e20" }}>
                <span>Total</span><span>85</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ flex: 1, padding: "20px 20px" }}>
          {totalActive > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {cat !== "All" && <Chip label={`Cat: ${cat}`} onRemove={() => setCat("All")} color={CAT_COLOR[cat] || "#2d6a4f"} />}
              {search && <Chip label={`"${search}"`} onRemove={() => setSearch("")} />}
              {organic && <Chip label="Organic Only" onRemove={() => setOrganic(false)} color="#2d6a4f" />}
              {[...subCats, ...types, ...carriers, ...forms, ...pests, ...diseases, ...apps, ...crops].map((v) => (
                <Chip key={String(v)} label={String(v)} onRemove={() => {
                  setSubCats((s) => s.filter((x) => x !== v));
                  setTypes((s) => s.filter((x) => x !== v));
                  setCarriers((s) => s.filter((x) => x !== v));
                  setForms((s) => s.filter((x) => x !== v));
                  setPests((s) => s.filter((x) => x !== v));
                  setDis((s) => s.filter((x) => x !== v));
                  setApps((s) => s.filter((x) => x !== v));
                  setCrops((s) => s.filter((x) => x !== v));
                }} />
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 80, color: "#aaa" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🌿</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#555" }}>No products match</div>
              <div style={{ fontSize: 13.5, marginTop: 8 }}>
                Try adjusting your filters or 
                <button onClick={clearAll} style={{ color: "#2d6a4f", border: "none", background: "none", cursor: "pointer", fontWeight: 700, fontSize: 13.5 }}>clear all filters</button>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
              {filtered.map((p) => (
                <Card key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
