FROM git.example.com:5009/docker/node:latest

# Copy application files
COPY ./build /usr/local/app/
WORKDIR /usr/local/app/

RUN npm install && npm cache clean

CMD ["node", "server.js" ]
