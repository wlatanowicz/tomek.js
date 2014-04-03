<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:TContent>

<com:TPanel ID="Panel1" Attributes.style="background: #FFCCFF;">
	<div>
		<h3>
			Kontrolka z danymi z wyrażenia
		</h3>
		<p>
			Dzisiaj ( [%= (new Date()).getFullYear() + '-' + ((new Date()).getMonth()+1) + '-' + (new Date()).getDate() %] ) jest
			<com:TTextBox ID="DateTB"
						  Text="[%= (new Date()).getTime() %]" />
		</p>
	</div>
</com:TPanel>

<com:TPanel ID="Panel2">
	<div>
		<h3>
			Odczyt i zapis z kontrolki
		</h3>
		<p>
			Źródło
			<com:TTextBox ID="SourceTB" />
		</p>
		<p>
			Cel
			<com:TTextBox ID="TargetTB" />
		</p>
		<p>
			<com:TButton Text="Przepisz"
						 on:Click="c.copyClicked" />
		</p>
	</div>
</com:TPanel>
	
<com:TPanel ID="Panel3">
	<div>
		<h2>
			Generowanie ciągu #[%= this.iteration %]
		</h2>
		<p>
			Liczba liczb
			<com:TTextBox ID="NumberTB" />
		</p>
		<p>
			Krok
			<com:TTextBox ID="StepTB" />
		</p>
		<p>
			<com:TButton Text="Generuj"
						 on:Click="c.fillClicked" />
		</p>
	</div>
	<com:TRepeater ID="Rep" >
		<temp:Header>
			<com:TControl>
				<span class="header">
					Header
				</span>
			</com:TControl>
		</temp:Header>
		<temp:Footer>
			<com:TControl>
				<span class="footer">
					Footer
				</span>
			</com:TControl>
		</temp:Footer>
		<temp:Empty>
			<com:TControl>
				<span class="empty">
					Empty
				</span>
			</com:TControl>
		</temp:Empty>
		<temp:Item>
			<com:TPanel Attributes.style="background: [%= this.DataItem.i % 2 ? '#CCFFFF' : '#FFFFCC' %]; ">
				<p>
					Liczba #[%= this.DataItem.i %] = [%= this.DataItem.n %]
				</p>
				<p>
					<com:TButton on:Click="c.innerButtonClicked" Text="Button [%= ' ' + (this.DataItem.i + 1) %]" />
				</p>
			</com:TPanel>
		</temp:Item>
	</com:TRepeater>
</com:TPanel>

</com:TContent>

</template>