
# Org Chart Backend (Go + Gin)

## Overview

This Go backend serves employee data via a simple REST API built with [Gin](https://github.com/gin-gonic/gin). It caches employee data in memory so that subsequent requests do not require refetching from the remote JSON endpoint. By default, it listens on port `8080` and exposes one primary endpoint:

- **`GET /employees`** – Returns a JSON array of employees.

## Prerequisites

- [Go 1.18+](https://golang.org/dl/) (any recent version should work).
- A working internet connection (the first request to `/employees` fetches data from a remote JSON URL if the cache is empty).

## Getting Started

1. **Install dependencies**:
   ```bash
   go mod tidy
   ```

2. **Run the server**:
   ```bash
   go run ./cmd/main.go
   ```
   By default, the server will start on [http://localhost:8080](http://localhost:8080).

3. **Check the endpoint**:
   - In a browser or using a tool like `curl`, go to [http://localhost:8080/employees](http://localhost:8080/employees).
   - You should see a list of employees in JSON format.

## Project Structure

```
.
├── cmd
│   └── main.go                # Entry point (starts the server, configures routes)
├── config
│   └── employees.go           # (Optional) Additional config or struct definitions 
├── internal
│   ├── employees
│   │   └── employees.go       # Core logic for fetching/caching employees
│   └── handlers
│       └── employees_handler.go # HTTP handler functions using Gin
├── go.mod
└── go.sum
```

### Key Files

- **`cmd/main.go`**: Initializes the Gin engine, sets up routes and CORS, and runs the server.
- **`internal/employees/employees.go`**: Defines the `Employee` struct and contains the logic to fetch and cache employee data.
- **`internal/handlers/employees_handler.go`**: Implements the HTTP handler function for the `/employees` route.

## Configuration

- **CORS**:  
  Configured in `main.go`. By default, it allows requests from `http://localhost:5173` (where the [Vite](https://vitejs.dev/) React app typically runs). Adjust this origin if you’re hosting the frontend elsewhere.

- **Remote Employee URL**:  
  Defined in `internal/employees/employees.go` as `employeesURL`. You can update this value if you have a different data source.

- **Port**:  
  Set to `:8080` in `main.go`. Feel free to change this to another port if needed.

## Usage

After the server is running, you can test the endpoint directly:

```bash
curl http://localhost:8080/employees
```

or from the React frontend by configuring the frontend’s base URL.

## Deployment

1. **Build** a production binary:
   ```bash
   go build -o myapp ./cmd/main.go
   ```
2. **Run** the binary:
   ```bash
   ./myapp
   ```
3. Your server will be running on `http://localhost:8080` (or whichever port you specify in your code).
