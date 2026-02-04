> **Note to Hiring Manager:**  
> This project demonstrates a small, reusable UI component library built with React and TypeScript, focusing on clean code, type safety, and real-world usability.  
> Components are designed to be composable, accessible, and responsive.  
> The `InvoicesPage` integrates all components to showcase their usage, with client-side sorting, filtering, and optional row click handling.  
> Unit tests are included for key components to ensure reliability.  
> The goal was to balance functional correctness with maintainable architecture in a time-efficient manner.

# Auditoria UI Challenge

## **Components**

### **1. DataTable**
- Accepts `columns` and `rows`
- Supports client-side sorting
- Handles empty state (`No data available`) and optional `onRowClick`
- Fully type-safe using TypeScript generics

### **2. StatusBadge**
- Displays invoice status: `Pending`, `Complete`, `Error`
- Color-coded using CSS classes
- Accessible with `aria-label`

### **3. SearchInput**
- Controlled input with optional debounce
- Calls `onChange` callback when input changes
- Can be reused in any form or table filter

---

## **Integration Page**

**InvoicesPage.tsx** demonstrates:
- DataTable with sortable columns
- StatusBadge for each invoice
- SearchInput to filter invoices by vendor name
- Responsive layout and clean styling

---

## **How to Run**

1. Clone the repo:

```bash
git clone https://github.com/Cahroonah/auditoria-ui-challenge.git
cd auditoria-ui-challenge
```

2 .Install dependencies:

```bash
yarn install
# or
npm install
```
3. Start the development server:

```bash
yarn start
# or
npm start
```

4. Open in browser:
http://localhost:3000


Assumptions

Sorting is client-side only.

StatusBadge supports three states: pending, complete, error.

Filtering is case-insensitive and matches vendor name.

Table supports row click but does not navigate to other pages.

Components are reusable and can be used in other admin pages.

Styling is minimal but responsive; focus is on clean structure.

Estimated Time Taken

~6-7 hours:

Component design & types: 2h

Integration page & mock data: 1h

Search + debounce implementation: 1h

Sorting and DataTable polishing: 1h

Styling & README: 30min

Testing : 1h