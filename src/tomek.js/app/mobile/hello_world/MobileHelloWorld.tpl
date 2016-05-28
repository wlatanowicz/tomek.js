<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:TContent>
	
	<div class="bar bar-header bar-light">
		<h1 class="title">Hello World!</h1>
	</div>
	<div class="content has-header has-footer padding">
		<p>
			<com:TButton CssClass="button button-positive"
						 on:Click=".buttonClicked"
						 Text="Click me!" />
		</p>
	</div>
	<div class="bar bar-footer bar-light">
		<div class="title">Footer</div>
	</div>
</com:TContent>

</template>