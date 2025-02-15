import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import DrillDownModal from '../DrillDownModal.vue'
import type { DataItem } from '../../services/api'

describe('DrillDownModal', () => {
  const mockItems: DataItem[] = [
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

  const renderModal = (show: boolean = true) =>
    render(DrillDownModal, {
      props: {
        show,
        items: mockItems
      }
    })

  test('renders modal when show prop is true', () => {
    renderModal()

    // Use more precise checks
    expect(screen.getByText(/Country Details/i)).toBeTruthy()

    // Check headers in table
    const headers = screen.getAllByRole('columnheader')
    const headerTexts = headers.map((header) => header.textContent?.trim())

    expect(headerTexts).toContain('Product')
    expect(headerTexts).toContain('Date')
    expect(headerTexts).toContain('Headline')
  })

  test('does not render modal when show prop is false', () => {
    const { container } = renderModal(false)

    expect(container.innerHTML).not.toContain('Country Details')
  })

  test('renders correct number of items', () => {
    renderModal()

    expect(screen.getByText(/UK Election News/i)).toBeTruthy()
    expect(screen.getByText(/US Political Update/i)).toBeTruthy()
  })

  test('emits close event when close button is clicked', async () => {
    const { emitted } = renderModal()

    const closeButton = screen.getByText('✕')
    await fireEvent.click(closeButton)

    expect(emitted().close).toBeTruthy()
  })

  test('formats date correctly', () => {
    renderModal()

    // Check date formatting (allowing for different date formats)
    const dateElements = screen.getAllByText(/\d{2}\/\d{2}\/\d{4}/)
    expect(dateElements.length).toBe(2)

    expect(dateElements[0].textContent).toMatch(/01\/02\/2024|02\/01\/2024/)
    expect(dateElements[1].textContent).toMatch(/02\/02\/2024|02\/02\/2024/)
  })

  test('displays all item details', () => {
    renderModal()

    // Use getAllByText with a custom check
    mockItems.forEach((item) => {
      const productElements = screen.getAllByText(item.product)
      const headlineElements = screen.getAllByText(item.headline)

      expect(productElements.length).toBeGreaterThan(0)
      expect(headlineElements.length).toBeGreaterThan(0)
    })
  })
})
