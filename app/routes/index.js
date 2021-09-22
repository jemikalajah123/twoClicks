const express = require('express')
const router = express.Router()
const excelController = require("../controllers/indexController");
const fileValidator = require("../middlewares/fileValidator");


router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to Two Clicks'
    });
})

router.post("/upload", fileValidator.single("file"), excelController.upload)
router.get("/requests/:requesttype", excelController.getRequests)



module.exports = router;