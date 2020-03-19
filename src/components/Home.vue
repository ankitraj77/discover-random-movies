<template>
	<div class="home">
		<div v-if="movies.length > 0">
			<div
				class="backdrop"
				:style="{
					backgroundImage:
						'url(\'' + posterBaseUrl + movie.backdrop_path + '\')'
				}"
			></div>
			<!-- ================ -->
			<v-card class="mx-auto my-12" max-width="400">
				<v-tooltip right>
					<template v-slot:activator="{ on }">
						<v-img
							v-on="on"
							@click="nextMovie"
							class="imgBtn"
							height="200"
							:src="posterBaseUrl + movie.backdrop_path"
						></v-img>
					</template>
					<span>Next random movie</span>
				</v-tooltip>
				<div class="title">
					<v-card-title class="display-1">{{
						movie.title
					}}</v-card-title>
				</div>

				<v-card-text>
					<v-row align="center" class="mx-0">
						<v-rating
							:value="movie.vote_average / 2"
							color="pink"
							dense
							half-increments
							readonly
							size="18"
						></v-rating>

						<div class="grey--text ml-4">
							{{ movie.vote_average / 2 }} ({{
								movie.vote_count
							}})
						</div>
					</v-row>

					<div class="my-4 subtitle-1">
						{{ movie.release_date }}
					</div>

					<div class="content">
						{{ movie.overview }}
					</div>
				</v-card-text>

				<v-divider class="mx-4"></v-divider>

				<v-card-title
					><v-icon>fas fa-th-list</v-icon> &nbsp;Genre</v-card-title
				>
				<v-card-text>
					<v-chip
						v-for="genre in genres"
						class="ma-2"
						:key="genre.id"
					>
						{{ genre }}
					</v-chip>
				</v-card-text>
			</v-card>
			<!-- ================ -->
			<footer>
				<img class="attribution" :src="attribution" alt="TMDB Logo" />
			</footer>
			<!-- ================ -->
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'Home',
	props: {
		msg: String
	},
	data: function() {
		return {
			loading: true,
			selection: 1,
			isData: false,
			genreList: [],
			posterBaseUrl: 'http://image.tmdb.org/t/p/w500',
			movies: [],
			index: 0,
			attribution:
				'https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg'
		}
	},
	methods: {
		getMovies: function() {
			axios
				.get(
					'https://what-should-i-watch-today-api.herokuapp.com/get-movies'
				)
				.then(response => {
					let res = JSON.parse(response.data.body)
					this.movies = res.results
					this.index = 0
					console.log(res)
				})
		},
		nextMovie: function() {
			if (this.index < this.movies.length - 1) {
				this.index++
			} else {
				this.getMovies()
			}
		}
	},
	computed: {
		movie: function() {
			return this.movies[this.index]
		},
		genres: function() {
			let genres = []
			for (let i = 0; i < this.movie.genre_ids.length; i++) {
				for (let genre of this.genreList) {
					if (genre.id == this.movie.genre_ids[i]) {
						genres.push(genre.name)
					}
				}
			}
			// console.log(genres)
			return genres
		}
	},
	mounted: function() {
		// GET MOVIES
		axios
			.get(
				'https://what-should-i-watch-today-api.herokuapp.com/get-movies'
			)
			.then(response => {
				let res = JSON.parse(response.data.body)
				this.movies = res.results
				this.isData = true
				// console.log(res)
			})
		// GET GENRES
		axios
			.get('https://what-should-i-watch-today-api.herokuapp.com/genres')
			.then(response => {
				let res = JSON.parse(response.data.body)
				this.genreList = res.genres
				this.isData = true
				// console.log('Genre List ')
				// console.log(res.genres)
			})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$primary_color: rgb(211, 66, 66);
$text_color: #454545;
$text_size: 1.1rem;

@mixin font_style {
	color: $text_color;
	font-size: $text_size;
	line-height: 150%;
}

body {
	margin: 0;
}
.content {
	@include font_style;
}
.title {
	.display-1 {
		font-weight: 700 !important;
	}
}
.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	// height: calc(100vh - 56px);
	background-color: antiquewhite;
	// filter: blur(4px);
	// background-image: url("http://image.tmdb.org/t/p/original/vHWoapGhI3thn3TyBu4qtH8W15f.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	z-index: -1;
}
.imgBtn {
	cursor: pointer;
}
.theme--light.v-application {
	background: transparent !important;
}

footer {
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	// margin: 4rem 0;
	padding: 1.2rem 0;
	text-align: center;
}
.attribution {
	width: 100px;
}

@media only screen and (max-width: 40rem) {
}
</style>
