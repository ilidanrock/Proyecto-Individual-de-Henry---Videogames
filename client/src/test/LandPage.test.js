import { render, screen} from '@testing-library/react';
import Landing from '../components/LandingPage'
import { MemoryRouter } from 'react-router-dom';

test('Renderiza texto de bienvenida', () => {
    render(<Landing />, { wrapper: MemoryRouter})

    expect(screen.getByText('Bienvenidos!')).toBeInTheDocument()
}) 