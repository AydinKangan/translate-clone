<script lang="ts">
	import { enhance } from '$app/forms';

	let translation: string = '';
	export let data: any;

	$: {
		if (data) {
			console.log(data);
		}
	}

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch('?/translate', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.json();
				const jsonData = JSON.parse(result.data);
				const resultString = jsonData[0];
				console.log(resultString)
				translation = resultString;
			} else {
				console.error('Translation request failed');
			}
		} catch (error) {
			console.error('Error during translation request', error);
		}
	};
</script>

<div class="flex flex-row justify-evenly p-[4rem]">
	<form class="w-[35%]" on:submit={handleSubmit}>
		<label>
			Translation
			<div class="h-[8rem]">
				<textarea
					class="box textarea h-full w-full p-3"
					rows="4"
					placeholder="Enter translation."
					name="translation"
				></textarea>
			</div>
		</label>

		<div class="flex justify-end pt-[2rem]">
			<button type="submit" class="bg-primary-500 text-white p-3 rounded-md">Translate</button>
		</div>
	</form>

	<div class="w-[35%] h-[8rem]">
		<span>Result</span>
		<div class="box bg-surface-700 border-surface-500 border-[1px] w-full h-full p-3">
			{#if translation}
				<p>{translation}</p>
			{:else}
				<p class="text-gray-500">Translation</p>
			{/if}
		</div>
	</div>
</div>

<style>
	textarea {
		resize: none;
	}

	.box {
		border-radius: 0.5rem;
	}
</style>
