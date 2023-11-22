<script lang="ts">
	import { onMount } from 'svelte';

	let translation: string = 'Hello World';

	


		const translateButtonClickHandler = async (event:any) => {
			let formData = new FormData();
			formData.append('q', translation);

			console.log(formData);

			let response = await fetch('?/translate' , {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body: formData
			});

			console.log(response);
		}
</script>

<div>
	<div class="flex flex-row p-[3rem] justify-evenly">
		<div class="w-[35%] h-[8rem]">
			<span>Textarea</span>
			<textarea
				class="box textarea h-full w-full p-3"
				rows="4"
				placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			/>
		</div>
		<button></button>

		<div class="w-[35%] h-[8rem]">
			<span>Textarea</span>
			<div class="box bg-surface-700 border-surface-500 border-[1px] w-full h-full p-3">
				{#if translation}
					<p>{translation}</p>
				{:else}
					<p class="text-gray-500">Translation</p>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex justify-center pt-[2rem]">
		<button on:click={translateButtonClickHandler} class="bg-primary-500 text-white p-3 rounded-md">Translate</button>
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
