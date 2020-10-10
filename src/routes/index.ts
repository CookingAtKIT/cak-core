import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.end("Try /recipe")
})

export default router
