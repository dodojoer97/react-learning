// React
import {ReactNode } from "react";

// Routes
import LoginPage from '@/routes/Login';
import HomePage from '@/routes/Home';
import SignUp from '@/routes/Signup';

// Define the interface for a route configuration
export interface RouteConfig {
    path: string;
    component: ReactNode;
    protected: boolean;
}

// Create the route configuration array
export const routeConfig: RouteConfig[] = [
    {
        path: "/login",
        component: <LoginPage />,
        protected: false,
    },
    {
        path: "/",
        component: <HomePage />,
        protected: false,
    },
    {
        path: "/signup",
        component: <SignUp />,
        protected: false,
    },
];


