FROM node:18-slim
WORKDIR /app/
COPY package*.json ./
RUN yarn global add server
RUN yarn install
COPY . .
RUN yarn run build
RUN yarn global add serve
ENV NODE_ENV production
ENV NEXT_SHARP_PATH=/app/node_modules/sharp
COPY public ./public
EXPOSE 3000
CMD ["npm", "run", "preview"]
