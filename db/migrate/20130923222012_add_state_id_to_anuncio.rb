class AddStateIdToAnuncio < ActiveRecord::Migration
  def change
    add_column :anuncios, :state_id, :integer

  end
end
