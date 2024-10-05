FROM node:20 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

# Install dependencies
RUN npm install

# Copy all files for building
COPY . .

ENV VITE_APPWRITE_PROJECT_ID="66a4f489002e89c320f8"
ENV VITE_APPWRITE_BUCKET_ID="66a4f4c20003ad38b65b"
ENV VITE_APPWRITE_FILE_ID="66a5034200138b4f0365"
ENV VITE_APPWRITE_CV_ID="66a66802001d6a29ab11"
ENV VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
ENV VITE_BACKEND_BASE_URL="https://portfolio-backend.backend-server.bookjn.in/api/v1"
ENV VITE_BACKEND_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiaHR0cHM6Ly9nYXVyYXYtc2FoaXR5YS5uZXRsaWZ5LmFwcCIsImlhdCI6MTcyODEzNDEyMH0.eOfrLBrPAMbII5k9yIe3V8DM0NsfzDvYxrw_WukPo4Q"
ENV VITE_BACKEND_API_TIMEOUT=5000


# Build the static files
RUN npm run build

# Use NGINX to serve the static files
FROM nginx:alpine

# Copy the built files from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
