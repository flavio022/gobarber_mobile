import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';
import AppError from '../errors/AppErros';
import uploadConfig from '../config/upload';
import fs from 'fs';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!');
    }
    if (user.avatar) {
      //Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const fileExist = await fs.promises.stat(userAvatarFilePath);

      if (fileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;

    await userRepository.save(user);
    return user;
  }
}

export default UpdateAvatarService;
