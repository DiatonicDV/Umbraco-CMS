// import { UMB_COMPOSITION_PICKER_MODAL, type UmbCompositionPickerModalData } from '../../../modals/index.js';
import { UMB_MEMBER_WORKSPACE_CONTEXT } from '../../member-workspace.context.js';
import { css, html, customElement, state, when } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import type { UmbWorkspaceViewElement } from '@umbraco-cms/backoffice/extension-registry';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbMemberDetailModel } from '../../../types.js';
import { UUIBooleanInputEvent } from '@umbraco-ui/uui';
import { UMB_CHANGE_PASSWORD_MODAL, UMB_MODAL_CONTEXT, UMB_MODAL_MANAGER_CONTEXT } from '@umbraco-cms/backoffice/modal';

@customElement('umb-member-workspace-view-member')
export class UmbMemberWorkspaceViewMemberElement extends UmbLitElement implements UmbWorkspaceViewElement {
	private _workspaceContext?: typeof UMB_MEMBER_WORKSPACE_CONTEXT.TYPE;

	constructor() {
		super();

		this.consumeContext(UMB_MEMBER_WORKSPACE_CONTEXT, (context) => {
			this._workspaceContext = context;
		});
	}

	@state()
	private _showChangePasswordForm = false;

	@state()
	private _newPasswordError = '';

	#onChange(propertyName: keyof UmbMemberDetailModel, value: UmbMemberDetailModel[keyof UmbMemberDetailModel]) {
		if (!this._workspaceContext) return;

		this._workspaceContext.set(propertyName, value);
	}

	#onPasswordUpdate = () => {
		const newPassword = this.shadowRoot?.querySelector<HTMLInputElement>('uui-input[name="newPassword"]')?.value;
		const confirmPassword = this.shadowRoot?.querySelector<HTMLInputElement>('uui-input[name="confirmPassword"]')
			?.value;

		if (newPassword !== confirmPassword) {
			this._newPasswordError = 'Passwords do not match';
			return;
		}

		this._newPasswordError = '';

		this._workspaceContext?.set('newPassword', newPassword);
	};

	#onNewPasswordCancel = () => {
		this._workspaceContext?.set('newPassword', '');
		this._showChangePasswordForm = false;
		this._newPasswordError = '';
	};

	render() {
		if (!this._workspaceContext) {
			return html`<div>Not found</div>`;
		}

		return html` <umb-body-layout header-fit-height>
			<div id="main">
				<uui-box id="left-column">
					<umb-property-layout label="${this.localize.term('general_login')}">
						<uui-input
							slot="editor"
							name="login"
							label="${this.localize.term('general_login')}"
							value=""
							@input=${(e: Event) => this.#onChange('username', (e.target as HTMLInputElement).value)}></uui-input>
					</umb-property-layout>

					<umb-property-layout label="${this.localize.term('general_email')}">
						<uui-input
							slot="editor"
							name="email"
							label="${this.localize.term('general_email')}"
							@input=${(e: Event) => this.#onChange('email', (e.target as HTMLInputElement).value)}
							value=${this._workspaceContext.email}></uui-input>
					</umb-property-layout>

					<umb-property-layout label="Change password">
						${when(
							this._showChangePasswordForm,
							() => html`
								<div slot="editor">
									<umb-property-layout label="New password">
										<uui-input
											slot="editor"
											name="newPassword"
											label="New password"
											type="password"
											@input=${() => this.#onPasswordUpdate()}></uui-input>
									</umb-property-layout>
									<umb-property-layout label="Confirm password">
										<uui-input
											slot="editor"
											name="confirmPassword"
											label="Confirm password"
											type="password"
											@input=${() => this.#onPasswordUpdate()}></uui-input>
									</umb-property-layout>
									${when(this._newPasswordError, () => html`<p class="validation-error">${this._newPasswordError}</p>`)}
									<uui-button label="Cancel" look="secondary" @click=${this.#onNewPasswordCancel}></uui-button>
								</div>
							`,
							() =>
								html`<uui-button
									slot="editor"
									label="Change password"
									look="secondary"
									@click=${() => (this._showChangePasswordForm = true)}></uui-button>`,
						)}
					</umb-property-layout>

					<umb-property-layout label="Member Group">
						<div slot="editor">MEMBER GROUP PICKER</div>
					</umb-property-layout>

					<umb-property-layout label="Approved">
						<uui-toggle
							slot="editor"
							.checked=${this._workspaceContext.isApproved}
							@change=${(e: UUIBooleanInputEvent) => this.#onChange('isApproved', e.target.checked)}>
						</uui-toggle>
					</umb-property-layout>

					<umb-property-layout label="Locked out">
						<uui-toggle
							slot="editor"
							.checked=${this._workspaceContext.isLockedOut}
							@change=${(e: UUIBooleanInputEvent) => this.#onChange('isLockedOut', e.target.checked)}>
						</uui-toggle>
					</umb-property-layout>

					<umb-property-layout label="Two-Factor authentication">
						<uui-toggle slot="editor"></uui-toggle>
					</umb-property-layout>
				</uui-box>

				<uui-box id="right-column">
					<umb-property-layout label="Failed login attempts">
						<div slot="editor">${this._workspaceContext.failedPasswordAttempts}</div>
					</umb-property-layout>

					<umb-property-layout label="Last lockout date">
						<div slot="editor">${this._workspaceContext.lastLockOutDate}</div>
					</umb-property-layout>

					<umb-property-layout label="Last login">
						<div slot="editor">${this._workspaceContext.lastLoginDate}</div>
					</umb-property-layout>

					<umb-property-layout label="Password changed">
						<div slot="editor">${this._workspaceContext.lastPasswordChangeDate}</div>
					</umb-property-layout>
				</uui-box>
			</div>
		</umb-body-layout>`;
	}

	static styles = [
		UmbTextStyles,
		css`
			uui-input {
				width: 100%;
			}
			#main {
				display: flex;
				flex-wrap: wrap;
				gap: var(--uui-size-space-4);
			}
			#left-column {
				/* Is there a way to make the wrapped right column grow only when wrapped? */
				flex-grow: 9999999;
				flex-shrink: 0;
				flex-basis: 700px;
			}
			#right-column {
				flex-basis: 300px;
				flex-grow: 1;
			}
			uui-box {
				height: fit-content;
			}
			umb-property-layout {
				padding-block: var(--uui-size-space-4);
			}
			umb-property-layout:first-child {
				padding-top: 0;
			}
			umb-property-layout:last-child {
				padding-bottom: 0;
			}
			.validation-error {
				margin-top: 0;
				color: var(--uui-color-danger);
			}
		`,
	];
}

export default UmbMemberWorkspaceViewMemberElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-member-workspace-view-member': UmbMemberWorkspaceViewMemberElement;
	}
}
