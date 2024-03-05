import { UmbControllerHostMixin } from './controller-host.mixin.js';
import type { UmbControllerHostElement } from './controller-host-element.interface.js';
import type { UmbControllerHost } from './controller-host.interface.js';
import type { HTMLElementConstructor } from '@umbraco-cms/backoffice/extension-api';

/**
 * This mixin enables a web-component to host controllers.
 * This enables controllers to be added to the life cycle of this element.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const UmbControllerHostElementMixin = <T extends HTMLElementConstructor>(superClass: T) => {
	class UmbControllerHostElementClass extends UmbControllerHostMixin(superClass) implements UmbControllerHost {
		getHostElement(): Element {
			return this;
		}

		connectedCallback() {
			super.connectedCallback?.();
			this.hostConnected();
		}

		disconnectedCallback() {
			super.disconnectedCallback?.();
			this.hostDisconnected();
		}
	}

	return UmbControllerHostElementClass as unknown as HTMLElementConstructor<UmbControllerHostElement> & T;
};

declare global {
	interface HTMLElement {
		connectedCallback(): void;
		disconnectedCallback(): void;
	}
}
