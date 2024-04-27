import express, { Request, Response } from "express";
import { body } from "express-validator";
import "express-async-errors";
import { BadRequestError, validateRequest } from "@vizlogic/commonsameer";
import { markdownToHtml } from "../utils/Mark";
const router = express.Router();

router.post(
  "/user/convert",
  [
    body("markdown").isString().withMessage("markdown must be string !"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { markdown } = req.body;
    const html = markdownToHtml(markdown);
    res.json({ html });
  }
);

export default router;
