class AddBotIdToAnuncios < ActiveRecord::Migration
  def change
    add_column :anuncios, :bot_id, :string
  end
end
