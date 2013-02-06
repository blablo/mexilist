class CreateCarPerks < ActiveRecord::Migration
  def change
    create_table :car_perks do |t|
      t.integer :brand_id
      t.integer :model_id
      t.integer :year
      t.float :km
      t.integer :anuncio_id

      t.timestamps
    end
  end
end
