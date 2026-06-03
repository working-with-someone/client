<script lang="ts">
	import { PUBLIC_API_SERVER_DOMAIN } from '$env/static/public';

	interface Props {
		pfpUri: string;
		size?: number;
	}

	const { pfpUri, size = 50 }: Props = $props();
</script>

<img
	src={`${PUBLIC_API_SERVER_DOMAIN}${pfpUri}`}
	alt={`${PUBLIC_API_SERVER_DOMAIN}/media/images/default/pfp`}
	style={`width: ${size}px; height: ${size}px;`}
/>

<style lang="scss">
	img {
		border-radius: 50%;
		object-fit: cover;
	}
</style>
