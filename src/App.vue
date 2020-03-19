<template>
	<v-app>
		<v-app-bar app color="#D34242" dark>
			<v-toolbar-title>
				<v-icon>fas fa-video</v-icon> &nbsp; What should I watch
				today?</v-toolbar-title
			>
			<v-spacer></v-spacer>
		</v-app-bar>

		<v-content style="background: rgb(30, 32, 38,0.97);">
			<Home />
		</v-content>
	</v-app>
</template>

<script>
import Home from './components/Home'

export default {
	name: 'App',

	components: {
		Home
	},

	data: () => ({
		//
	})
}
</script>
