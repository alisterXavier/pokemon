import '@testing-library/jest-dom';
import { Loading, PageTitle, Tile } from '@/app/components/utils';
import { render, screen } from '@testing-library/react';
import { RadarChart } from '@/app/components/radar';


jest.mock('react-apexcharts', () =>
  jest.fn(() => {
    return null;
  })
);
jest.mock('apexcharts', () => ({
  exec: jest.fn(() => {
    return new Promise((resolve) => {
      resolve('uri');
    });
  }),
}));
const mockData = [
  { stat: { name: 'HP' }, base_stat: 250 },
  { stat: { name: 'Attack' }, base_stat: 110 },
];
describe('Components', () => {
  it('renders a link with the provided name and url', () => {
    const testUrl = '/pokemons?type=fire';
    const testName = 'fire';

    render(<Tile url={testUrl} name={testName} />);
    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveAttribute('href', testUrl);
    expect(linkElement.textContent).toBe(testName);
  });

  it('renders the provided title', () => {
    const testTitle = 'Search';

    render(<PageTitle title={testTitle} />);
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the loader with the correct image', () => {
    render(<Loading />);

    const loaderDiv = screen.getByRole('img', { name: 'loader' });
    expect(loaderDiv).toBeInTheDocument();
    expect(loaderDiv).toHaveAttribute('alt', 'loader');
    expect(loaderDiv).toHaveAttribute('width', '200');
    expect(loaderDiv).toHaveAttribute('height', '200');
  });

  it('processes data and creates chart configuration', () => {
    const { container } = render(<RadarChart data={mockData} />);
    expect(container).toMatchSnapshot();
  });
});
