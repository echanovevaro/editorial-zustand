import React from 'react'
import { Sad } from './Icons'

export const NotFound = () => {
	return (
		<section className='not-found-container'>
			<Sad style={{ width: 200 }} />
			<h3>
				PARECE QUE NO DISPONEMOS DE TU LIBRO
				<p>¿por qué no pruebas a modificar los filtros?</p>
			</h3>
		</section>
	)
}
