# MC-Web Development Instructions

MC-Web is a React + Vite web application with Express.js backend components. The project uses Firebase integration and serves as a bakery e-commerce platform (based on the server.js API comment).

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Setup
- Ensure Node.js v20+ is installed (project validated on v20.19.4)
- NPM v10+ is recommended (project validated on v10.8.2)

### Initial Setup (Fresh Clone)
**Run these commands in this exact order:**
1. `npm install` -- takes ~30 seconds. Install all dependencies first.
2. Validate the setup by running `npm run build` -- takes ~1.5 seconds. NEVER CANCEL.

### Build and Development Commands
**CRITICAL TIMING AND TIMEOUT INFORMATION:**

- `npm install` -- takes 30 seconds, use 120-second timeout minimum
- `npm run build` -- takes 1.5 seconds, use 60-second timeout minimum  
- `npm run lint` -- takes 0.5 seconds, use 30-second timeout minimum
- `npm run dev` -- starts in 0.2 seconds, runs indefinitely until stopped
- `npm run preview` -- starts in 0.5 seconds, runs indefinitely until stopped

**NEVER CANCEL build or lint commands even if they appear to hang - wait for completion.**

### Development Workflow
**Frontend Development (React + Vite):**
- Start development server: `npm run dev`
- Access at: http://localhost:5173/
- Hot Module Replacement (HMR) is enabled
- Server starts in ~211ms

**Production Build:**
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Preview serves at: http://localhost:4173/
- Built files are output to `dist/` directory

**Backend Development (Express.js):**
- **IMPORTANT**: The Express server (`server.js`) has a configuration issue
- **Issue**: server.js uses CommonJS `require()` but package.json is configured as ES module
- **Current Status**: `node server.js` fails with "require is not defined" error
- **Workaround**: Either rename server.js to server.cjs OR rewrite using ES6 import syntax
- **Do NOT try to run the Express server without fixing this issue first**

## Code Quality and Validation

### Linting
- Run linting: `npm run lint`
- **Known Issues**: server.js will show linting errors due to CommonJS in ES module context
- Expected errors: 'require' is not defined, 'process' is not defined
- **These errors are expected until server.js is converted to ES modules**

### Before Committing
**ALWAYS run these commands before committing changes:**
1. `npm run build` -- ensure build succeeds
2. `npm run lint` -- check for linting issues (expect server.js errors)

## Manual Validation Requirements

### Testing Frontend Changes
**ALWAYS test these scenarios after making frontend changes:**
1. Start development server: `npm run dev`
2. Open http://localhost:5173/ in browser or test with curl
3. Verify the React app loads and displays "Vite + React" title
4. Test the counter button functionality (click to increment)
5. Verify Hot Module Replacement works by editing src/App.jsx
6. Build and test production version: `npm run build && npm run preview`
7. Access http://localhost:4173/ to test production build

### Testing Backend Changes
**If you fix the server.js ES module issue:**
1. Fix server.js to use ES6 imports instead of require()
2. Test with: `node server.js`
3. Verify server starts on port 5000 (or PORT environment variable)
4. Test with: `curl http://localhost:5000/`
5. Expect response: "Bakery E-commerce API is running!"

## Repository Structure and Key Files

### Configuration Files
- `package.json` -- Project dependencies and scripts
- `vite.config.js` -- Vite bundler configuration  
- `eslint.config.js` -- ESLint linting rules
- `index.html` -- Main HTML template

### Source Code Structure
```
src/
├── App.jsx          -- Main React component
├── App.css          -- App-specific styles  
├── main.jsx         -- React application entry point
├── index.css        -- Global styles
└── assets/          -- Static assets (images, etc.)
```

### Build Output
- `dist/` -- Production build output (created by `npm run build`)
- Contains minified and optimized files for deployment

### Server Components
- `server.js` -- Express.js API server (NEEDS ES MODULE FIX)
- Intended to serve bakery e-commerce API endpoints

## Common Issues and Solutions

### Build Issues
- If build fails, ensure `npm install` completed successfully
- Delete `node_modules` and `package-lock.json`, then run `npm install` if dependencies are corrupted

### Development Server Issues  
- If dev server won't start, check if port 5173 is available
- Use `--port` flag to specify different port: `npm run dev -- --port 3000`

### Linting Issues
- server.js will always show ESLint errors until converted to ES modules
- These errors are expected and do not affect frontend development
- Focus on fixing actual code issues, not the server.js module format errors

## Time-Sensitive Operations

**NEVER CANCEL these operations:**
- `npm install` -- typically 30 seconds, set 120+ second timeout
- `npm run build` -- typically 1.5 seconds, set 60+ second timeout  
- `npm run lint` -- typically 0.5 seconds, set 30+ second timeout

**Long-running operations (require manual stopping):**
- `npm run dev` -- runs until manually stopped (Ctrl+C)
- `npm run preview` -- runs until manually stopped (Ctrl+C)
- `node server.js` -- runs until manually stopped (once ES module issue is fixed)

## Firebase Integration

The project includes Firebase dependencies:
- `firebase@^12.2.1` in package.json
- No Firebase configuration visible in current codebase
- Firebase integration may be planned or partially implemented

## Key Project Commands Summary

| Command | Purpose | Duration | Notes |
|---------|---------|----------|-------|
| `npm install` | Install dependencies | ~30s | Run first on fresh clone |
| `npm run dev` | Start dev server | ~0.2s startup | Runs on http://localhost:5173/ |
| `npm run build` | Build for production | ~1.5s | Output to dist/ |
| `npm run preview` | Preview production build | ~0.5s startup | Runs on http://localhost:4173/ |
| `npm run lint` | Run ESLint | ~0.5s | Expect server.js errors |
| `node server.js` | Start Express server | N/A | Currently broken - needs ES module fix |

**Remember: Always validate your changes by running the development server and testing actual functionality, not just checking that commands execute successfully.**