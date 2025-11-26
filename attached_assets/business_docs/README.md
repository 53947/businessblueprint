# Business Blueprint

Creates Digital Intelligence

## Overview



## Features


## Tech Stack


## Getting Started

### Prerequisites


### Installation

```bash

```

### Configuration



### Running the Application

```bash

```

## Project Structure

```

```

## Documentation


## Contributing



## License



## Contact



## Asset Management

This application includes a built-in Asset Management system accessible from the authenticated dashboard.

### Upload Favicon

1. Navigate to Settings → Asset Management (or Asset Management page)
2. Click "Upload Favicon"
3. Select an ICO, PNG, or SVG file (max 2MB)
4. Preview and confirm
5. Favicon updates immediately in browser tabs

### Upload Company Logo

1. Navigate to Settings → Asset Management
2. Click "Upload Logo"
3. Select a PNG or SVG file (max 2MB)
4. Set as active to display in header
5. Logo updates across the application

### File Storage

- Assets stored in `/uploads` directory (or Replit App Storage for production)
- Metadata tracked in PostgreSQL `assets` table
- Served via `/uploads/:filename` route
- All uploads require authentication
