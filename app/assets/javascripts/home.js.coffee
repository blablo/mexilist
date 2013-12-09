# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
$ ->
  redirect_url = "/auth/facebook/callback"
  $(".facebook").click (e) ->
    e.preventDefault()
    FB.login ((response) ->
      window.location = redirect_url  if response.authResponse
    ),
      scope: "email, read_stream, read_friendlists, friends_likes, friends_status, offline_access, publish_actions, publish_stream"

$ ->
  flashCallback = ->
    $(".flash-alert").fadeOut()
  $(".flash-alert").bind 'click', (ev) =>
    $(".flash-alert").fadeOut()
  setTimeout flashCallback, 2000

  $('.dropdown-toggle').dropdown();