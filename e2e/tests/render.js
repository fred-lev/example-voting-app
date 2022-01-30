import { args } from 'system';
var page = require('webpage').create();
var url = args[1];

page.onLoadFinished = function () {
  setTimeout(function () {
    console.log(page.content);
    phantom.exit();
  }, 1000);
};

page.open(url, function () {
  page.evaluate(function () {
  });
});
