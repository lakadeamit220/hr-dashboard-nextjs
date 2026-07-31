# HR Dashboard (Next.js MVP)

**🔴 Live Demo:** [https://hr-dashboard-nextjs-eight.vercel.app/](https://hr-dashboard-nextjs-eight.vercel.app/)

A modern, highly-responsive Human Resources Dashboard built with Next.js 16 (App Router), Tailwind CSS v4, and Zustand. 
This application serves as an Employee Management System MVP, featuring robust CRUD operations, dynamic filtering, interactive data visualization, an Interactive Organizational Chart, and an elegant, premium user interface powered by Vanta.js.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19) utilizing the new App Router (`src/app`).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (No configuration file, fully CSS-native using `@theme`).
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) for blazing-fast, boilerplate-free global state (Client-side).
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) for performant client-side validation.
- **Charts:** [Recharts](https://recharts.org/) for beautiful, responsive data visualization.
- **Icons:** [Lucide React](https://lucide.dev/) for crisp, modern SVG iconography.
- **3D Backgrounds:** [Vanta.js](https://www.vantajs.com/) (Globe effect) powered by Three.js for a premium, interactive backdrop.

---

## Features & Functionality

### 1. Dashboard Overview
- **Interactive Vanta Background:** A stunning, interactive 3D Globe renders in the background of the application layout, instantly elevating the aesthetics to a premium tier.
- **KPI Metrics:** View high-level statistics like Total Employees, Active Employees, On-Leave count, and New Joiners.
- **Data Visualization:** 
  - **Department Distribution:** A detailed Recharts Bar chart showing employee spread across departments.
  - **Performance Rating:** A Recharts Pie chart displaying performance metrics.
  - **Headcount Growth:** A Recharts Area chart dynamically mapping the cumulative historical growth of the company based on employee joining dates.
- **Upcoming Events Widget:** A dedicated module that automatically parses employee Birthdays and Work Anniversaries occurring in the next 30 days and highlights them.

### 2. Employee Directory
- **Rich List View:** A highly scannable table view detailing all employees.
- **Quick Actions:** "View", "Edit", and "Delete" buttons are permanently visible on every single row for rapid management.
- **Advanced Search & Filtering:**
  - Instantly search employees by Name, Email, or Designation.
  - Filter by Department (e.g., Engineering, HR, Sales).
  - Filter by Status (Active, On-Leave, Notice Period, Inactive).
- **Dynamic Avatars:** Employees without a profile photo receive a beautifully colored avatar, dynamically generated using a hash of their name.
- **Document Indicators:** Instantly see which employees have uploaded documents via stylized file count badges.

### 3. Interactive Organizational Chart
- **Dedicated Route (`/org-chart`):** A beautiful visualization of the entire company hierarchy.
- **Recursive Visual Tree:** Built using flexbox and custom pseudo-borders to draw the connecting lines dynamically based on `managerId` relationships.
- **Pan & Zoom Canvas:** Because the organization has 65 employees, the chart is wrapped in a custom, fully interactive canvas. You can click and drag to pan around, and use the UI controls to zoom in, zoom out, or reset the view.
- **Collapsible Branches:** Each manager node has a toggle to expand or collapse their entire reporting branch to keep the view clean.
- **CEO Node:** The tree stems from the Chief Executive Officer (Amit Lakade) at the very top.

### 4. Employee Management (CRUD)
- **Add & Edit (Forms):** A slick, slide-in Modal containing a polished, fully validated form to capture employee details (Name, Contact, Department, Salary, Rating, etc.).
- **Simulated Server Actions:** Form submissions are passed to Next.js `use server` actions, mimicking actual backend operations, and then optimistically update the Zustand store on success.
- **Profile Photo Upload:** Select an image file to instantly convert it to Base64 and preview it before submitting.
- **Secure Deletion:** Employees can be instantly deleted directly from the table row.
- **Toast Notifications:** Smooth, animated success/error notifications appear in the bottom right upon completing operations.

### 5. Mock Data Generation Script
- **`generate-mock.js`:** A custom Node.js script that dynamically generates 65 realistic employees.
- **Localized Data:** Generates realistic Maharashtrian/Marathi surnames (e.g., Patil, Deshmukh, Chavan, Shinde) and first names (Aditya, Anjali, Rutuja, Shreyas).
- **Automatic Hierarchy:** The script automatically assigns `managerId` references to construct a realistic chain of command from Juniors up to the CEO (Amit Lakade).
- **Data Initialization:** Generates varied `joiningDate` and `dateOfBirth` fields to populate the Headcount and Upcoming Events dashboard charts.

---

## Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/lakadeamit220/hr-dashboard-nextjs.git
   cd hr-dashboard-nextjs
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Generate Mock Data (Optional - already included):**
   ```bash
   node generate-mock.js
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **View the Application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

6. **Run a Production Build (Verification):**
   To ensure the application compiles flawlessly without type or routing errors:
   ```bash
   npm run build
   ```

---

## Verification Guide (How to Test)

Once the application is running, follow these steps to verify all features are working correctly:

### 1. Testing the Vanta Globe
- Ensure the background displays a beautiful 3D interactive globe. Moving your mouse should rotate the globe slightly based on cursor position.

### 2. Testing the Dashboard
- Verify the **Headcount Growth** Area chart is rendering data.
- Verify the **Upcoming Events** widget shows birthdays or anniversaries (if any are populated within 30 days of the current date).

### 3. Testing Search & Filtering
- Navigate to the **Employees** page from the sidebar.
- Type "Amit" into the search bar. The list should instantly filter to show "Amit Lakade".
- Clear the search and change the **Department** filter to "Engineering". Notice only engineering staff appear.
- Change the **Status** filter to "On Leave" to see only employees currently on leave.

### 4. Testing CRUD & Action Buttons
- Look at any employee row and notice the **View**, **Edit**, and **Delete** icons are permanently visible on the far right.
- Click **"Add Employee"**.
- Try submitting the form *without* filling it out. Notice the red validation errors beneath required fields.
- Fill out the form correctly, optionally uploading an image via the "Choose File" button.
- Submit the form. Notice the modal closes, a green **Success Toast** appears, and the new employee instantly appears at the top of the list.
- Test the **Delete** button directly from the row.

### 5. Testing Avatar Generation
- Look at any employee row without a photo. You will see a vibrantly colored circle with their initials.

### 6. Testing the Organizational Chart
- Click the **Org Chart** link in the sidebar.
- Verify that **Amit Lakade (CEO)** is at the top of the tree.
- Click and drag anywhere on the background to **Pan** around the chart.
- Use the Zoom In/Out controls in the top right to scale the massive chart.
- Click the chevron (arrow) button at the bottom of any manager's card to collapse or expand their reporting branch.
