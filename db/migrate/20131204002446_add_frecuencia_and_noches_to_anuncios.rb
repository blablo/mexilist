class AddFrecuenciaAndNochesToAnuncios < ActiveRecord::Migration
  def change
    add_column :anuncios, :frecuencia, :integer

    add_column :anuncios, :noches, :boolean

  end
end
