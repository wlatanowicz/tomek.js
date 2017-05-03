<com:Content>

    <ul>
        <com:Repeater ID="ListRepeater">
            <temp:Item>
                <li>
                    <com:CheckBox ID="DoneCheckBox" Checked="[%= this.DataItem.done %]" />
                    [%= this.DataItem.description %]
                </li>
            </temp:Item>
        </com:Repeater>
    </ul>

    <div>
        <com:TextBox ID="NewItemTextBox" />
        <com:Button on:Click=".buttonClicked" Text="Add" />
    </div>

</com:Content>
