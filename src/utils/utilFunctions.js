import { DETAILS_OF_LISTS } from '../constants/globals'

export const findListDetails = (listId) =>
	DETAILS_OF_LISTS.find(({ id }) => id === listId)

export const removeAccents = (str) =>
	str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
