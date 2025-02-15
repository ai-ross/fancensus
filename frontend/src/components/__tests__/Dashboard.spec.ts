import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import Dashboard from '../Dashboard.vue'
import type { DataItem } from '../../services/api'

describe('Dashboard', () => {
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

  const mockGroupedByCountry = {
    UK: [mockData[0]],
    US: [mockData[1], mockData[2]]
  }

  const mockGroupedByProduct = [
    { product: 'News', count: 2, items: [mockData[0], mockData[1]] },
    { product: 'Technology', count: 1, items: [mockData[2]] }
  ]

  const mockCountryStats = {
    UK: 1,
    US: 2
  }

  const renderDashboard = () =>
    render(Dashboard, {
      props: {
        rawData: mockData,
        groupedByCountry: mockGroupedByCountry,
        groupedByProduct: mockGroupedByProduct,
        countryStats: mockCountryStats
      }
    })

  test('renders overview stats', () => {
    renderDashboard()

    // Use more specific queries
    const totalCountriesElement = screen.getByText(/Total Countries/i)
    const countriesValueElement = totalCountriesElement.nextElementSibling
    expect(countriesValueElement?.textContent?.trim()).toBe('2')

    const totalProductsElement = screen.getByText(/Total Products/i)
    const productsValueElement = totalProductsElement.nextElementSibling
    expect(productsValueElement?.textContent?.trim()).toBe('2')

    const totalActivitiesElement = screen.getByText(/Total Activities/i)
    const activitiesValueElement = totalActivitiesElement.nextElementSibling
    expect(activitiesValueElement?.textContent?.trim()).toBe('3')
  })

  test('renders tabs', () => {
    renderDashboard()

    expect(screen.getByText(/Required Views/i)).toBeTruthy()
    expect(screen.getByText(/Additional Insights/i)).toBeTruthy()
  })

  test('switches between tabs', async () => {
    renderDashboard()

    // Initial tab should be 'Required Views'
    expect(screen.getByText(/Activities by Country/i)).toBeTruthy()

    // Switch to 'Additional Insights'
    const additionalInsightsTab = screen.getByText(/Additional Insights/i)
    await fireEvent.click(additionalInsightsTab)

    // Check for components in Additional Insights tab
    expect(screen.getByText(/Activity Timeline/i)).toBeTruthy()
    expect(screen.getByText(/Product Distribution/i)).toBeTruthy()
  })

  test('opens and closes drill-down modal', async () => {
    renderDashboard()

    // Find and click the first 'View Details' button
    const viewDetailsButtons = screen.getAllByText(/View Details/i)
    await fireEvent.click(viewDetailsButtons[0])

    // Verify modal opens
    expect(screen.getByText(/Country Details/i)).toBeTruthy()

    // Close the modal
    const closeButton = screen.getByText('✕')
    await fireEvent.click(closeButton)

    // Modal should no longer be visible
    expect(screen.queryByText(/Country Details/i)).toBeNull()
  })

  test('displays latest update', () => {
    renderDashboard()

    // Check latest update date
    const latestUpdateLabel = screen.getByText(/Latest Update/i)
    const latestUpdateElement = latestUpdateLabel.nextElementSibling

    expect(latestUpdateElement).toBeTruthy()
    expect(latestUpdateElement?.textContent).toMatch(/2024/)
  })
})
