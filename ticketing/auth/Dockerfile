# Specify a base image
FROM node:alpine

# Specify application working directory
WORKDIR /app

# Install dependencies
COPY ./package.json ./
RUN npm install --omit=dev
COPY ./ ./

# Default start command
CMD ["npm", "start"]