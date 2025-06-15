import mongoose from 'mongoose';
const { Schema } = mongoose;

// define os schemas
const HydrosSchema = new Schema(
  {
    _id: { type: String, required: true, unique: true },
    Temp: { type: String },
    hum: { type: String },
    cab_temp: { type: String },
    bat_volts: { type: String },
    uv_level: { type: String },
    bar: { type: String },
    wind_peak: { type: String },
    wind_rt: { type: String },
    wind_avg: { type: String },
    wind_dir_rt: { type: String },
    wind_dir_avg: { type: String },
    reading_time: { type: String },
  },
  { timestamps: true }
);

export const Hydros = mongoose.model('Hydros', HydrosSchema, 'hydros');
