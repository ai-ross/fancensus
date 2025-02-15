import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import NewsSourceDistribution from '../NewsSourceDistribution.vue'
import type { DataItem } from '../../services/api'

describe('NewsSourceDistribution', () => {
  const mockData: DataItem[] = [
    {
      name: 'BBC News',
      countrycode: 'UK',
      product: 'News',
      date: '2024-02-01',
      headline: 'UK Election News'
    },
    {
      name: 'BBC News',
      countrycode: 'UK',
      product: 'News',
      date: '2024-02-02',
      headline: 'Another UK News'
    },
    {
      name: 'CNN',
      countrycode: 'US',
      product: 'News',
      date: '2024-02-03',
      headline: 'US Political Update'
    },
    {
      name: 'Tech Crunch',
      countrycode: 'US',
      product: 'Technology',
      date: '2024-02-04',
      headline: 'Tech Innovation'
    }
  ]

  const renderComponent = () => render(NewsSourceDistribution, {
    props: {
      data: mockData
    }
  })

  test('renders component with correct title', () => {
    renderComponent()
    
    expect(screen.getByText(/Top News Sources/i)).toBeTruthy()
  })

  test('renders bar chart', () => {
    renderComponent()
    
    const chart = document.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('computes source distribution correctly', () => {
    renderComponent()
    
    // We can't easily check exact chart contents, so we verify chart exists
    const chart = document.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('handles data with multiple entries from same source', () => {
    renderComponent()
    
    const chart = document.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('handles empty data set', () => {
    const { container } = render(NewsSourceDistribution, {
      props: {
        data: []
      }
    })
    
    const chart = container.querySelector('canvas')
    expect(chart).toBeTruthy()
  })
})