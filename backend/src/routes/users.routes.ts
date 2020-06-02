import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateAvatarService';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { request } from 'https';
//const appointmentsRepository = new AppointmentsRepository();
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updatedUserAvart = new UpdateAvatarService();
    const user = await updatedUserAvart.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  },
);

export default usersRouter;
