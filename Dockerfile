FROM node:16.13.2-alpine3.15
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:app package*.json .
RUN npm install
COPY --chown=app:app . .
ENV CODEIAL_DEVELOPMENT=production
EXPOSE 3000
CMD ["npm","start"]