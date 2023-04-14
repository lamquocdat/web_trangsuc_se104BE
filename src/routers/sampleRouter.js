import express from 'express'
const router=express.Router()
import * as sampleController from '../controller/sampleController.js'

router.get("/sample",sampleController.getSample)

export default router;