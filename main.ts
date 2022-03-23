import { NextFunction } from "connect";
import Express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  require("source-map-support").install();
}

const app = Express();

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Generic middlewares - logging, body parsing, etc.
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `Protocol: ${req.protocol}| httpVersion: ${req.httpVersion}| Method: ${req.method}| ${req.originalUrl}| from: ${req.ip} `
  );
  next();
});

app.use("/bills", require("./routes/bills").default);

// Error handler and 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).send({ text: "Not Found", url: req.originalUrl });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ text: "Internal Server Error", url: req.originalUrl });
});

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
