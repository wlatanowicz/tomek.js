<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:Content>

	<com:Literal Text="L1" Visible="[%= true or false %]" />
	<com:Literal Text="L2" Visible="[%= true and false %]" />
	<com:Literal Text="L3" Visible="[%= true and true %]" />

</com:Content>
	
</template>