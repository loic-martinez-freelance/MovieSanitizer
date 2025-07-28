# MovieSanitizer 🎬

A mostly vibe coded desktop application for managing your local movie library with metadata fetching and organization.

I was using an old big app for movie management and was only using one single feature : Fetching metadata and renaming.
So I vibe coded this.

## Features

- **Local Movie Library Management**: Organize and browse your local movie collection
- **Automatic Metadata Fetching**: Retrieve movie information, posters, and details from TMDB
- **Smart File Organization**: Clean and organize movie files with proper naming conventions
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Real-time Updates**: Automatically detect and add new movies to your library

## Screenshots

_Screenshots will be added here_

## Technology Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Backend**: Electron (Node.js)
- **Architecture**: Hexagonal Architecture (Ports & Adapters)
- **Build Tool**: Vite + Electron Builder
- **UI Components**: Radix UI + Lucide React Icons

## Prerequisites

- Node.js 18+
- npm or yarn
- TMDB API Token

## Installation

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd MovieSanitizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)

   ```bash
   cp example.env .env
   ```

   Edit `.env` and add your TMDB API token:

   ```
   DB_TOKEN=your_tmdb_api_token_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Production Build

```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

## Usage

1. **Select Library Folder**: Choose the directory containing your movie files
2. **Browse Movies**: View your movie collection with automatic metadata
3. **Organize Files**: Clean up movie file names and organize your library

## Project Structure

```
MovieSanitizer/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── adapters/         # External system adapters
│   │   ├── domain/           # Business logic (use cases, ports)
│   │   └── index.ts          # Main process entry point
│   ├── preload/              # Electron preload scripts
│   └── renderer/             # React frontend
│       └── src/
│           ├── components/   # React components
│           ├── hooks/        # Custom React hooks
│           └── lib/          # Utility functions
├── docs/                     # Architecture and use case documentation
└── resources/                # App icons and assets
```

## Architecture

MovieSanitizer follows a **Hexagonal Architecture** pattern with clear separation between:

- **Domain Layer**: Business logic and use cases
- **Ports**: Interfaces for external dependencies
- **Adapters**: Concrete implementations for file system, HTTP, configuration, etc.

This architecture ensures:

- Testability and maintainability
- Loose coupling between components
- Easy extension and modification

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript type checking
- `npm run start` - Preview production build

### Code Style

The project uses:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## Configuration

The app stores configuration in the user's data directory:

- **Windows**: `%APPDATA%/MovieSanitizer/`
- **macOS**: `~/Library/Application Support/MovieSanitizer/`
- **Linux**: `~/.config/MovieSanitizer/`

## Troubleshooting

### Common Issues

1. **Movies not loading**: Check that your library folder path is correct
2. **Metadata not fetching**: Verify your TMDB API token in the `.env` file
3. **Build errors**: Ensure you have the correct Node.js version installed

### Getting Help

- Check the [documentation](./docs/) for detailed architecture and use case information
- Open an issue on GitHub for bugs or feature requests

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for movie metadata API
- [Electron](https://electronjs.org/) for the desktop framework
- [React](https://reactjs.org/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
