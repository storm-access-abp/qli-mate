import { Request, Response } from 'express';
import { Hydros } from '../models';

class HydrosController {
  public async create(req: Request, res: Response): Promise<any> {
    const {
      id,
      Temp,
      hum,
      cab_temp,
      bat_volts,
      uv_level,
      bar,
      wind_peak,
      wind_rt,
      wind_avg,
      wind_dir_rt,
      wind_dir_avg,
      reading_time,
    } = req.body;
    try {
      // a instância de um modelo é chamada de documento
      const document = new Hydros({
        id,
        Temp,
        hum,
        cab_temp,
        bat_volts,
        uv_level,
        bar,
        wind_peak,
        wind_rt,
        wind_avg,
        wind_dir_rt,
        wind_dir_avg,
        reading_time,
      });
      // ao salvar serão aplicadas as validações do esquema
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        // código 11000 e 11001 indica violação de restrição única (índice duplicado)
        return res.json({ message: 'ID do Registro já em uso.' });
      }
      return res.json({ message: error.message });
    }
  }

  public async list(_: Request, res: Response): Promise<any> {
    try {
      const objects = await Hydros.find();
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { id: _id } = req.body; // _id do registro a ser excluído
    try {
      const object = await Hydros.findByIdAndDelete(_id);
      if (object) {
        return res.json({ message: 'Registro excluído com sucesso!' });
      } else {
        return res.json({ message: 'Registro inexistente!' });
      }
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    const {
      id,
      Temp,
      hum,
      cab_temp,
      bat_volts,
      uv_level,
      bar,
      wind_peak,
      wind_rt,
      wind_avg,
      wind_dir_rt,
      wind_dir_avg,
      reading_time,
    } = req.body;
    try {
      // busca o usuário existente na coleção antes de fazer o update
      const document = await Hydros.findById(id);
      if (!document) {
        return res.json({ message: 'Professor inexistente' });
      }
      document.Temp = Temp;
      document.hum = hum;
      document.bar = bar;
      document.cab_temp = cab_temp;
      document.bat_volts = bat_volts;
      document.uv_level = uv_level;
      document.bar = bar;
      document.wind_peak = wind_peak;
      document.wind_rt = wind_rt;
      document.wind_avg = wind_avg;
      document.wind_dir_rt = wind_dir_rt;
      document.wind_dir_avg = wind_dir_avg;
      document.reading_time = reading_time;
      document.reading_time = reading_time;
      // ao salvar serão aplicadas as validações do esquema
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        // código 11000 e 11001 indica violação de restrição única (índice duplicado)
        return res.json({ message: 'ID do Registro já em uso' });
      }
      return res.json({ message: error.message });
    }
  }
}
export default new HydrosController();
