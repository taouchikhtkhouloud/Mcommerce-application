FROM node:20.1.0

# Create App Directory
WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 3003

CMD ["npm","start"]