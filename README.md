# My First Full Stack App

This is a beginner-friendly full stack web application built using Python (FastAPI) for the backend and HTML, CSS, and JavaScript for the frontend.

## Table of Contents

1.  [Introduction](#introduction)
2.  [Project Structure](#project-structure)
3.  [Setup and Installation](#setup-and-installation)
4.  [Usage](#usage)
5.  [Contributing](#contributing)
6.  [License](#license)

---

### Introduction

This project serves as a foundational example for building full stack web applications. It demonstrates how to set up a basic project structure, integrate a Python backend with a simple HTML/JavaScript frontend, and manage project dependencies.

---

### Project Structure

The project follows a standard directory structure:

```
my_first_fullstack_app/
├── backend/          # Python backend code
│   ├── venv/         # Virtual environment
│   └── main.py       # Main Python script
├── frontend/         # HTML, CSS, JS frontend code
│   ├── index.html    # Main HTML file
│   └── script.js     # JavaScript file
└── README.md         # Project documentation
```

---

### Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd my_first_fullstack_app
    ```
    *(Note: For this initial setup, we have not created a Git repository yet. This section is a template for future use.)*

2.  **Set up the backend:**
    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Create and activate a virtual environment:
        ```bash
        python -m venv venv
        # On Windows: .\\venv\\Scripts\\activate
        # On macOS/Linux: source venv/bin/activate
        ```
    *   Install backend dependencies:
        ```bash
        pip install fastapi uvicorn
        ```

3.  **Set up the frontend:**
    *   Navigate to the frontend directory:
        ```bash
        cd ../frontend
        ```
    *   No specific setup is required for this basic frontend, as it uses plain HTML and JavaScript.

---

### Usage

1.  **Run the backend server:**
    *   Navigate back to the `backend` directory.
    *   Ensure your virtual environment is activated.
    *   Run the FastAPI application:
        ```bash
        uvicorn main:app --reload
        ```
        *(Note: For this lesson, `main.py` only contains a print statement. In a real FastAPI app, you would define API routes here.)*

2.  **Open the frontend in your browser:**
    *   Open the `frontend/index.html` file directly in your web browser.

---

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
*(Note: A LICENSE.md file is not yet created.)*
