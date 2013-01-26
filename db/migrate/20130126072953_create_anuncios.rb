class CreateAnuncios < ActiveRecord::Migration
  def change
    create_table :anuncios do |t|
      t.string :title
      t.integer :category_id
      t.integer :tipo
      t.decimal :price
      t.date :expiracy
      t.date :renovation
      t.text :texto
      t.integer :city_id
      t.string :district
      t.string :street
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
