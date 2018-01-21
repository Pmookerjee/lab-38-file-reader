### Setup

1. Run `npm i` from the root directory to install node modules
2. `cd frontend` and create a .env file with `API_URL=http://localhost:3000` and `NODE_ENV=dev`
3. `cd backend` and create a .env file with the following: 
PORT=3000
DB_URL='mongodb://localhost:27017/{name_of_your_db}'
AWS_BUCKET={name_of_your_bucket_on_amazon}
AWS_ACCESS_KEY_ID={your_access_key_id}
AWS_SECRET_ACCESS_KEY={your_secret_code}
4. In a terminal, `cd frontend`, then `npm run watch` to start webpack and react 
5. In a 2nd terminal, run `mkdir db`, then run `mongod --dbpath=./db` to run mongo 
6. In a 3rd terminal, `cd backend`, then `npm start` to start the server


Upon signup, user can view costumes and profile routes.