class CreateMotoPerks < ActiveRecord::Migration
  def change
    create_table :moto_perks do |t|
      t.integer :anuncio_id
      t.integer :brand_id
      t.integer :year
      t.integer :cc
      t.integer :km

      t.timestamps
    end
  end
end
