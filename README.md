# Packaging 3D Configurator & Dieline Generator

An interactive web-based application that allows users to design, customize, and export professional-grade cardboard foldable boxes in real-time. Similar to Pacdora, this tool provides a seamless transition between 2D engineering and 3D visualization.

## 🚀 Key Features

### 1. Dynamic Parameter Controls
* **Real-time Scaling:** Adjust Length, Width, and Height with instant visual updates.
* **Material Thickness:** Custom thickness adjustment (e.g., E-flute, B-flute, or custom mm).
* **Dimension Modes:** * **Manufacture:** Production-line precision.
    * **Inner:** Ensuring the product fits inside perfectly.
    * **Outer:** Managing shipping and shelf-space requirements.

### 2. Dual-Viewer Interface
* **2D Dieline Viewer:** * Vector-based representation of the flat template.
    * Supports Zoom In/Out to inspect cut lines, fold lines, and bleed zones.
* **3D Viewer (Right Top Corner):**
    * High-fidelity 360-degree rotation.
    * **Interactive Folding:** Animation toggle to "Open" and "Close" the box to test assembly logic.

### 3. Professional Exports
Download production-ready files including:
* **2D Templates:** AI (Adobe Illustrator), PDF, and SVG dielines.
* **3D Assets:** 3D Image (PNG/JPG) and 3D Mockup (GLB/OBJ format).

---

## 🛠 Tech Stack (Planned)

* **Frontend:** React.js / Next.js
* **3D Engine:** Three.js with @react-three/fiber
* **Geometry Logic:** Paper.js for parametric 2D vector generation
* **UI Components:** Tailwind CSS for a clean, professional dashboard

---

## 📂 Project Structure

* `/src/logic`: Contains the mathematical formulas for box folding and dimension offsets.
* `/src/components/Viewer3D`: Three.js implementation for the 360 viewer.
* `/src/components/Viewer2D`: Canvas/SVG implementation for the interactive dieline.
* `/src/templates`: JSON definitions for different box styles (Mailer, Tuck End, Sleeve, etc.).

---

## 📝 Roadmap

- [ ] Initialize repository and core UI layout.
- [ ] Implement parametric 2D logic for Mailer Boxes.
- [ ] Connect Three.js for real-time 3D folding animations.
- [ ] Integrate PDF/AI export libraries.
- [ ] Add material texture selection (Kraft, White, Corrugated).

---

## 🤝 Contribution
This project is currently in development. Feel free to explore the code or suggest new box templates!
