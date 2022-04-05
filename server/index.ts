import {
  login_cellphone,
  cloud,
  user_cloud,
  user_cloud_detail,
  song_url,
} from "NeteaseCloudMusicApi";

import * as express from "express";
const app = express();
const multer = require("multer");
const upload = multer();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
function tryExcute(
  excute: Function,
  errorHandel?: (error: any) => void
): Promise<void> {
  return new Promise(async () => {
    try {
      await excute();
    } catch (error) {
      console.log("error", error);
      errorHandel?.(error);
    }
  });
}

app.post("/cloud", upload.single("songFile"), async function (req, res, next) {
  const cookie = req.get("CK");
  await tryExcute(async () => {
    const { originalname, buffer } = req.file;
    const result = await cloud({
      songFile: {
        name: originalname,
        data: Buffer.from(buffer),
      },
      cookie,
    });
    res.send(result);
  });
});

app.listen(3100);
console.log("api listen on 3100...");
