import { appStateActions } from './appState'
import { mockingbirdActions } from './mockingbird'

export const actions = {
  ...appStateActions,
  ...mockingbirdActions
}