# ![icon](./app/images/icon-128.png) esa-plus

Add more features to esa.io.

- [Chrome Web Store](https://chrome.google.com/webstore/detail/esa-plus/mamfaeimjhohmgiijfdhbdonbdmpeofc)
- [YouTube Video](https://youtu.be/X7MXNGfU7zw)


## Description

Add more features to esa.io.

- Switch bg color by team.
- Add line-through decoration to done tasks.
- Replace [Cmd-f] shortcut key to focus on esa's search box.
- Switch markdown editor to WYSIWYG mode.


## Develop

### Install dependencies

```sh
# Install npm packages
# `yarn` or `npm install`
$ yarn

# Install bower packages
$ bower install
```

### Update dependencies

```sh
# Update npm packages
yarn run ncu -u
```

### gulp tasks

```sh
# Transform updated source written by ES2015 (default option)
yarn run gulp babel

# or Using watch to update source continuously
yarn run gulp watch

# Make a production version extension
yarn run gulp build

# Compress your app built by gulp build command
yarn run gulp package
```


## Licence

[MIT](https://github.com/tearoom6/esa-plus/blob/master/LICENSE)

## Author

[tearoom6](https://github.com/tearoom6)

