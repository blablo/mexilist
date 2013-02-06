class CreateHousePerks < ActiveRecord::Migration
  def change
    create_table :house_perks do |t|
      t.integer :anuncio_id
      t.integer :rooms
      t.float :m2int
      t.float :m2ext
      t.string :colonia

      t.timestamps
    end
  end
end
