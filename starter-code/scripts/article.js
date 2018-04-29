'use strict';

var articles = [];

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.category = rawDataObj.category;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
  // DONE: Use the JS object passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  /* DONE: This cloned article still has a class of template.
  However, in our modules.css stylesheet, we gave all elements
  with a class of template a display of none. Let's make
  sure we're not accidentally hiding our cloned article! */
    $newArticle.removeClass('template');


  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  /* DONE: Now use jQuery traversal and setter methods to fill in the rest
  of the current template clone with properties from this particular Article instance.
  We need to fill in:
   */
  $newArticle.find('a').text(this.author).attr('href', this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').attr('pubdate', this.publishedOn);



  // Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  articles.push(new Article(articleObject));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});
