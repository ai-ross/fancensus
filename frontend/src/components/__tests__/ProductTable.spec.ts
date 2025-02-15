import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import ProductTable from '../ProductTable.vue'
import type { GroupedByProduct } from '../../composables/useDataTransformation'
import type { DataItem } from '../../services/api'

describe('ProductTable', () => {
  const mockData: GroupedByProduct[] = [
    {
      product: 'News',
      count: 2,
      items: [
        {
          name: 'BBC News',
          countrycode: 'UK',
          product: 'News',
          date: '2024-02-01',
          headline: 'UK Election News'
        },
        {
          name: 'CNN',
          countrycode: 'US',
          product: 'News',
          date: '2024-02-02',
          headline: 'US Political Update'
        }
      ]
    },
    {
      product: 'Technology',
      count: 1,
      items: [
        {
          name: 'Tech Crunch',
          countrycode: 'US',
          product: 'Technology',
          date: '2024-02-03',
          headline: 'Tech Innovation'
        }
      ]
    }
  ]

  test('renders all products', () => {
    render(ProductTable, {
      props: {
        groupedData: mockData
      }
    })
    
    expect(screen.getByText('News')).toBeTruthy()
    expect(screen.getByText('Technology')).toBeTruthy()
  })

  test('shows correct number of activities for each product', () => {
    render(ProductTable, {
      props: {
        groupedData: mockData
      }
    })
    
    // News has 2 activities, Technology has 1
    expect(screen.getByText('2')).toBeTruthy()
    expect(screen.getByText('1')).toBeTruthy()
  })

  test('renders correct number of table rows', () => {
    render(ProductTable, {
      props: {
        groupedData: mockData
      }
    })
    
    // Get all rows (including header)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(mockData.length + 1)
  })
})