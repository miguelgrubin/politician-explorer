# Instructions

1. Start all services using [Docker](https://docs.docker.com/get-docker/)

   `docker compose up`

2. Check elasticsearch status

   `curl -X GET "localhost:9200/_cat/nodes?v&pretty"`

3. Check back-end status visiting Swagger. Open `http://0.0.0.0:3000/docs` into your browser

4. Run front server

   ```
   cd ./front
   yarn install
   yarn dev
   ```

5. Open `http://0.0.0.0:5173/` into your browser
