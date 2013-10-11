/**
 * jQuery Auto Pagination v1.0
 * Copyright 2013 Choy Peng Kong
 * An unobstrusive auto pagination plugin for JQuery
 *
 * Inspired by "Infinite Scroll" JQuery Plugin
 * by Paul Irish & Luke Shumard
 *
 * Dual licensed under the MIT and GPL
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(a){a.fn.AutoPagination=function(b){var c=a.extend({},a.fn.AutoPagination.defaults,b),d=a(this);a(c.nextPageSelector).css({visibility:"hidden"});a(window).scroll(function(){if(a(c.nextPageSelector).attr("href")&&a(window).scrollTop()+a(window).height()>a(c.nextPageSelector).offset().top-c.nextPageBufferPx){var e=a(c.nextPageSelector).attr("href");a(c.nextPageSelector).attr("href","");a('<div class="'+c.loaderDivClass+'" style="'+c.loaderDivStyle+'"><span>'+(c.loaderImage?'<img src="'+c.loaderImage+'" alt="'+c.loaderText+'" />':c.loaderText)+"</span></div>").insertAfter(d.find(c.panelSelector).last());a.get(e,function(f){a(f).find(c.panelSelector).each(function(g,h){a(h).insertAfter(d.find(c.panelSelector).last())});a("."+c.loaderDivClass).hide();a(c.nextPageSelector).attr("href",a(f).find(c.nextPageSelector).attr("href"))})}})};a.fn.AutoPagination.defaults={nextPageBufferPx:200,nextPageSelector:".nextPage",panelSelector:".panel",loaderDivClass:"ajax-loader",loaderDivStyle:"text-align:center",loaderImage:"ajax-loader.gif",loaderText:"Loading..."}})(jQuery);