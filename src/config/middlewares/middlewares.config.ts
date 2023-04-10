import express from 'express';
import cors from 'cors';

export default function middlewareInit(app: express.Express) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
}
