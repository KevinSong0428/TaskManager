import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import TaskManager from '../TaskManager';

const mockStore = configureStore();

describe('TaskManager Component', () => {
    test('renders TaskManager component', () => {
        const mockInitialState = {
            toStart: [],
            inProgress: [],
            done: [],
        };

        const store = mockStore({ mockInitialState });

        render(
            <Provider store={store}>
                <TaskManager />
            </Provider>
        );

        const element = screen.getByText(/Task Manager/i);

        expect(element).toBeInTheDocument();
    });

    test('renders tasks in TaskManager', () => {
        const mockInitialState = {
            toStart: [
                { id: '1', title: 'Task 1', status: 'To Start', type: 'Design' },
                { id: '2', title: 'Task 2', status: 'To Start', type: 'Front-end' },
            ],
            inProgress: [
                { id: '3', title: 'Task 3', status: 'In Progress', type: 'Back-end' },
            ],
            done: [],
        };

        const store = mockStore({ mockInitialState });

        render(
            <Provider store={store}>
                <TaskManager />
            </Provider>
        );

        mockInitialState.toStart.forEach((task) => {
            const taskElement = screen.getByText(task.title);
            expect(taskElement).toBeInTheDocument();
        });

        mockInitialState.inProgress.forEach((task) => {
            const taskElement = screen.getByText(task.title);
            expect(taskElement).toBeInTheDocument();
        });

        const emptyCategoryElement = screen.getByText(/No tasks in this category/i);
        expect(emptyCategoryElement).toBeInTheDocument();
    });
});
