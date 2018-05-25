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
      <div class="ui pagination menu">
        <a class="item">
          <i class="icon long arrow alternate left"></i>
        </a>
        <a class="item">1</a>
        <a class="item">2</a>
        <a class="item">3</a>
        <a class="item">
          <i class=" icon long arrow alternate right"></i>
        </a>
        <!-- <a class="item" v-if="isShowEdge" :class="{ disabled: currentPage === 1 }" @click.prevent="onChange(1)">
        {{ previousText }}
          </a>
          <a class="item" v-for="page in pages" :class="{ active: page === currentPage }" @click.prevent="onChange(currentPage)"></a>
          <a class="item" v-if="isShowEdge" :class="{ disabled: currentPage === totalPages }" @click.prevent="onChange(totalPages)">
          {{ nextText }}
        </a> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'list',
  data () {
    return {
      posts: [],
      nextPage: null,
      pageNumber: 0
    }
  },
  methods: {
    getPosts (page) {
      let url = 'https://www.reddit.com/r/all/top.json?limit=5&count=5'

      if (page != null) {
        url = 'https://www.reddit.com/r/all/top.json?limit=5&count=5&after=' + page
      }

      // console.log(`page: ${page}`)
      // console.log(`url: ${url}`)

      axios.get(url)
        .then(response => {
          this.posts = this.posts.concat(response.data.data.children)
          this.nextPage = response.data.data.after
          console.log(`posts: ${JSON.stringify(this.posts)}`)
        })
        .catch(error => {
          console.error(error)
        })
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
    this.getPosts()
  }
}

</script>

<style lang="scss" scoped="true">
.pag {
  text-align: center;
}
</style>
