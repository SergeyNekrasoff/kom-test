<template>
    <header class="header">
      <div class="ui top attached menu">
        <div class="ui dropdown icon item">
          <i class="reddit alien icon"></i>
          <div class="menu">
            <div class="item">
              <i class="dropdown icon"></i>
              <span class="text">New</span>
              <div class="menu">
                <div class="item">Document</div>
                <div class="item">Image</div>
              </div>
            </div>
            <div class="item">
              Open...
            </div>
            <div class="item">
              Save...
            </div>
            <div class="item">Edit Permissions</div>
            <div class="divider"></div>
            <div class="header">
              Export
            </div>
            <div class="item">
              Share...
            </div>
          </div>
        </div>
        <div class="right menu">
          <div class="ui right aligned category search item">
            <div class="ui transparent icon input">
              <input class="prompt" type="text" placeholder="Search...">
              <i class="search link icon"></i>
            </div>
            <div class="results"></div>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
export default {
  name: 'header'
}
</script>
