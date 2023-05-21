import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const newContactSchema = z.object({
	firstName: z.string().min(1),
	email: z.string().email().min(1),
	// _template: z.string(),
	// _autoresponse: z.string(),
	// _honey: z.string()
});

export const load = async (event) => {
	const form = await superValidate(event, newContactSchema);
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, newContactSchema);
		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return { form };
	}
};
