import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import TaskItem from '../TaskItem';
import { createMockTask } from '../helpers';

const task = createMockTask(
    '1',
    'Test Task',
    'Design',
    'Test description',
    'Test subtitle',
    'To Start'
);

describe('TaskItem Component', () => {
    test('renders TaskItem component', () => {
        const handleEdit = jest.fn();
        const handleDelete = jest.fn();
        const sortingMethod = 'status';

        render(
            <TaskItem
                task={task}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                sortingMethod={sortingMethod}
            />
        );

        const titleElement = screen.getByText('Title: Test Task');
        expect(titleElement).toBeInTheDocument();
    });

    test('handles edit and delete in TaskItem component', () => {
        const handleEdit = jest.fn();
        const handleDelete = jest.fn();
        const sortingMethod = 'status';

        render(
            <TaskItem
                task={task}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                sortingMethod={sortingMethod}
            />
        );

        const editButton = screen.getByTitle('Edit');
        fireEvent.click(editButton);
        expect(handleEdit).toHaveBeenCalledWith(task);

        const deleteButton = screen.getByTitle('Delete');
        fireEvent.click(deleteButton);
        expect(handleDelete).toHaveBeenCalledWith(task);
    });
});
