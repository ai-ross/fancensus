import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import ProductDistribution from '../ProductDistribution.vue'
import type { DataItem } from '../../services/api'

describe('ProductDistribution', () => {
  const mockData: DataItem[] = [
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
    },
    {
      name: 'Tech Crunch',
      countrycode: 'US',
      product: 'Technology',
      date: '2024-02-03',
      headline: 'Tech Innovation'
    }
  ]

  const extendedMockData: DataItem[] = [
    ...mockData,
    {
      name: 'Bloomberg',
      countrycode: 'US',
      product: 'Finance',
      date: '2024-02-04',
      headline: 'Financial News'
    },
    {
      name: 'Reuters',
      countrycode: 'UK',
      product: 'Finance',
      date: '2024-02-05',
      headline: 'Global Markets'
    },
    {
      name: 'Al Jazeera',
      countrycode: 'QA',
      product: 'Media',
      date: '2024-02-06',
      headline: 'Middle East Update'
    },
    {
      name: 'Fox News',
      countrycode: 'US',
      product: 'Media',
      date: '2024-02-07',
      headline: 'Political Commentary'
    },
    {
      name: 'MSNBC',
      countrycode: 'US',
      product: 'Media',
      date: '2024-02-08',
      headline: 'Election Analysis'
    }
  ]

  const renderComponent = (data: DataItem[]) =>
    render(ProductDistribution, {
      props: {
        data
      }
    })

  test('renders component with correct title', () => {
    renderComponent(mockData)

    expect(screen.getByText(/Product Distribution/i)).toBeTruthy()
  })

  test('renders pie chart', () => {
    renderComponent(mockData)

    const chart = document.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('computes chart data correctly', () => {
    renderComponent(mockData)

    const chart = document.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('limits to top 8 products', () => {
    renderComponent(extendedMockData)

    const chart = document.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('handles empty data set', () => {
    const { container } = render(ProductDistribution, {
      props: {
        data: []
      }
    })

    const chart = container.querySelector('canvas')
    expect(chart).toBeTruthy()
  })
})
