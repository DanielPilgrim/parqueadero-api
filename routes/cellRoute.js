import { Router } from 'express';
import {
    createCell,
    getCells,
    getCellByNumber,
    getCellsByStatus,
    updateCellByNumber,
    deleteCellByNumber,
    parkVehicle,
    calculatePayment,
    releaseVehicle
} from '../controllers/cellController.js';

const router = Router();

router.post('/celdas', createCell);
router.get('/celdas', getCells);
router.get('/celdas/:cellNumber', getCellByNumber);
router.get('/celdas/estado/:state', getCellsByStatus);
router.put('/celdas/:cellNumber', updateCellByNumber);
router.delete('/celdas/:cellNumber', deleteCellByNumber);
router.post('/celdas/parquear', parkVehicle);
router.get('/celdas/:cellNumber/pagar', calculatePayment);
router.post('/celdas/:cellNumber/salir', releaseVehicle);

export default router;
