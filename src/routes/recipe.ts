import { Router } from "express"

const router = Router()

router.get("/edit/:id", (req, res) => {
  res.end("Editing recipe with id " + req.params.id)
})

router.get("/edit", (req, res) => {
  res.end("Specify a recipe id: /recipe/edit/<id>")
})

router.get("/", (req, res) => {
  res.end("Available actions: \r\n -  /recipe/edit")
})

export default router
