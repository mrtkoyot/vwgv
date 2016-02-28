<!DOCTYPE html>
<html class="no-js" lang="" id="app">
<head>
	<title>Test Page</title>
	<link rel="stylesheet" href="/site/templates/styles/main.css">
</head>
<body>

	<h1>Vue output:</h1>

	<p>{{ message }}</p>

	<div>
		<h2>The below should work with hot reloading</h2>
		<p>Therefore any changes to the js code base should update the page but the value stored below should not change until the page is refreshed.</p>
		<h3>Clicked: {{ count }} times</h3>
		<p>
			<button v-on:click="increment">plus</button>
		</p>
		<p>
			<button v-on:click="decrement">minus</button>
		</p>

	</div>