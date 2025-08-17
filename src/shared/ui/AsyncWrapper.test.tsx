import { render, screen } from '@testing-library/react';
import AsyncWrapper from './AsyncWrapper';

describe('AsyncWrapper', () => {
    it('renders children when not loading or error', () => {
        render(
            <AsyncWrapper loading={false}>
                <div>Content</div>
            </AsyncWrapper>
        );
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders loading message when loading', () => {
        render(
            <AsyncWrapper loading={true}>
                <div>Content</div>
            </AsyncWrapper>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error message when error is present', () => {
        render(
            <AsyncWrapper loading={false} error={new Error('Oops')}>
                <div>Content</div>
            </AsyncWrapper>
        );
        expect(screen.getByText(/Error: Oops/)).toBeInTheDocument();
    });
});
