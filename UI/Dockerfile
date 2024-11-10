# Build stage
FROM node:18 AS build

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the code
COPY . /app

# Build the Next.js app
RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy the built app from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public

# Copy the rest of the code
COPY . /app

# Install only production dependencies
RUN yarn install --production

# Expose the port
EXPOSE 3000

# Start the app using next start
CMD ["yarn", "start"]
