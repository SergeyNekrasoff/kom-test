<template>
  <div class="ui centered grid">
    <div class="six wide column">
      <form class="ui form" id="form-a" data-test="contact-form">
        <div class="field">
          <label>First Name</label>
          <input type="text" name="name" placeholder="First Name">
        </div>
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" placeholder="e-mail">
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" class="hidden">
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>
        <button class="ui button" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped="true">
</style>
