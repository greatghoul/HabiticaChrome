<template>
  <div class="sidebar">
    <section class="profile">
      <img :src="avatarUrl"
           ref="avatar"
           class="avatar" />
      <div class="stats">
        <h4 class="name">{{ user.profile.name }}</h4>
      </div>
      <div class="clearfix"></div>
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
          <a href="###" :title="group.name">{{ group.name }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>  

<script>
export default {
  props: ['user'],
  computed: {
    cachedAvatar() {
      return localStorage.getItem(`cached_avatar_${this.user.id}`);
    },
    avatar() {
      return `https://habitica.com/export/avatar-${this.user.id}.png`;
    },
    avatarUrl() {
      return this.cachedAvatar || this.avatar;
    }
  },
  created() {
    this.cacheAvatar();
  },
  methods: {
    cacheAvatar() {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const image = new Image();

      image.onload = () => {
        context.drawImage(image, 0, 0, 64, 64);

        const dataUrl = canvas.toDataURL();
        // this.$refs.avatar.src = dataUrl;
        localStorage.setItem(`cached_avatar_${this.user.id}`, dataUrl);
      };

      canvas.width = 64;
      canvas.height = 64;
      image.crossOrigin = 'anonymous';
      image.src = this.avatar;
    }
  }
}
</script>
