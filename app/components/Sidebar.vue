<template>
  <div class="sidebar">
    <section class="profile">
      <img :src="avatarUrl"
           ref="avatar"
           class="avatar" />
      <div class="stats">
        <h4 class="name">{{ user.profile.name }}</h4>
        <div class="balance">
          <small class="diamond">
            <i class="fa fa-diamond"></i> {{ diamond }}
          </small>
          <small class="gold">
            <i class="fa fa-stop-circle"></i> {{ gold }}
          </small>
          <small class="silver">
            <i class="fa fa-stop-circle"></i> {{ silver }}
          </small>
        </div>

        <status-bar label="HP"
                    color="#ff4f4f"
                    :value="user.stats.hp"
                    :max="user.stats.maxHealth" />
        <status-bar label="MP"
                    color="#4141ff"
                    :value="user.stats.mp"
                    :max="user.stats.maxMP" />
        <status-bar label="EXP"
                    color="#e8e879"
                    :value="user.stats.exp"
                    :max="user.stats.toNextLevel" />
      </div>
      <div class="clearfix"></div>
    </section>
    <section class="lists">
      <h3>
        <span class="icon">
          <i class="fa fa-tasks"></i>
        </span>

        Tasks
      </h3>
      <ul>
        <li v-for="list in user.lists">
          <router-link :to="listUrl(list)">{{ list }}</router-link>
        </li>
      </ul>
    </section>
    <section class="groups">
      <h3>
        <span class="icon">
          <i class="fa fa-group"></i>
        </span>

        Groups
      </h3>
      <ul>
        <li v-for="group in user.groups">
          <router-link :to="groupUrl(group.id)" :title="group.name">{{ group.name }}</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import StatusBar from './StatusBar.vue';

export default {
  props: ['user'],
  computed: {
    diamond() {
      return this.user.balance
    },
    gold() {
      return parseInt(this.user.stats.gp)
    },
    silver() {
      return parseInt((this.user.stats.gp - this.gold) * 100)
    },
    cachedAvatar() {
      return localStorage.getItem(`cached_avatar_${this.user.id}`)
    },
    avatar() {
      return `https://habitica.com/export/avatar-${this.user.id}.png`
    },
    avatarUrl() {
      return this.cachedAvatar || this.avatar
    }
  },
  created() {
    this.cacheAvatar()
  },
  methods: {
    groupUrl(id) {
      return `/group/${id}`
    },
    listUrl(type) {
      return `/tasks/${type}`
    },
    cacheAvatar() {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const image = new Image();

      image.onload = () => {
        context.drawImage(image, 0, 0, 64, 64);

        const dataUrl = canvas.toDataURL();
        localStorage.setItem(`cached_avatar_${this.user.id}`, dataUrl);
      };

      canvas.width = 64;
      canvas.height = 64;
      image.crossOrigin = 'anonymous';
      image.src = this.avatar;
    }
  },
  components: {
    StatusBar
  }
}
</script>
