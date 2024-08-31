import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const CellSchema = new mongoose.Schema({
    cellNumber: { 
        type: Number,
        require:true, 
        unique: true 
    },
    state: { 
        type: String, 
        enum: ['disponible', 'no disponible'], 
        default: 'disponible' 
    },
    plate: { 
        type: String, 
        maxlength: 6 
    },
    dateIn: { 
        type: Date 
    },
    dateOut: { 
        type: Date 
    },
    pin: { 
        type: String 
    }
});

const AutoIncrement = AutoIncrementFactory(mongoose);

CellSchema.plugin(AutoIncrement, { inc_field: 'cellNumber' });

const Cell = mongoose.model('cell', CellSchema, 'cell');

export default Cell;
