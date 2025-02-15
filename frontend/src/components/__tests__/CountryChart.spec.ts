import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import CountryChart from '../CountryChart.vue'
import type { CountryStats } from '../../composables/useDataTransformation'

describe('CountryChart', () => {
  const mockCountryStats: CountryStats = {
    US: 5,
    UK: 3,
    CA: 2
  }

  test('renders component', () => {
    const { getByText } = render(CountryChart, {
      props: {
        countryStats: mockCountryStats
      }
    })

    expect(getByText(/Country Distribution/i)).toBeTruthy()
  })

  test('renders chart component', () => {
    const { container } = render(CountryChart, {
      props: {
        countryStats: mockCountryStats
      }
    })

    const chart = container.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('handles different country stats', () => {
    const differentStats: CountryStats = {
      JP: 4,
      DE: 3,
      FR: 2
    }

    const { container } = render(CountryChart, {
      props: {
        countryStats: differentStats
      }
    })

    const chart = container.querySelector('canvas')
    expect(chart).toBeTruthy()
  })

  test('handles empty country stats', () => {
    const { container } = render(CountryChart, {
      props: {
        countryStats: {}
      }
    })

    const chart = container.querySelector('canvas')
    expect(chart).toBeTruthy()
  })
})
