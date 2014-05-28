/* bender-tags: editor,unit */
/* bender-ckeditor-plugins: dialog,button,forms,toolbar */

bender.editor = { config : { autoParagraph : false }};

bender.test(
{
	// Setup reset editor to empty.
	'async:setUp' : function()
	{
		var tc = this;
		var editor = tc.editor;
		editor.setData( '', function()
		{
			tc.callback();
		});
	},

	'test fill fields (text) ' : function()
	{
		var bot = this.editorBot;

		bot.dialog( 'textfield', function( dialog )
			{
				dialog.setValueOf( 'info', '_cke_saved_name', 'name' );
				dialog.setValueOf( 'info', 'value', 'value' );

				dialog.getButton( 'ok' ).click();

				assert.areSame( '<input name="name" type="text" value="value" />', bot.getData( true ) );
			});
	},

	'test fill fields (password)' : function()
	{
		var bot = this.editorBot;

		bot.dialog( 'textfield', function( dialog )
			{
				dialog.setValueOf( 'info', 'type', 'password' );
				dialog.setValueOf( 'info', '_cke_saved_name', 'name' );
				dialog.setValueOf( 'info', 'value', 'value' );

				dialog.getButton( 'ok' ).click();

				assert.areSame( '<input name="name" type="password" value="value" />', bot.getData( true ) );
			});
	},

	'test empty fields' : function()
	{
		var bot = this.editorBot;

		bot.setHtmlWithSelection( '[<input name="name" type="text" value="value" />]' );

		bot.dialog( 'textfield', function( dialog )
			{
				dialog.setValueOf( 'info', '_cke_saved_name', '' );
				dialog.setValueOf( 'info', 'value', '' );

				dialog.getButton( 'ok' ).click();

				assert.areSame( '<input type="text" />', bot.getData( false, true ) );
			});
	},

	'test read attributes (email)' : function()
	{
		var bot = this.editorBot;

		bot.setHtmlWithSelection( '[<input name="name" type="email" value="test@host.com" />]' );

		bot.dialog( 'textfield', function( dialog )
			{
				assert.areSame( 'name', dialog.getValueOf( 'info', '_cke_saved_name' ) );
				assert.areSame( 'email', dialog.getValueOf( 'info', 'type' ) );
				assert.areSame( 'test@host.com', dialog.getValueOf( 'info', 'value' ) );

				dialog.setValueOf( 'info', 'type', 'text' );

				dialog.getButton( 'ok' ).click();

				assert.areSame( '<input name="name" type="text" value="test@host.com" />', bot.getData( true ) );
			});
	}
});