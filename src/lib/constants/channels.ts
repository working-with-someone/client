const WS_CHANNELS = {
	chat: {
		broadCastSend: 'chat:broadcast:send',
		broadCastRecive: 'chat:broadcast:receive'
	},
	stream: {
		push: 'stream:push'
	},
	transition: {
		open: 'transition:open',
		break: 'transition:break',
		close: 'transition:close',
		broadCast: {
			open: 'transition:broadcast:open',
			break: 'transition:broadcast:break',
			close: 'transition:broadcast:close'
		}
	},
	livesession: {
		update: 'livesession:update'
	}
};

export default WS_CHANNELS;
