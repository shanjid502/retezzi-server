import { Request, Response, Router } from 'express';

const router = Router();

const demoRouter = Router();

demoRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'Hello from Demo API! 🎉',
  });
});

demoRouter.get('/user', (_req: Request, res: Response) => {
  res.json({
    id: '12345',
    name: 'John Doe',
    role: 'tester',
    country: 'Bangladesh',
  });
});

demoRouter.get('/random', (_req: Request, res: Response) => {
  res.json({
    randomNumber: Math.floor(Math.random() * 9999),
    timestamp: new Date().toISOString(),
  });
});

const moduleRoutes = [
  {
    path: '/',
    route: demoRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
