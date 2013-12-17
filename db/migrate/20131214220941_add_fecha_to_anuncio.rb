class AddFechaToAnuncio < ActiveRecord::Migration
  def change
    add_column :anuncios, :fecha, :datetime
  end
end
