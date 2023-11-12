import { Task } from '../types';

export const createMockTask = (
    id: string,
    title: string,
    type: Task['type'],
    description: string,
    subtitle: string,
    status: Task['status']
): Task => {
    return {
        id,
        title,
        type,
        description,
        subtitle,
        status,
    };
};
