import customRouter from './router.js';
import setMarkedOptions from './marked.js';
import mainObj from './main.js';
import examplesObj from './content/examples.js';
import sassVarsObj from './content/sass-variables.js';
import sassMixinsObj from './content/sass-mixins.js';
import overviewCollection from './content/overview.js';
import variablesCollection from './content/variables.js';
import mixinsCollection from './content/mixins.js';

console.log(mainObj.isTouchDevice() ? 'Touch Device': 'Desktop');

setMarkedOptions();

var codeContentsArray = [examplesObj, sassVarsObj, sassMixinsObj];

$(function() {

  var featureDetailSource   = $('#feature-detail').html(),
      featureDetailTemplate = Handlebars.compile(featureDetailSource);

  var makeFeatureDetail = function(obj, i, array) {
    var context = obj,
        html    = featureDetailTemplate(context);

    $(`#${obj.sectionId}`).prepend(html);
  }

  overviewCollection.forEach( makeFeatureDetail );

  variablesCollection.forEach( makeFeatureDetail );

  mixinsCollection.forEach( makeFeatureDetail );

  customRouter();

  var markedSection = function(obj) {
    $.each(obj, function(key, value) {
      $(`#${key}`).html(marked(value));
    })
  }

  $.each(codeContentsArray, function(i, obj) {
    markedSection(obj);
  })

  $('#siteOwner').append(mainObj.getOwnerContent());

});
