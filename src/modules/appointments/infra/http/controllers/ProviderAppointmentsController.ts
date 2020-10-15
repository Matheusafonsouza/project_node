import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.body;

    const listProvidersAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProvidersAppointments.execute({
      day,
      year,
      month,
      provider_id: user_id,
    });

    return response.json(appointments);
  }
}
