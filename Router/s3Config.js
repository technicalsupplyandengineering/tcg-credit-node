const express = require("express");
const router = express.Router();
const multer = require("multer");
const aws = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage });

aws.config.update({
  accessKeyId: "AKIA6EWASL26OHYHTZ2Y",
  secretAccessKey: "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",
  region: "us-east-1"
});

const s3 = new aws.S3();

router.post("/image-upload", upload.array("files", 3), async (req, res) => {
  const files = req.files;
  const urls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const params = {
      Bucket: 'tcg-docstore',
      Key: file.originalname,
      Body: file.buffer
    };

    try {
      const data = await s3.upload(params).promise();
      urls.push(data.Location);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  res.status(200).send({ urls });
});
module.exports = router;