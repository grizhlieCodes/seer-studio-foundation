<script lang="ts">
	import { z } from 'zod';
	let formValid: boolean = false;

	let formData = {
		name: '',
		email: ''
	};

	let Form = z.object({
		name: z
			.string({ required_error: 'Name is required' })
			.min(1, { message: 'Name is required' })
			.max(40, { message: 'Name must be less than 40 characters' })
			.regex(/^[A-Za-z]+$/, { message: 'Must be letters only.' })
			.trim(),

		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.email({ message: 'Email must be a valid email address' })
	});

	const validateForm = async () => {
		const result = await Form.safeParse(formData);
		if (result.success) {
			formValid = true;
		} else {
			formValid = false;
		}
	};


	const submitForm = async (event: any) => {
		if (!formValid) return;
		let parsedFormData = new FormData();

		for (let key in formData) {
			parsedFormData.append(key, formData[key]);
		}

		try {
			const res = await fetch(event.target.action, {
				method: 'POST',
				body: parsedFormData,
				headers: {
					Accept: 'application/json'
				}
			});
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="grid place-items-center w-full min-h-screen gap-6">
	<form
		action="https://formsubmit.co/rafal.potasz@gmail.com"
		on:input={validateForm}
		name="contact-two"
		method="POST"
		class="space-y-6 bg-black/20 rounded-2xl w-full py-10 px-10
	max-w-2xl flex flex-col items-center justify-center"
		on:submit={submitForm}
	>
		<input name="name" type="text" class="input" required bind:value={formData.name} />
		<input name="email" type="email" class="input" required bind:value={formData.email} />
		<button
			disabled={!formValid}
			type="submit"
			class="btn
		variant-filled-primary mt-6">Submit</button
		>
		<span class="text-sm text-primary-400">{formValid}</span>
	</form>
</div>