FROM node

WORKDIR /app

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm install 

EXPOSE 3000 

CMD ["node", "./server"]