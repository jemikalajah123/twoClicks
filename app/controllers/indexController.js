const Buyrequest = require("../models/buyrequest")
const Sellrequest = require("../models/sellrequest")
const { log } = require("../../logger")
const xlsxFile = require('read-excel-file/node');
 

const upload = async (req, res) => {

xlsxFile('./code Challende Trade Requests Template.xlsx', { sheet: 'IPHONES' }).then((rows) => {

  let buyRequests = []
  let sellRequests = []
  let phoneName = ""

  const checkTitle = (row) => {

    switch (row[0]) {
      case "iPhone XS Max":
        setTitle(row[0])
        break;
      case "iPhone XS":
        setTitle(row[0])
        break;
  
      case "iPhone XR":
        setTitle(row[0])
        break;

      case "iPhone X":
        setTitle(row[0])
        break;

      case "iPhone 8 PLUS":
        setTitle(row[0])
        break;
  
      case "iPhone 8":
        setTitle(row[0])
        break;

      case "iPhone 7 Plus":
        setTitle(row[0])
        break;

      case "iPhone 7":
        setTitle(row[0])
        break;

      case "iPhone 6S Plus":
        setTitle(row[0])
        break;

      case "iPhone 6S":
        setTitle(row[0])
        break;
      case "iPhone 6 Plus":
        setTitle(row[0])
        break;
        
      case "iPhone 6":
        setTitle(row[0])
        break;

      case "iPhone SE":
        setTitle(row[0])
        break;       
    
      default:
        break;
    }
  }

  const setTitle = (row) => {
    phoneName = row
    rows.shift()
  }

  rows.forEach((row) => {

    checkTitle(row)

    let buyrequest = {
      phoneName: phoneName,
      storageSize: row[1],
      New: row[2],
      A1: row[3], 
      A2: row[4],
      B1: row[5],
      B2: row[6],
      C:  row[7],
      CB: row[8],
      CD: row[9]
    };

    if(buyrequest.storageSize !== null){
     buyRequests.push(buyrequest);
    }

    let sellrequest = {
      phoneName: phoneName,
      storageSize: row[12],
      New: row[13],
      A1: row[14], 
      A2: row[15],
      B1: row[16],
      B2: row[17],
      C:  row[18],
      CB: row[19],
      CD: row[20]
    };

    if(sellrequest.storageSize !== null){
      sellRequests.push(sellrequest);
    }
    
  });
  
 try{

  Buyrequest.insertMany(buyRequests)
  Sellrequest.insertMany(sellRequests)

  return res.status(200).json({
    responseCode: "00",
    status: "successful",
    message: "Data imported successfully"
  })
 }catch(error){
  log('Server Error!', error.message, "dafault")
  return res.status(500).json({
    responseCode: "99",
    status: "failed",
    message:  error.message || "Some error occurred while retrieving"
  })
 }
})

}

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
      const RequestData = await Buyrequest.paginate(options)
      return res.status(200).json({
        responseCode: "00",
        status: "successful",
        data:  RequestData,
        message: "Data Sent"
      })
    }
    else if(requestType === "SellRequests"){
      const RequestData = await Sellrequest.paginate(options)
      return res.status(200).json({
        responseCode: "00",
        status: "successful",
        data:  RequestData,
        message: "Data Sent"
      })
    }else{
      return res.status(404).json({
        responseCode: "01",
        status: "failed",
        data: {},
        message: "Invalid Params"
      })
    }
    
  } catch (error) {
    log('Server Error!', error.message, "dafault")
    return res.status(500).json({
      responseCode: "99",
      status: "failed",
      message:  error.message || "Some error occurred while retrieving"
    })
  }
};

module.exports = {
  upload,
  getRequests,
};