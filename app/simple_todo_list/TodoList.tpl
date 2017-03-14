<com:TContent>

    <ul>
        <com:TRepeater ID="ListRepeater">
            <temp:Item>
                <li>
                    <com:TCheckBox ID="DoneCheckBox" Checked="[%= this.DataItem.done %]" />
                    [%= this.DataItem.description %]
                </li>
            </temp:Item>
        </com:TRepeater>
    </ul>

    <div>
        <com:TTextBox ID="NewItemTextBox" />
        <com:TButton on:Click=".buttonClicked" Text="Add" />
    </div>

</com:TContent>
