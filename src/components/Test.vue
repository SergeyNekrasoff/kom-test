<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="post ui feed dividing">
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
    <div class="pag">
      <vue-paginate-al :totalPage="3" @btnClick="getPosts"></vue-paginate-al>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VuePaginateAl from 'vue-paginate-al'

let REDDIT_POSTS_URL = 'https://www.reddit.com/r/all/top.json?limit=5&count=5'
// let REDDIT_AFTER_POSTS_URL = `${REDDIT_POSTS_URL}&after=`
// let REDDIT_BEFORE_POSTS_URL = `${REDDIT_POSTS_URL}&before=`

export default {
  name: 'list',
  props: {
    totalPage: 0,
    currentPage: 0
  },
  components: {
    VuePaginateAl
  },
  data () {
    return {
      posts: [],
      post: {},
      page: 0
    }
  },
  methods: {
    getPosts: function (n) {
      // let url = REDDIT_POSTS_URL

      // axios.get(url)
      //   .then(response => {
      //     this.posts = this.posts.concat(response.data.data.children)
      //   })
      //   .catch(error => {
      //     console.error(error)
      //   })
      // console.log(`n: ${n}`)
      // console.log(`current: ${this.currentPage}`)
      // console.log(`current: ${this.totalPage}`)
    },
    getImage: function (img) {
      if (img && img !== 'self' && img !== 'nsfw') {
        return img
      } else {
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFqLwXLSt7nY_iW0vRguTgVIH1gjwuhx28PjI_Dc964oTRx0No'
      }
    },
    getDate: function (dateUtc) {
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
    }
  },
  created: function () {
    let url = REDDIT_POSTS_URL

    axios.get(url)
      .then(response => {
        // this.posts = this.posts.concat(response.data.data.children)
        let items = this.posts.concat(response.data.data.children)

        console.log(`items: ${response.json()}`)

        for (let i; i < items.length; i++) {
          // this.post = posts[i]

          // console.log(`this.post: ${items[i]}`)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}

</script>

<style lang="scss" scoped="true">
.post {
  background: #fff;
  border-radius: .2rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  padding: 16px;

  .label {
    margin-top: 8px;
  }
}

.pag {
  text-align: center;
}
</style>
