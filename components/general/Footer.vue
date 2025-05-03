<template>
  <footer>
    <div
      class="d-flex flex-column text-center bg-grey-darken-3 pa-2">
      <div>
        &copy; {{ new Date().getFullYear() }} - Powered by
        <a href="https://github.com/LordCrainer" target="_blank">@LordCrainer</a>
      </div>
      <div>All rights reserved</div>
    </div>
  </footer>
</template>

<style scoped>
footer a {
  color: white;
  text-decoration: underline;
}
footer a:hover {
  color: yellow;
}
footer a:active {
  color: white;
}
</style>
