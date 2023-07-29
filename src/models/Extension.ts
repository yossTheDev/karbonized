interface Extension {
	logo: string;
	info: {
		name: string;
		author: string;
		description: string;
		version: string;
	};

	components: { properties: Properties; code: string; image: string }[];
}

interface Properties {
	name: string;
}
