# HR Dashboard (Next.js MVP)

A modern, highly-responsive Human Resources Dashboard built with Next.js 16 (App Router), Tailwind CSS v4, and Zustand. 
This application serves as an Employee Management System MVP, featuring robust CRUD operations, dynamic filtering, interactive data visualization, and an elegant, premium user interface.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19) utilizing the new App Router (`src/app`).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (No configuration file, fully CSS-native using `@theme`).
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) for blazing-fast, boilerplate-free global state (Client-side).
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) for performant client-side validation without heavy libraries like Zod.
- **Charts:** [Recharts](https://recharts.org/) for beautiful, responsive data visualization.
- **Icons:** [Lucide React](https://lucide.dev/) for crisp, modern SVG iconography.

---

## Features & Functionality

### 1. Dashboard Overview
- **KPI Metrics:** View high-level statistics like Total Employees, Active Employees, On-Leave count, and Average Salary.
- **Data Visualization:** Interactive bar charts displaying Employee Headcount by Department, and Performance Rating distribution.

### 2. Employee Directory
- **View Modes:** Toggle seamlessly between a visually rich **Grid View** (Cards) and a highly scannable **List View** (Table).
- **Advanced Search & Filtering:**
  - Instantly search employees by Name, Email, or Designation.
  - Filter by Department (e.g., Engineering, HR, Sales).
  - Filter by Status (Active, On-Leave, Notice Period, Inactive).
- **Dynamic Avatars:** Employees without a profile photo receive a beautifully colored avatar, dynamically generated using a hash of their name.
- **Document Indicators:** Instantly see which employees have uploaded documents via stylized file count badges.

### 3. Employee Management (CRUD)
- **Add & Edit (Forms):** A slick, slide-in Modal containing a polished, fully validated form to capture employee details (Name, Contact, Department, Salary, Rating, etc.).
- **Simulated Server Actions:** Form submissions are passed to Next.js `use server` actions, mimicking actual backend operations, and then optimistically update the Zustand store on success.
- **Profile Photo Upload:** Select an image file to instantly convert it to Base64 and preview it before submitting.
- **Secure Deletion:** Employees can be deleted from the Edit screen after confirming a browser prompt.
- **Toast Notifications:** Smooth, animated success/error notifications appear in the bottom right upon completing operations.

### 4. Employee Details & Documents
- **Read-Only Detail Panel:** Click "View" on any employee to open a detailed, read-only summary panel containing all their data and their dynamically colored avatar.
- **Document Previews & Downloads:** If an employee has mock documents (e.g., Amit Lakade), you can view a list of them in both the Detail Panel and Edit Form. Clicking "View" or "Download" generates a simulated browser-native download using `Blob` objects.

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

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

5. **Run a Production Build (Verification):**
   To ensure the application compiles flawlessly without type or routing errors:
   ```bash
   npm run build
   ```

---

## Verification Guide (How to Test)

Once the application is running, follow these steps to verify all features are working correctly:

### 1. Testing Search & Filtering
- Navigate to the **Employees** page from the sidebar.
- Type "Amit" into the search bar. The list should instantly filter to show "Amit Lakade".
- Clear the search and change the **Department** filter to "Engineering". Notice only engineering staff appear.
- Change the **Status** filter to "On Leave" to see only employees currently on leave.

### 2. Testing View Modes
- On the Employees page, locate the toggle buttons on the far right of the search bar.
- Click the **List icon** to see the table view.
- Click the **Grid icon** to see the card view.
- Both views should reflect the same filtered data.

### 3. Testing CRUD & Form Validation
- Click **"Add Employee"**.
- Try submitting the form *without* filling it out. Notice the red validation errors beneath required fields.
- Fill out the form correctly, optionally uploading an image via the "Choose File" button.
- Submit the form. Notice the modal closes, a green **Success Toast** appears, and the new employee instantly appears at the top of the list.

### 4. Testing Avatar Generation
- If you added a new employee without uploading a photo, look at their card/row. You will see a vibrantly colored circle with their initials.

### 5. Testing Document Features
- Find **Amit Lakade** in the list. Notice the blue document badge showing "1" next to his department/status.
- Click **"View"** on his card/row.
- Scroll to the bottom of the Detail Panel to see the "Offer Letter" document.
- Click **"View"** on the document to open a simulated preview in a new browser tab.
- Alternatively, click **"Edit Details"**, scroll down, and click **"Download"** on the document to trigger a browser download of a simulated text file.

### 6. Testing Deletion
- Click **"Edit"** on any employee.
- Click the red **"Delete"** button at the bottom left.
- Confirm the browser prompt.
- Notice the success toast and the immediate removal of the employee from the UI.
