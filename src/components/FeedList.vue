<template>
  <div>
    <animated-group-bounce-in>
      <div v-for="(post, index) in posts" :key="index" class="post ui feed dividing" data-testid="post">
        <div class="event">
          <div class="label">
            <img :src="getImage(post.data.thumbnail)" class="ui image">
          </div>
          <div class="content">
            <div class="user">
              {{ post.data.author }} <span class="date"> | {{ getDate(post.data.created_utc) }}</span>
            </div>
            <div class="description">{{ post.data.title }}</div>
            <div class="meta">
              <a :href="post.data.url">Read more on {{ post.data.domain }}</a>
            </div>
          </div>
        </div>
      </div>
    </animated-group-bounce-in>
    <div class="pag">
      <div class="ui pagination menu">
        <button :disabled="currentPage === 1" class="item btn-prev" @click="changePage(true, false)" data-test-id="btn-prev">
          <i class=" icon long arrow alternate left"></i>
        </button>
        <button class="item btn-next" @click="changePage(false, true)" data-test-id="btn-next">
          <i class=" icon long arrow alternate right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

let REDDIT_POSTS_URL = 'https://www.reddit.com/r/all/top.json?limit=5&count=5'
let REDDIT_AFTER_POSTS_URL = REDDIT_POSTS_URL + '&after='
let REDDIT_BEFORE_POSTS_URL = REDDIT_POSTS_URL + '&before='

export default {
  name: 'list',
  data () {
    return {
      posts: [],
      nextPage: null,
      beforePage: null,
      currentPage: 1
    }
  },
  methods: {
    getPosts (page) {
      let url = REDDIT_POSTS_URL

      if (page != null) {
        if (page === this.nextPage) {
          url = REDDIT_AFTER_POSTS_URL + page
        } else {
          url = REDDIT_BEFORE_POSTS_URL + page
        }
      }

      axios.get(url)
        .then(response => {
          this.posts = response.data.data.children
          this.nextPage = response.data.data.after
          this.beforePage = response.data.data.before
        })
        .catch(error => {
          console.error(error)
        })
    },
    getImage (img) {
      if (img && img !== 'self' && img !== 'nsfw') {
        return img
      } else {
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFqLwXLSt7nY_iW0vRguTgVIH1gjwuhx28PjI_Dc964oTRx0No'
      }
    },
    getDate (dateUtc) {
      let seconds = Math.floor(((new Date().getTime() / 1000) - dateUtc))
      let interval = Math.floor(seconds / 31536000)

      if (interval >= 1) {
        if (interval === 1) return interval + ' year ago'
        else {
          return interval + ' years ago'
        }
      }

      interval = Math.floor(seconds / 2592000)

      if (interval >= 1) {
        if (interval === 1) return interval + ' month ago'
        else {
          return interval + ' months ago'
        }
      }

      interval = Math.floor(seconds / 86400)

      if (interval >= 1) {
        if (interval === 1) return interval + ' day ago'
        else {
          return interval + ' days ago'
        }
      }

      interval = Math.floor(seconds / 3600)

      if (interval >= 1) {
        if (interval === 1) return interval + ' hour ago'
        else {
          return interval + ' hours ago'
        }
      }

      interval = Math.floor(seconds / 60)

      if (interval >= 1) {
        if (interval === 1) return interval + ' minute ago'
        else {
          return interval + ' minutes ago'
        }
      }

      return Math.floor(seconds) + ' seconds ago'
    },
    changePage (before, next) {
      if (before === false && next === true) {
        this.currentPage += 1
        this.getPosts(this.nextPage)
      } else if (before === true && next === false) {
        this.currentPage -= 1
        this.getPosts(this.beforePage)
      }
    }
  },
  created: function () {
    this.getPosts()
  }
}
</script>

<style lang="scss" scoped="true">
.post {
  background: #fff;
  border-radius: .2rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  padding: 16px;
}
.pag {
  text-align: center;
  margin-top: 16px;
}
button.item {
  border-width: 0;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: .1;
  }
}
</style>
