#  Will create a node environment in the container
FROM node
#  Will create a directory app and switch to that directory
WORKDIR /app
# Copies package.json file to /app directory
COPY package.json .

COPY . .

#  Runs npm install to create node_modules for your app
RUN npm install
RUN npm install react-router-dom 
RUN npm install @mui/material

#  Exposes the port to access the app from outside the container i.e from the browser
EXPOSE 5173
#  Executes npm run dev to start the server
CMD ["npm", "run", "dev"]