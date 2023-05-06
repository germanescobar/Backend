import express from 'express';
import cors from 'cors';
import cookies from 'cookie-parser';

export default function middlewares(app: express.Express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use();
}
