import { UMB_BLOCK_ENTRY_CONTEXT } from '@umbraco-cms/backoffice/block';
import { css, customElement, html, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

/**
 * @element umb-ref-rte-block
 */
@customElement('umb-ref-rte-block')
export class UmbRefRteBlockElement extends UmbLitElement {
	//
	@property({ type: String })
	label?: string;

	@state()
	_workspaceEditPath?: string;

	constructor() {
		super();

		this.consumeContext(UMB_BLOCK_ENTRY_CONTEXT, (context) => {
			this.observe(
				context.workspaceEditContentPath,
				(workspaceEditPath) => {
					this._workspaceEditPath = workspaceEditPath;
				},
				'observeWorkspaceEditPath',
			);
		});
	}

	render() {
		return html`<uui-ref-node
			standalone
			.name=${this.label ?? ''}
			href=${this._workspaceEditPath ?? '#'}></uui-ref-node>`;
	}

	static styles = [
		css`
			uui-ref-node {
				min-height: var(--uui-size-16);
			}
		`,
	];
}

export default UmbRefRteBlockElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-ref-rte-block': UmbRefRteBlockElement;
	}
}
