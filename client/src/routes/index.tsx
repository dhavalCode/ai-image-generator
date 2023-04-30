import { createBrowserRouter } from 'react-router-dom'
// components
import Home from '../pages/Home'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
])

export default router
