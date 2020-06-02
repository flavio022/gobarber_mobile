import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from './../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { getCustomRepository } from 'typeorm';
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
//const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
