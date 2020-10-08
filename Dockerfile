FROM mhart/alpine-node:12
WORKDIR /app
COPY package.json package-lock.json ./

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

RUN npm ci --prod

# Then we copy over the modules from above onto a `slim` image
# FROM mhart/alpine-node:slim-12
#COPY .env /app/
#COPY index.js /app/
#COPY lib /app/
#COPY client/build /app/
#COPY node_modules /app/
COPY . .

EXPOSE 3000

WORKDIR /app
CMD ["node", "index.js"]
