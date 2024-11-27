npm install --global yarn
yarn install
yarn dev

docker build -t ui .
docker run --name ui_airu -p 3000:3000 ui
