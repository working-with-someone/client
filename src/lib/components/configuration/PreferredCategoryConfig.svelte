<script lang="ts">
	import CategoryTag from '../tags/CategoryTag.svelte';
	import CategorySearchBox from '../input/CategorySearchBox.svelte';
	import wwsfetch from '$lib/utils/wwsfetch';
	import { getContext } from 'svelte';
	import { reloadUser } from '$lib/store/user';
	import httpStatusCodes from 'http-status-codes';
	import TextError from '../error/TextError.svelte';

	const user: any = getContext('user');

	let category = $state('');
	let error = $state<App.Error>();

	let addPreferredCategory = (categoryLabel: string) => {
		console.log('add!');
		wwsfetch(`/users/${$user.id}/preferred-categories/${categoryLabel}`, {
			method: 'POST'
		})
			.then((res) => {
				if (res.status === httpStatusCodes.CREATED) {
					reloadUser();
					error = undefined;
				}
			})
			.catch((errRes) => {
				error = {
					status: errRes.status,
					message: errRes.message,
					statusText: errRes.statusText
				};
			})
			.finally(() => {
				category = '';
			});
	};

	let removePreferredCategory = (categoryLabel: string) => {
		wwsfetch(`/users/${$user.id}/preferred-categories/${categoryLabel}`, {
			method: 'DELETE'
		}).then((res) => {
			if (res.status === httpStatusCodes.NO_CONTENT) {
				reloadUser();
			}
		});
	};
</script>

<section id="preferred-category-config" class="much-rounded">
	<div class="header">
		<p>Preferred Categories</p>
		<span class="text-blur">Select your preferred categories to customize your experience.</span>
	</div>
	<div class="body">
		<CategorySearchBox bind:value={category} selectOption={addPreferredCategory}
		></CategorySearchBox>
		<div class="error">
			<TextError {error}></TextError>
		</div>
		<div class="preferred-categories-boundary middle-rounded">
			<span class="preferred-label">Preferred Categories</span>
			<ul class="preferred-categories-list">
				{#each $user.preferred_categories as pCategory}
					<li class="preferred-category-item">
						<CategoryTag category_label={pCategory.category_label}>
							<button
								slot="extension"
								class="preferred-categories-remove-btn"
								onclick={() => removePreferredCategory(pCategory.category_label)}
								aria-label="Remove preferred category"
							>
								&times;
							</button>
						</CategoryTag>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style lang="scss">
	#preferred-category-config {
		width: 100%;
		padding: 20px;
		background-color: var(--bg);

		.header {
			margin-bottom: 15px;
			display: flex;
			flex-direction: column;
			gap: 10px;

			span {
				border-bottom: 0.1px solid var(--font-dark-gray);
				font-size: 13px;
				padding-bottom: 10px;
			}
		}

		.body {
			display: flex;
			flex-direction: column;
			gap: 15px;
			.error {
				font-size: 12px;
				flex-grow: 1;
				padding-left: 5px;
			}

			.preferred-categories-boundary {
				width: 500px;
				position: relative;
				border: 1px solid var(--font-light-gray);
				padding: 14px 10px 10px;
				height: auto;
				border-radius: 8px;

				.preferred-label {
					position: absolute;
					top: -9px;
					left: 50%;
					transform: translateX(-50%);
					background: var(--bg);
					padding: 0 10px;
					font-size: 12px;

					line-height: 1;
				}
				.preferred-categories-list {
					display: flex;
					flex-direction: row;
					gap: 10px;
					flex-wrap: wrap;

					.preferred-category-item {
						.preferred-categories-remove-btn {
							padding: 0;
							margin: 0;
						}
					}
				}
			}
		}
	}
</style>
