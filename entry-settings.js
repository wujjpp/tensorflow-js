export default {

  /* Please take note on the comments
   * foo: client entry name, after built there is a bundled js file named "foo.xxxxxxxx.js"
      - src: the entry file location
      - include: for improve build performance in development, we can ignore this built by set to false
  */
  // foo: {
  //   src: './src/routes/home/client.js',
  //   include: true
  // },

  // Home page
  index: {
    src: './src/client.js',
    include: true
  }
}
