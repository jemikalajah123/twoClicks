const buyrequest = require("../models/buyrequest")
const sellrequest = require("../models/sellrequest")
const { log } = require("../../logger")

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let tutorials = [];

      rows.forEach((row) => {
        let tutorial = {
          id: row[0],
          title: row[1],
          description: row[2],
          published: row[3],
        };

        tutorials.push(tutorial);
      });

      Tutorial.bulkCreate(tutorials)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getRequests = async (req, res) => {
  try {
    const requestType = req.params.requesttype
    const{page, limit} = req.body

    const options = {
      page: Number(page) || 1,
      limit: limit !== null ? limit : 20,
      sorted: {createdAt: "desc"},
    }
    if(requestType === "BuyRequests"){
      const RequestData = await buyrequest.paginate(options)
      return res.status(200).json({
        status: "successful",
        data:  RequestData,
        message: "Data Sent"
      })
    }
    else if(requestType === "SellRequests"){
      const RequestData = await sellrequest.paginate(options)
      return res.status(200).json({
        status: "successful",
        data:  RequestData,
        message: "Data Sent"
      })
    }else{
      return res.status(404).json({
        status: "failed",
        data: {},
        message: "Invalid Params"
      })
    }
    
  } catch (error) {
    log('Server Error!', error.message, "dafault")
    return res.status(500).json({
      status: "failed",
      message:  error.message || "Some error occurred while retrieving"
    })
  }
};

module.exports = {
  upload,
  getRequests,
};