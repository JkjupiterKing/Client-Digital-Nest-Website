Client Digital Nest Website

A responsive corporate website developed for Client Digital Nest using HTML, CSS, and JavaScript. The website includes reusable components such as a common Header and Footer, which are loaded across all pages for easy maintenance and consistency.

Features
Responsive Navigation Bar
Reusable Header Component
Reusable Footer Component
Modern UI Design
Mobile-Friendly Layout
Service Pages
Industry Pages
Solution Pages
About Us Page
Contact Section
Smooth Navigation
Clean Code Structure


Technologies Used
HTML5
CSS3
JavaScript (Vanilla JS)

Project Structure
client-digital-nest/
│
├── home/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── services/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── industries/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── solutions/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── about/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── contact/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── css/
│   └── (global styles, if any)
│
├── js/
│   └── (global scripts, if any)
│
├── components/
│   ├── header/
│   │   ├── header.html
│   │   ├── header.css
│   │   └── header.js
│   │
│   └── footer/
│       ├── footer.html
│       ├── footer.css
│       └── footer.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos/
│
└── README.md


How Header and Footer Work

Header is stored separately in:
components/header/

Footer is stored separately in:
components/footer/

Every page contains:
<div id="header"></div>
<div id="footer"></div>

JavaScript fetch() loads the Header and Footer automatically.
Any changes made to header.html or footer.html will reflect across all pages.


Installation
Clone Repository
git clone https://github.com/yourusername/client-digital-nest.git

Open Project
cd client-digital-nest

## Running Commands

You can start the site locally using one of the following commands:
- **Live Server (VS Code extension)**: No command needed, just right‑click `index.html` → **Open with Live Server**.
- **Node http‑server**:
```bash
npx http-server -c-1
```
- **Python SimpleHTTPServer**:
```bash
python -m http.server 8000
```

Run Website

You can serve the site locally using any of the following methods:

1. **VS Code Live Server**: Open the project folder in VS Code, right‑click `index.html` (or any page) and select **Open with Live Server**.
2. **Node http‑server** (if you have Node.js installed):
   ```bash
   npx http-server -c-1
   ```
   Then open `http://localhost:8080` in your browser.
3. **Python SimpleHTTPServer** (Python 3):
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`.
4. **Direct file open**: Double‑click `index.html` in the file explorer to open it in your default browser.

Choose the method you prefer; all will load the Home page (`home/index.html`) as the entry point.

Pages Included
Home
Services
Industries
Solutions
About Us
Contact


Expected Outcome

A professional, responsive, and maintainable corporate website with reusable Header and Footer components, reducing code duplication and making future updates easier.

Author
Client Digital Nest Website Project
Developed using HTML, CSS, and JavaScript.

primary reference website:
https://qdata.co.in/
