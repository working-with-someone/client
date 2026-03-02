<script lang="ts">
	import CategoryTag from '../tags/CategoryTag.svelte';
	import CategorySearchBox from '../input/CategorySearchBox.svelte';
	import wwsfetch from '$lib/utils/wwsfetch';
	import { getContext, onMount } from 'svelte';
	import httpStatusCodes from 'http-status-codes';
	import TextError from '../error/TextError.svelte';
	import Sortable from 'sortablejs';
	import { reloadUser } from '$lib/store/user';

	const user: any = getContext('user');

	let error = $state<App.Error>();
	let preferredCategories: HTMLUListElement | null = null;

	// reload user와 sortable의 element 정렬이 충돌하는 현상 때문에 reloadUser는 수행하지 않으며, sortable의 onEnd에서 이 update request에서 200을 응답받지 못하면 order를 원상복구할것이다.
	async function updatePriority(categoryLabel: string, priority: number) {
		return wwsfetch(
			`/users/${$user.id}/preferred-categories/${categoryLabel}/priority/${priority}`,
			{
				method: 'PUT'
			}
		);
	}

	let addPreferredCategory = (categoryLabel: string) => {
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
			});

		// input의 value를 비운다.
		return true;
	};

	let removePreferredCategory = (categoryLabel: string) => {
		wwsfetch(`/users/${$user.id}/preferred-categories/${categoryLabel}`, {
			method: 'DELETE'
		})
			.then((res) => {
				if (res.status === httpStatusCodes.NO_CONTENT) {
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
			});
	};

	function initializeSortable() {
		if (!preferredCategories) return;

		Sortable.create(preferredCategories, {
			animation: 200,
			onEnd: async (ev: any) => {
				const oldIndex = ev.oldIndex;
				const newIndex = ev.newIndex;
				if (oldIndex === newIndex) return;
				const itemEl: HTMLElement = ev.item as HTMLElement;
				const label = itemEl?.dataset?.label;
				if (!label) return;

				updatePriority(label, newIndex)
					.then(() => {
						error = undefined;
					})
					.catch((err) => {
						error = {
							status: err.status,
							message: err.message,
							statusText: err.statusText
						};
					});
			}
		});
	}

	onMount(async () => {
		reloadUser();
		initializeSortable();
	});
</script>

<section id="preferred-category-config" class="much-rounded">
	<div class="header">
		<p>Preferred Categories</p>
		<span class="text-blur">Select your preferred categories to customize your experience.</span>
	</div>
	<div class="body">
		<CategorySearchBox selectOption={addPreferredCategory}></CategorySearchBox>
		<div class="error">
			<TextError {error}></TextError>
		</div>
		<div class="preferred-categories-boundary middle-rounded">
			<span class="preferred-label">Preferred Categories</span>
			<ul class="preferred-categories-list" bind:this={preferredCategories}>
				{#each $user.preferred_categories as pCategory (pCategory.category_label)}
					<li class="preferred-category-item drag-handle" data-label={pCategory.category_label}>
						<CategoryTag category_label={pCategory.category_label}>
							<button
								slot="extension"
								class="preferred-categories-remove-btn"
								onclick={() => {
									removePreferredCategory(pCategory.category_label);
								}}
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
						display: inline-flex;
						align-items: center;
						will-change: transform;

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
