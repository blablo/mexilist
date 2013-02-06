class AddTelToAnuncio < ActiveRecord::Migration
  def change
    add_column :anuncios, :tel, :string
  end
end
