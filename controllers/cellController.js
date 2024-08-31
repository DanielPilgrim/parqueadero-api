import Cell from '../models/cell.js';
import bcrypt from 'bcryptjs';

export const createCell = async (req, res) => {
    try {
        const cell = new Cell({
            state: req.body.state || 'disponible'
        });

        await cell.save();
        res.status(201).send(cell);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getCells = async (req, res) => {
    try {
        const cells = await Cell.find();
        res.send(cells);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getCellByNumber = async (req, res) => {
    try {
        const cell = await Cell.findOne({ cellNumber: req.params.cellNumber });
        if (!cell) return res.status(404).send('Cell not found');
        res.send(cell);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getCellsByStatus = async (req, res) => {
    try {
        const cells = await Cell.find({ state: req.params.state });
        res.send(cells);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateCellByNumber = async (req, res) => {
    try {
        const cell = await Cell.findOneAndUpdate({ cellNumber: req.params.cellNumber }, req.body, { new: true });
        if (!cell) return res.status(404).send('Cell not found');
        res.send(cell);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteCellByNumber = async (req, res) => {
    try {
        const cell = await Cell.findOneAndDelete({ cellNumber: req.params.cellNumber });
        if (!cell) return res.status(404).send('Cell not found');
        res.send('Cell deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
};

export const parkVehicle = async (req, res) => {
    try {
        let cell = await Cell.findOne({ state: 'disponible' });
        if (!cell) return res.status(400).send('No available cells');

        const { plate } = req.body;
        const pin = await bcrypt.hash(cell.cellNumber + plate, 6);

        cell.plate = plate;
        cell.dateIn = new Date();
        cell.state = 'no disponible';
        cell.pin = pin;

        await cell.save();
        res.send(cell);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const calculatePayment = async (req, res) => {
    try {
        const cell = await Cell.findOne({ cellNumber: req.params.cellNumber });
        if (!cell || !cell.dateIn) {
            return res.status(400).send('Cell not valid for payment calculation');
        }

        if (!cell.dateOut) {
            cell.dateOut = new Date();
            await cell.save();
        }

        const hours = Math.floor((cell.dateOut - cell.dateIn) / 3600000);
        const payment = hours < 1 ? 5000 : hours * 5000;

        res.send({ payment });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const releaseVehicle = async (req, res) => {
    try {
        let cell = await Cell.findOne({ cellNumber: req.params.cellNumber });
        if (!cell || cell.state === 'disponible') {
            return res.status(400).send('Cell not valid for release');
        }

        cell.dateOut = new Date();
        cell.state = 'disponible';
        cell.plate = null;
        cell.dateIn = null;
        cell.dateOut = null;
        cell.pin = null;

        await cell.save();
        res.send(cell);
    } catch (error) {
        res.status(400).send(error);
    }
};
