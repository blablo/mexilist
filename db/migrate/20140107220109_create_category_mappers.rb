class CreateCategoryMappers < ActiveRecord::Migration
  def change
    create_table :category_mappers do |t|
      t.integer :category_id
      t.integer :anumex_id

      t.timestamps
    end
  end
end
