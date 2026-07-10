<script lang="ts">
	import wwsfetch from '$lib/utils/wwsfetch';
	import { getContext } from 'svelte';
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		targetUserId: number;
		children: Snippet<[{ isFollowing: boolean; follow: () => void; unfollow: () => void }]>;
	}

	const { targetUserId, children }: Props = $props();

	// 1. 상태 변수들 정의
	let isFollowing = $state<boolean>(false);
	let isLoading = $state<boolean>(true); // 로딩 상태 추가

	const user: any = getContext('user');
	const isSelf = $user.id == targetUserId;

	const isFollowingEndpoint = new URL(
		`/users/${$user.id}/followings/${targetUserId}`,
		PUBLIC_API_SERVER_DOMAIN
	);

	onMount(async () => {
		if (isSelf) {
			isLoading = false;
			return;
		}

		try {
			const res = await wwsfetch(isFollowingEndpoint.href, { method: 'GET' });
			isFollowing = res.status === 200;
		} catch (err) {
			// following이 존재하지 않음 즉, unfollow 상태
		} finally {
			isLoading = false;
		}
	});

	async function follow() {
		const res = await wwsfetch(`/users/${$user.id}/followings/${targetUserId}`, { method: 'POST' });

		if (res.status === 201) {
			isFollowing = true;
		}
	}

	async function unfollow() {
		const res = await wwsfetch(`/users/${$user.id}/followings/${targetUserId}`, {
			method: 'DELETE'
		});

		if (res.status === 204) {
			isFollowing = false;
		}
	}
</script>

{#if !isSelf}
	{#if isLoading}{:else}
		{@render children({ isFollowing, follow, unfollow })}
	{/if}
{/if}
