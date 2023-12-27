import express from 'express'
import auth from '../middleware/auth.js'
import  hasRole from '../middleware/hasRole.js';
import { create, getAll, getOne, remove, update } from '../controllers/staffs.js';


const router = express.Router();

router.post('/',auth,hasRole('admin','developer'),create)
router.get('/',auth,hasRole('admin','developer'),getAll)
router.get('/:id',auth,getOne)
router.put('/:id',auth,update)
router.delete('/:id',auth,remove)

export default router
