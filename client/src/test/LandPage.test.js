import { render, screen} from '@testing-library/react';
import LandingPage from '../components/LandingPage'
import { MemoryRouter } from 'react-router-dom';

test('Renderiza texto de bienvenida', () => {
    render(<LandingPage />, { wrapper: MemoryRouter})

    expect(screen.getByText('Bienvenidos!')).toBeInTheDocument()
}) 