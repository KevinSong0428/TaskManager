import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskFormDialog from '../TaskFormDialog';
import { createMockTask } from '../helpers';
import '@testing-library/jest-dom'

const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();

const mockSelectedTask = createMockTask(
    '1',
    'Test Task',
    'Design',
    'Test description',
    'Test subtitle',
    'To Start'
);

describe('TaskFormDialog Component', () => {
    test('renders TaskFormDialog component', () => {
        render(
            <TaskFormDialog
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                selectedTask={mockSelectedTask}
            />
        );

        const titleElement = screen.getByLabelText('Edit');
        expect(titleElement).toBeInTheDocument();
    });

    test('handles form submit in TaskFormDialog component', () => {
        render(
            <TaskFormDialog
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                selectedTask={mockSelectedTask}
            />
        );

        const titleElement = screen.getByLabelText('Edit');
        fireEvent.click(titleElement);
        expect(mockOnSubmit).toHaveBeenCalledWith(mockSelectedTask);
    });

    test('handles form close in TaskFormDialog component', () => {
        render(
            <TaskFormDialog
                open={true}
                onClose={mockOnClose}
                onSubmit={mockOnSubmit}
                selectedTask={mockSelectedTask}
            />
        );

        const closeButton = screen.getByText('Cancel');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });
});
