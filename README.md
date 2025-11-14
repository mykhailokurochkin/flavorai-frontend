# FlavorAI

FlavorAI is a modern web application for discovering, sharing, and managing recipes.

---

## Running the Project with Docker

### Prerequisites

- [Docker](https://www.docker.com/get-started) must be installed on your system.

### Option 1: Run Frontend Only

This is useful for frontend development or testing.

**1. Build the Image:**
From the project root, run:
```bash
docker build -t flavorai-frontend .
```

**2. Run the Container:**
This command starts the frontend on port `3000`.
```bash
docker run -p 3000:3000 flavorai-frontend
```

**3. Access the App:**
Open your browser and go to: [http://localhost:3000](http://localhost:3000)

---

### Option 2: Run Full Application (Frontend + Backend)

This is the recommended approach for a full development experience, as the frontend relies heavily on the backend for data and functionality.

**1. Prerequisites:**
- [Docker Compose](https://docs.docker.com/compose/install/) must be installed.
- **Crucially, you must clone and set up the backend repository.**
  - **Backend Repository:** [FlavorAI backend Repository](https://github.com/mykhailokurochkin/flavorai-backend)

**Important Note on Connection:**
The frontend application runs on port `3000` and is configured to connect to the backend service at `http://localhost:4000`. Ensure your backend is running and accessible on this address.

**2. Project Structure:**
Organize your projects in a parent directory like this:
```
/flavorai-app
├── /flavorai-frontend  (this project)
├── /flavorai-backend   (your backend project)
└── docker-compose.yml
```

**3. Create `docker-compose.yml`:**
Create the `docker-compose.yml` file in the parent directory (`/flavorai-app`) with the following content:
```yaml
version: '3.8'
services:
  frontend:
    build: ./flavorai-frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./flavorai-backend
    ports:
      - "5000:5000" # Or your backend's port
    environment:
      - DATABASE_URL=... # Add backend environment variables
```

**4. Run Docker Compose:**
From the directory containing your `docker-compose.yml` file, run:
```bash
docker-compose up --build
```

This will build and start both services. The frontend will be available at [http://localhost:3000](http://localhost:3000).
