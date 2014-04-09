<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil' xmlns:tomek='tomek'>

<div tomek:StripWhitespace='yes'>
		
	<com:TPanel ID="Panel1" Attributes.style="background: #FFCCFF;">
		<div>
			<h3>
				Kontrolka z danymi z wyrażenia
			</h3>
			<p tomek:StripWhitespace='no'>
				Dzisiaj ( [%= (new Date()).getFullYear() + '-' + ((new Date()).getMonth()+1) + '-' + (new Date()).getDate() %] ) jest
				<com:TTextBox ID="DateTB"
							  Text="[%= (new Date()).getTime() %]" />
			</p>
		</div>
	</com:TPanel>
	
	<com:TButton Text="RED" on:Click="SourceTemplateControl.executeButtonClicked" />

	<com:TPanel ID="Panel2">
		<div>
			<h3>
				Odczyt i zapis z kontrolki
				[%@ TRANSLATE_THIS %]
			</h3>
			<p tomek:StripWhitespace='no'>
				<com:TLabel ForControl="SourceTB" Text="Źródło" />
				<com:TTextBox ID="SourceTB" />
				<a href='#'>aaaa</a>
				<a href='#'>bbbb</a>
			</p>
			<p>
				<com:TLabel ForControl="TargetTB" Text="Cel" />
				<com:TTextBox ID="TargetTB" />
				</p>
				<a href='#'>aaaa</a>
				<a href='#'>bbbb</a>
			<p>
				<com:TButton Text="Przepisz"
							 on:Click="c.copyClicked" />
			</p>
		</div>
	</com:TPanel>

	<com:TPanel ID="Panel3">
		<div>
			<h2>
				Generowanie ciągu #[%= this.iteration %] [%@ AND_THIS %]
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
			<temp:Wrapper>
				<div style="background: yellow;">
					<com:TPlaceHolder />
				</div>
			</temp:Wrapper>
			<temp:Header>
				<span class="header">
					Header
				</span>
			</temp:Header>
			<temp:Footer>
				<span class="footer">
					Footer
				</span>
			</temp:Footer>
			<temp:Empty>
				<span class="empty">
					Empty
				</span>
			</temp:Empty>
			<temp:Item>
				<div style="background: [%= this.DataItem.i % 2 ? '#CCFFFF' : '#FFFFCC' %]; ">
					<p>
						Liczba #[%= this.DataItem.i %] = [%= this.DataItem.n %]
					</p>
					<p>
						<com:TButton on:Click="c.innerButtonClicked" Text="Button [%= ' ' + (this.DataItem.i + 1) %]" />
					</p>
				</div>
			</temp:Item>
		</com:TRepeater>
	</com:TPanel>
</div>
</template>