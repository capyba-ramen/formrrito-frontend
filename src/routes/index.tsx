import ErrorBoundaryLayout from '../layouts/ErrorBoundary/ErrorBoundaryLayout';
import UserList from '../pages/todos/UserList/UserList';
import ToDoList from '../pages/todos/ToDoList/ToDoList';
import ToDoLayout from '../layouts/ToDo/ToDoLayout';
import NotFound from '../pages/NotFound/NotFound';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: '/todo',
        element: <ToDoLayout />,
        children: [
          { path: 'users/:id', element: <ToDoList /> },
          { path: 'users', element: <UserList /> },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
