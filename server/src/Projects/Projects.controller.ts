import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { bodyValidator } from '../../lib/utils/requestValidator';

import Users from '../Users/Users.entity';
import Projects from './Projects.entity';
import { getUsers } from '../Users/Users.service';

const getProjects = (users: Users[]) => {
  const result = [];
  for (const user of users) {
    result.push(...user.projects);
  }
  result.sort((a, b) => a.id - b.id);
  // 중복 제거
  if (result.length === 1) return result;
  for (let i = 1; i < result.length; i++) {
    if (result[i].id === result[i - 1].id) {
      result[i - 1].id = 0;
    }
  }
  return result.filter((project) => project.id !== 0);
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new Error('params is not valid');
    }
    const users = await getUsers(+req.params.id);

    const projects = getProjects(users);
    res.json(projects);
  } catch (error) {
    const message = (error as Error).message;
    res.status(401).json({ message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    if (!bodyValidator(req.body, ['name', 'userId'])) {
      throw new Error('body is not vaild');
    }
    const userRepository = getRepository(Users);
    const projectRepository = getRepository(Projects);
    const newProject = await projectRepository.save({
      name: req.body.name,
    });
    const user = await userRepository.findOne({
      relations: ['projects'],
      where: { id: req.body.userId },
    });
    if (!user) throw Error('유저 없음');
    user.projects.push(newProject);
    await userRepository.save(user);
    res.json(newProject);
  } catch (error) {
    const message = (error as Error).message;
    res.status(401).json({ message });
  }
};
