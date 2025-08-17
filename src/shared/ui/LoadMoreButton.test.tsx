import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreButton from './LoadMoreButton';

describe('LoadMoreButton', () => {
    it('renders correctly with default state', () => {
        render(<LoadMoreButton onClick={() => {}} loading={false} />);
        expect(screen.getByText('Load more')).toBeInTheDocument();
    });

    it('disables button and shows loading when loading=true', () => {
        render(<LoadMoreButton onClick={() => {}} loading={true} />);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveTextContent('Loading...');
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<LoadMoreButton onClick={handleClick} loading={false} />);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalled();
    });

    it('does not call onClick when loading is true', () => {
        const handleClick = jest.fn();
        render(<LoadMoreButton onClick={handleClick} loading={true} />);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
