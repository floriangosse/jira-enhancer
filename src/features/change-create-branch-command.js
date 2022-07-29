import { observe } from 'selector-observer';
import { sleep } from '../utils/promise';

export default function changeCreateBranchCommand() {
	/**
	 * @type {Map<Element, MutationObserver>}
	 */
	const mutationObservers = new Map();

	observe('#create-branch-dropdown', {
		remove: (createBranchDropdownElement) => {
			const mutationObserver = mutationObservers.get(createBranchDropdownElement);

			if (mutationObserver) {
				mutationObserver.disconnect();
			}

			mutationObservers.delete(createBranchDropdownElement);
		},
		add: async (createBranchDropdownElement) => {
			await sleep(100);

			const inputElements = Array.from(createBranchDropdownElement.querySelectorAll('input[value^="git checkout -b"]'));

			inputElements.forEach((inputElement) => {
				if (!(inputElement instanceof HTMLInputElement)) {
					return;
				}

				const command = inputElement.value.replace(/^git checkout -b (\w+)/, 'git checkout -b feature/$1');

				inputElement.value = command;
				inputElement.setAttribute('value', command);

				/**
				 * @param {MutationObserver} observer
				 */
				const observe = (observer) => {
					observer.observe(inputElement, {
						attributeFilter: ['value']
					});
				};

				const mutationObserver = new MutationObserver((mutationList, observer) => {
					mutationList.forEach((mutationRecord) => {
						if (mutationRecord.attributeName !== 'value') {
							return;
						}

						observer.disconnect();

						inputElement.value = command;
						inputElement.setAttribute('value', command);

						observe(observer);
					});
				});

				observe(mutationObserver);
			});
		}
	});
}
