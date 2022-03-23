import { Router } from "express";
import BillController from "../controllers/BillController";

const router = Router();

router.post("/:id/total", (req, res) => {
  const partial = BillController.calcTotal(
    req.body.persons as string[],
    req.body.items as number[]
  );
  res.send({ partial });
});

export default router;
