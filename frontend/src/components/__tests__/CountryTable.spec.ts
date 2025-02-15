import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import CountryTable from '../CountryTable.vue'
import type { DataItem } from '../../services/api'

describe('CountryTable', () => {
  const mockData: { [key: string]: DataItem[] } = {
    'UK': [
      {
        name: 'Test Source',
        countrycode: 'UK',
        product: 'Test Product',
        date: '2024-02-01',
        headline: 'Test Headline'
      }
    ],
    'US': [
      {
        name: 'Test Source 2',
        countrycode: 'US',
        product: 'Test Product 2',
        date: '2024-02-01',
        headline: 'Test Headline 2'
      }
    ]
  }

  test('renders all countries', () => {
    render(CountryTable, {
      props: {
        groupedData: mockData
      }
    })
    
    expect(screen.getByText('UK')).toBeTruthy()
    expect(screen.getByText('US')).toBeTruthy()
  })

  test('shows correct number of activities for each country', () => {
    render(CountryTable, {
      props: {
        groupedData: mockData
      }
    })
    
    // Each country has 1 activity in our mock data
    expect(screen.getAllByText('1')).toHaveLength(2)
  })

  test('emits show-details event when View Details is clicked', async () => {
    const { emitted } = render(CountryTable, {
      props: {
        groupedData: mockData
      }
    })
    
    const viewDetailsButton = screen.getAllByText('View Details')[0]
    await viewDetailsButton.click()
    
    expect(emitted()['show-details']).toBeTruthy()
    expect(emitted()['show-details'][0]).toEqual([mockData['UK']])
  })
})