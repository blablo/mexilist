class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.boolean :main
      t.integer :parent_id

      t.timestamps
    end
  end
end
