import domLoaded from 'dom-loaded';

import changeCreateBranchCommand from './features/change-create-branch-command';

import { safeElementReady } from './utils/dom';

async function init() {
	await safeElementReady('body');
	await domLoaded;

	onDomReady();
}

function onDomReady() {
	changeCreateBranchCommand();
}

init();
