# Dev mode
FROM node:20-slim

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./

# Use clean install for reproducibility
RUN npm ci

# Copy all project files
COPY . .

# Expose Vite's dev server port
EXPOSE 5173

# Run Vite in dev mode, accessible from host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
