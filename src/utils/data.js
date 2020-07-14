function importAll(r) {
	let data = {};
	r.keys().map((item, index) => {
		data[item.replace("./", "")] = r(item);
	});
	return data;
}

const data = importAll(
	require.context("../assets/data", false, /\.(xml|json|txt)$/)
);

export { data };
