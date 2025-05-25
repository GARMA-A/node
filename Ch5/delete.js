export function deleteAddress(addresses, id) {
	const parsedId = parseInt(id, 10);
	const filteredAddresses = addresses.filter(
		(address) => address.id !== parsedId,
	);
	return filteredAddresses;
}
