const validateSchema = (schema) => (request, response, next) => {
	const { error } = schema.validate(request.body);

	if (error) {
		response.status(422).json({ message: error?.message });
	} else {
		next();
	}
};

module.exports = { validateSchema };
