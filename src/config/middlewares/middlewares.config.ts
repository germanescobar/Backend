import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export default function middlewares(app: express.Express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ credentials: true }));
  app.use(cookieParser());
}
