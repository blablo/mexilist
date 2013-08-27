class AddIntercambioToAnuncios < ActiveRecord::Migration
  def change
    add_column :anuncios, :intercambio, :boolean

  end
end
