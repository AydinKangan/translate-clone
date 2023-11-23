<script lang="ts">
	import { languages } from '$lib';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let translation: string = '';
	let loading: boolean = false;

	const handleSubmit = async (event: Event) => {
		loading = true;
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
				translation = resultString;
			} else {
				console.error('Translation request failed');
			}
		} catch (error) {
			console.error('Error during translation request', error);
		}
		loading = false;
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
					name="text"
				></textarea>
			</div>
		</label>

		<div class="flex flex-row justify-between mt-4">
			<label class="label w-[45%]">
				<span>From</span>
				<select class="select" name="from">
					{#each languages as language}
						<option value={language.code}>{language.language}</option>
					{/each}
				</select>
			</label>

			<label class="label w-[45%]">
				<span>To</span>
				<select class="select" name="to">
					{#each languages as language}
						<option value={language.code}>{language.language}</option>
					{/each}
				</select>
			</label>
		</div>

		<div class="flex justify-end pt-[2rem]">
			{#if loading}
				<div class="btn-icon">
					<ProgressRadial />
				</div>
			{:else}
				<button type="submit" class="bg-primary-500 text-white p-3 rounded-md">Translate</button>
			{/if}
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
