class CreateModels < ActiveRecord::Migration
  def change
    create_table :models do |t|
      t.integer :brand_id
      t.string :name
      t.integer :tipo

      t.timestamps
    end
  end
end
