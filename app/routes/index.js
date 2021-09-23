const express = require('express')
const router = express.Router()
const excelController = require("../controllers/indexController")


router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to Two Clicks'
    });
})

router.post("/upload", excelController.upload)
router.get("/requests/:requesttype", excelController.getRequests)



module.exports = router;