import Appointment from '../models/Appointment';
import AppError from '../errors/AppErros';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import { startOfHour } from 'date-fns';

interface RequestDTO {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
