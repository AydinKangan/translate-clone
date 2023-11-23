import type { Actions } from '@sveltejs/kit';

type Note = {
	translation: string;
};

export const actions = {
	translate: async ({request}) => {
		const data = Object.fromEntries(await request.formData()) as Note;
		console.log(data)
		

		return "hellow server"
	}
} satisfies Actions;


// import {X_RAPID_API_KEY} from '$env/static/private';

// const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
		// const options = {
		// 	method: 'POST',
		// 	headers: {
		// 		'content-type': 'application/x-www-form-urlencoded',
		// 		'Accept-Encoding': 'application/gzip',
		// 		'X-RapidAPI-Key': X_RAPID_API_KEY,
		// 		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
		// 	},
		// 	body: new URLSearchParams({
		// 		q: 'Hello, world!',
		// 		target: 'es',
		// 		source: 'en'
		// 	})
		// };

		// try {
		// 	const response = await fetch(url, options);
		// 	const result = await response.text();
		// 	const translation = JSON.parse(result).data.translations[0].translatedText;
        //     return {translation}
		// } catch (error) {
		// 	console.error(error);
		// }