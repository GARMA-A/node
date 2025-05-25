'use strict';

import { createServer } from 'http';
import { addresses } from './data.js';
import { getList } from './list.js';
import { deleteAddress } from './delete.js';
import { getForm } from './form.js';
let curAddresses = addresses;

createServer((request, response) => {
	const parts = request.url.split('/');
	if (parts.includes('delete')) {
		curAddresses = deleteAddress(curAddresses, parts[2]);
		redirect(response, '/');
	} else if (parts.includes('new')) {
		send(response, getForm());
	} else if (parts.includes('edit')) {
		send(response, getForm(curAddresses, parts[2]));
	} else {
		send(response, getList(curAddresses));
	}
}).listen(8080, () =>
	console.log('Address book reachable at http://localhost:8080'),
);
function send(response, responseBody) {
	response.writeHead(200, { 'content-type': 'text/html' });
	response.end(responseBody);
}


function redirect(response, to) {
	response.writeHead(302, { location: to, 'content-type': 'text/plain' });
	response.end(`302 redirect to ${to}`);
}
