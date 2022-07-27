const aws = require("aws-sdk");
const { Validate,
        Sanitize,
        Generate } = require("../../utils");

const signS3Url = async (req, res) => {
  if (!req.body.file_name || !req.body.file_type)
    return Generate.generateApiOutput(res, 400, "error", "Informe o nome e o tipo do arquivo a ser carregado");

  const s3 = new aws.S3();
  const fileName = req.body.file_name;
  const fileType = req.body.file_type;

  aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const S3_BUCKET = process.env.AWS_BUCKET;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 3000,
    ContentType: fileType,
    ACL: "public-read"
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) return Generate.generateApiOutput(res, 500, "error", err);

    return Generate.generateApiOutput(res, 200, "success", {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    });
  });
}

module.exports = {
  signS3Url
}
