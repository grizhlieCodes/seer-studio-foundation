<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data: PageData;
	export let formData: any;

	$: console.log(formData)

	import { z } from 'zod';
	const newContactSchema = z.object({
		firstName: z.string().min(1),
		email: z.string().email().min(1),
		'form-name': z.string(),
		// _template: z.string(),
		// _autoresponse: z.string(),
		// _honey: z.string(),
	})

	const { form, errors, enhance, validate } = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?',
		validators: newContactSchema,
		validationMethod: 'oninput',
		onResult: ({ result }) => {
			console.log(result)
			// if (result.data.form.valid) {
			// 	const res = await submitForm();
			// }
		},
		onUpdate: ({ form }) => {
			console.log("On update: ", form)
		},
		onUpdated: ({ form }) => {
			console.log("On updateD: ", form)
		}
	});

	const submitForm = async () => {
		// const response = await fetch('https://formsubmit.co/ajax/hello@seerstudio.co.uk', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Accept: 'application/json'
		// 	},
		// 	body: JSON.stringify($form)
		// });

		const response = await fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams($form).toString()
		});

		if (response.ok) {
			const result = await response.json();
			console.log(result);
			// handle success
		} else{
			// handle error
			console.error('There was an error submitting the form');
		}
	};

	$: console.log($form);
	$: console.log(data);
	$: if($form){
		// $form["_template"] = "table"
		// $form["_autoresponse"] = `thanks buddy`
		$form["form-name"] = 'contact'
		// console.log($form)
	}

	$: validate('firstName')
	let formm;
	let valid = false;
	const validateForm = async (event: Event) => {
		const data = new FormData(formm)

		const res = await fetch('?/test', {
			method: "POST",
			body: data
		})

		if(res.ok){
			const result = await res.json()
			console.log(result)
			if(result.status === 200){
				valid = true;
			}
		} else {
			console.error(`Didn't fucking work`)
		}
	}
</script>

<SuperDebug data={$form} />

<div class="grid place-items-center w-full min-h-screen gap-6">
	<form
		bind:this={formm}
		on:input|preventDefault={validateForm}
		name="contact"
		use:enhance
		action=""
		method="POST"
		class="space-y-6 bg-black/20 rounded-2xl w-full py-10 px-10
	max-w-2xl"
		data-netlify="true"
	>
	<input type="hidden" name="form-name" value="contact" />
		<h1 class="text-4xl">Our Form</h1>
		<!-- Special Fields, figure out how to add them correctly -->
		<!-- <input type="text" name="_honey" class="sr-only" bind:value={$form["_honey"]}> -->
		<!-- <input class="sr-only" type="hidden" name="_next"
		value="https://innervoyage.netlify.app/contact-successful"> -->
		<!-- <input type="hidden" class="sr-only" name="_template"
		bind:value={$form["_template"]} /> -->
		<!-- <input type="hidden" class="sr-only" name="_autoresponse" value="Thank
		you for contacting Inner Voyage. We aim to get back to all queries
		within 48 hours (during work days)."> -->

		<!-- Normal Fields below -->
		<label for="firstName" class="label">
			<span>Name</span>
			<input
				type="text"
				name="firstName"
				id="firstName"
				class="input"
				bind:value={$form.firstName}
			/>
			{#if $errors.firstName}
				<small>{$errors.firstName}</small>
			{/if}
		</label>
		<label for="email" class="label">
			<span>Email</span>
			<input
				type="email"
				name="email"
				id="email"
				class="input
			{$errors.email && '!border-red-400'}
			"
				bind:value={$form.email}
			/>
			{#if $errors.email}
				<small>{$errors.email}</small>
			{/if}
		</label>
		<button disabled={!valid} class="btn variant-filled-primary mt-6" type="submit">
			Submit Form {valid}
		</button>
	</form>
</div>
