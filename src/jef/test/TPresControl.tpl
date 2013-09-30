<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:TContent>
<com:TPanel>
	<h1>
		Hello [%= ' '+this.getName() %]
	</h1>
	
	<com:TPanel ID="Panel">
		[%= Math.random() %]
		[%= this.getName() %]
	</com:TPanel>
	
	<div>
		<p>
			<com:TLiteral Text="[%= this.getName() %]" />
		</p>
		<p>
			Imie
			<com:TTextBox ID="TextBox" />
		</p>
		<p>
			<com:TButton Text="Wcisnij mnie"
						 on:Click="this.buttonClicked"
						 />
		</p>
	</div>
	
	<com:TPanel ID="PPP">
		<com:TRepeater ID="R">
			<temp:Item>
				<com:TContent>
					<div>
						TEST 
						<p>
							[%= this.DataItem %]
						</p>
						<p>
							[%= this.ItemIndex %]
						</p>
						<com:TButton on:Click="c.innerButtonClicked" Text="wcisnij [%= this.ItemIndex %]" />
					</div>
				</com:TContent>
			</temp:Item>
		</com:TRepeater>
	</com:TPanel>
</com:TPanel>
</com:TContent>
	
</template>