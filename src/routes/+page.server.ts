import type { Actions } from '@sveltejs/kit';
import { X_RAPID_API_KEY } from '$env/static/private';

type Note = {
	text: string;
	from: string;
	to: string;
};

export const actions = {
	translate: async ({ request }) => {
		const data = Object.fromEntries(await request.formData()) as Note;

		const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';

		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',

				'X-RapidAPI-Key': X_RAPID_API_KEY,
				'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
			},
			body: new URLSearchParams({
				from: data.from,
				to: data.to,
				text: data.text
			})
		};

		try {
			const response = await fetch(url, options);
			const result = await response.text();
			const translation = JSON.parse(result).trans;
			return translation;
		} catch (error) {
			console.error(error);
		}
	}
} satisfies Actions;
