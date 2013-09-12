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
      scope: "email, read_stream, read_friendlists, friends_likes, friends_status, offline_access"

$ ->
  flashCallback = ->
    $(".alert").fadeOut()
  $(".alert").bind 'click', (ev) =>
    $(".alert").fadeOut()
  setTimeout flashCallback, 2000

