import type { FilterChangePayload } from '../interface/NearEarthObjectFilterChangePayload'

export type FilterChangeType = (event: 'filter-change', payload: FilterChangePayload) => void
