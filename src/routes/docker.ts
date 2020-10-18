import { Router } from "express";
const router = Router();

router.get("/health", (req, res) => {
  res.status(200);
  res.end();
});

export default router;
