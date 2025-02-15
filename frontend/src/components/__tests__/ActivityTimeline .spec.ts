import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import ActivityTimeline from '../ActivityTimeline.vue'
import type { DataItem } from '../../services/api'

describe('ActivityTimeline', () => {
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
      date: '2024-02-01',
      headline: 'Another UK News'
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

  test('renders component', () => {
    const { getByText } = render(ActivityTimeline, {
      props: {
        data: mockData
      }
    })

    expect(getByText(/Activity Timeline/i)).toBeTruthy()
  })

  test('renders chart component', () => {
    const { container } = render(ActivityTimeline, {
      props: {
        data: mockData
      }
    })

    const chart = container.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('handles multiple entries on same date', () => {
    const { container } = render(ActivityTimeline, {
      props: {
        data: mockData
      }
    })

    const chart = container.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('handles empty data set', () => {
    const { container } = render(ActivityTimeline, {
      props: {
        data: []
      }
    })

    const chart = container.querySelector('canvas')
    expect(chart).toBeTruthy()
  })
})
