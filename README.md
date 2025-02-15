
# Fancensus Data Visualisation App

## 📚 Project Overview
Fancensus specialises in data collection, processing, and display. This project visualises data from `https://www.fancensus.com/test/dataset1.json` with tables and charts.

### 📝 Features Implemented:
- Table grouped by country with drill-down functionality
- Table grouped by product with activity count
- Graph visualization of activities by country
- Additional custom visualizations

---

## 🚀 Getting Started
### 📂 Prerequisites:
- **Node.js** (version 18 or higher)
- **npm** (version 9 or higher)

### 📥 Installation Steps:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ai-ross/fancensus.git
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 💻 Running the Project
### **Development Server:**
```bash
npm run dev
```
- Visit: `http://localhost:5174`

### **Production Build:**
```bash
npm run build
npm run preview
```
- Visit: `http://localhost:4173`

---

## 🧪 Running Tests
### **Unit Tests:**
```bash
npm test
```

---

## 🛡️ Error Handling
- Displays error messages on failed dataset loads.
- Gracefully handles unexpected inputs.

---

## 📁 Project Structure
```
📂 src
 ┣ 📂components    // Reusable Vue components
 ┣ 📂composables   // Data transformation logic
 ┣ 📂views         // Main page views
 ┣ 📂services      // API calls
 ┗ 📂tests         // Unit and component tests
```

---

## ✅ Modern Practices Applied
- Vue 3 with Composition API
- TailwindCSS for styling
- Chart.js for visualizations
- Vitest for testing
- ESLint & Prettier for formatting
- TypeScript for type safety

---

## 📜 Notes
- Ensure the dataset URL is accessible.
