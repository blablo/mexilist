class CreateCityMappers < ActiveRecord::Migration
  def change
    create_table :city_mappers do |t|
      t.integer :city_id
      t.string :anumex_id

      t.timestamps
    end
  end
end
